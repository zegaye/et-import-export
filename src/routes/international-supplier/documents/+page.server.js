
import { fail, redirect, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
import { createAuthClient } from '$lib/server/auth.js';

const BUCKET = 'international-supplier-documents';
const MAX_SIZE = 5 * 1024 * 1024;

const DOCUMENT_TYPES = [
  'business_registration',
  'export_license',
  'tax_registration',
  'product_certificate',
  'company_profile'
];

const ALLOWED_MIME = [
  'application/pdf',
  'image/jpeg',
  'image/png'
];

/**
 * Returns the private server-side database client.
 * Never expose SUPABASE_SECRET_KEY to the browser.
 */
function getAdminDb() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    error(500, 'Supabase server configuration is missing.');
  }

  return createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
async function getEligibleSupplier(event) {
  const supabase = createAuthClient(event);

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(303, '/login');
  }

  const { data: profile, error: profileError } = await supabase
    .from('trade_profiles')
    .select('account_type, company_name, verification_status')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    error(500, 'Unable to load your supplier profile.');
  }

  if (!profile) {
    redirect(303, '/complete-profile');
  }

  if (profile.account_type !== 'international_supplier') {
    error(403, 'International Supplier account required.');
  }

  const { data: assessment, error: assessmentError } =
    await supabase
      .from('international_supplier_assessments')
      .select('score, status')
      .eq('supplier_id', user.id)
      .order('attempt_number', { ascending: false })
      .limit(1)
      .maybeSingle();

  if (assessmentError) {
    error(500, 'Unable to check supplier assessment.');
  }

  if (
    !assessment ||
    assessment.status !== 'passed' ||
    assessment.score < 60
  ) {
    redirect(303, '/international-supplier/assessment');
  }

  return {
    user,
    profile,
    supabase
  };
}

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({
    'cache-control': 'private, no-store'
  });

  const { user, profile, supabase } =
    await getEligibleSupplier(event);

  const { data: documents, error: documentsError } =
    await supabase
      .from('international_supplier_documents')
      .select(
        'id, document_type, review_status, review_notes, created_at, reviewed_at'
      )
      .eq('supplier_id', user.id)
      .order('created_at', { ascending: false });

  if (documentsError) {
    error(500, 'Unable to load supplier documents.');
  }

  return {
    companyName: profile.company_name,
    verificationStatus: profile.verification_status,
    documents: documents ?? []
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  upload: async (event) => {
    const { user, profile } =
      await getEligibleSupplier(event);

    if (profile.verification_status === 'verified') {
      return fail(403, {
        message:
          'Your company is already verified. Contact support to update documents.'
      });
    }

    const form = await event.request.formData();

    const documentType = String(
      form.get('documentType') ?? ''
    ).trim();

    const file = form.get('documentFile');

    if (!DOCUMENT_TYPES.includes(documentType)) {
      return fail(400, {
        message: 'Select a valid document type.'
      });
    }

    if (!(file instanceof File) || file.size === 0) {
      return fail(400, {
        message: 'Select a document to upload.'
      });
    }

    if (file.size > MAX_SIZE) {
      return fail(400, {
        message: 'The document must not exceed 5 MB.'
      });
    }

    if (!ALLOWED_MIME.includes(file.type)) {
      return fail(400, {
        message: 'Only PDF, JPG, and PNG files are allowed.'
      });
    }

    // Check file signatures, not just browser-provided MIME type.
    const bytes = new Uint8Array(await file.arrayBuffer());

    const isPdf =
      bytes.length >= 5 &&
      String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-';

    const isJpeg =
      bytes.length >= 3 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff;

    const isPng =
      bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a;

    const validSignature =
      (file.type === 'application/pdf' && isPdf) ||
      (file.type === 'image/jpeg' && isJpeg) ||
      (file.type === 'image/png' && isPng);

    if (!validSignature) {
      return fail(400, {
        message: 'The file content does not match its format.'
      });
    }

    const extension =
      file.type === 'application/pdf'
        ? 'pdf'
        : file.type === 'image/jpeg'
          ? 'jpg'
          : 'png';

    const path =
      `${user.id}/${documentType}/${crypto.randomUUID()}.${extension}`;

    const adminDb = getAdminDb();

    const { error: uploadError } =
      await adminDb.storage
        .from(BUCKET)
        .upload(path, bytes, {
          contentType: file.type,
          upsert: false
        });

    if (uploadError) {
      console.error('Supplier upload error:', uploadError.message);

      return fail(500, {
        message: 'Unable to upload the document.'
      });
    }

    const { error: insertError } = await adminDb
      .from('international_supplier_documents')
      .insert({
        supplier_id: user.id,
        document_type: documentType,
        file_path: path,
        review_status: 'pending'
      });

    if (insertError) {
      console.error('Supplier document insert:', insertError.code);

      // Remove the uploaded file if its database record
      // could not be created.
      const { error: cleanupError } = await adminDb.storage
        .from(BUCKET)
        .remove([path]);

      if (cleanupError) {
        console.error(
          'Supplier document cleanup failed:',
          cleanupError.message
        );
      }

      return fail(500, {
        message: 'Unable to save the document record.'
      });
    }

    redirect(303, '/international-supplier/documents');
  }
};
