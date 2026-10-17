
import { error, fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createAuthClient } from '$lib/server/auth.js';

const REQUIRED_DOCUMENTS = [
  'business_license',
  'export_license',
  'company_profile'
];

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({
    'cache-control': 'private, no-store'
  });

  const supabase = createAuthClient(event);

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(303, '/login');
  }

  const adminId = env.ADMIN_USER_ID?.trim();

  if (adminId && user.id === adminId) {
    redirect(303, '/admin');
  }

  const metadata = user.user_metadata ?? {};

  // Get the actual account information from Supabase.
  const { data: profile, error: profileError } = await supabase
    .from('trade_profiles')
    .select(
      'company_name, full_name, account_type, verification_status'
    )
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    console.error('Dashboard profile:', profileError.code);
    error(500, 'Unable to load your account profile.');
  }

  const accountType =
    profile?.account_type === 'exporter' ||
    profile?.account_type === 'buyer'
      ? profile.account_type
      : 'unassigned';

  const isExporter = accountType === 'exporter';

  /** @type {{type: string, status: string}[]} */
  let documentProgress = [];

  let approvedCount = 0;

  if (isExporter) {
    const { data: documents, error: documentsError } =
      await supabase
        .from('exporter_documents')
        .select('document_type, review_status, created_at')
        .eq('exporter_id', user.id)
        .in('document_type', REQUIRED_DOCUMENTS)
        .order('created_at', { ascending: false });

    if (documentsError) {
      console.error(
        'Dashboard documents:',
        documentsError.code
      );

      error(500, 'Unable to load your export documents.');
    }

    documentProgress = REQUIRED_DOCUMENTS.map((type) => {
      const matchingDocuments = (documents ?? []).filter(
        (doc) => doc.document_type === type
      );

      // An approved document remains valid even if the
      // exporter later uploads another pending document.
      const approvedDocument = matchingDocuments.find(
        (doc) => doc.review_status === 'approved'
      );

      const selectedDocument =
        approvedDocument ?? matchingDocuments[0];

      return {
        type,
        status: selectedDocument?.review_status ?? 'missing'
      };
    });

    approvedCount = documentProgress.filter(
      (doc) => doc.status === 'approved'
    ).length;
  }

  return {
    email: user.email ?? '',

    fullName:
      profile?.full_name ??
      (typeof metadata.full_name === 'string'
        ? metadata.full_name
        : ''),

    companyName:
      profile?.company_name ??
      (typeof metadata.company_name === 'string'
        ? metadata.company_name
        : ''),

    country:
      typeof metadata.country === 'string'
        ? metadata.country
        : '',

    accountType,

    verificationStatus:
      profile?.verification_status ?? 'pending',

    documentProgress,

    approvedCount,

    requiredCount: REQUIRED_DOCUMENTS.length
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  logout: async (event) => {
    const supabase = createAuthClient(event);

    const { error: logoutError } =
      await supabase.auth.signOut({
        scope: 'local'
      });

    if (logoutError) {
      return fail(500, {
        message: 'Unable to sign out. Please try again.'
      });
    }

    redirect(303, '/login');
  }
};
