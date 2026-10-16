
import { fail, redirect, error } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

const BUCKET = 'exporter-documents';
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const documentTypes = [
  'business_license',
  'export_license',
  'company_profile',
  'quality_certificate'
];

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({ 'cache-control': 'private, no-store' });

  const supabase = createAuthClient(event);

  const { data: { user }, error: authError } =
    await supabase.auth.getUser();

  if (authError || !user) redirect(303, '/login');

  const { data: profile, error: profileError } = await supabase
    .from('trade_profiles')
    .select('account_type, company_name')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) error(500, 'Unable to load business profile.');
  if (!profile) redirect(303, '/complete-profile');
  if (profile.account_type !== 'exporter') {
    error(403, 'Exporter account required.');
  }

  const { data: passed, error: assessmentError } = await supabase
    .from('exporter_assessments')
    .select('id')
    .eq('exporter_id', user.id)
    .eq('status', 'passed')
    .limit(1);

  if (assessmentError) error(500, 'Unable to check assessment.');

  if (!passed?.length) {
    redirect(303, '/exporter/assessment');
  }

  const { data: documents, error: documentsError } = await supabase
    .from('exporter_documents')
    .select('id, document_type, review_status, review_notes, created_at')
    .eq('exporter_id', user.id)
    .order('created_at', { ascending: false });

  if (documentsError) error(500, 'Unable to load documents.');

  return {
    companyName: profile.company_name,
    documents: documents ?? []
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const supabase = createAuthClient(event);

    const { data: { user }, error: authError } =
      await supabase.auth.getUser();

    if (authError || !user) redirect(303, '/login');

    const form = await event.request.formData();
    const documentType = String(form.get('documentType') ?? '');
    const file = form.get('document');

    if (!documentTypes.includes(documentType)) {
      return fail(400, { message: 'Select a valid document type.' });
    }

    if (!(file instanceof File) || file.size === 0) {
      return fail(400, { message: 'Choose a file to upload.' });
    }

    if (file.size > MAX_FILE_SIZE) {
      return fail(400, { message: 'File must not exceed 5 MB.' });
    }

    /** @type {Record<string, string>} */
/** @type {Record<string, string>} */
    const extensions = {
      'application/pdf': 'pdf',
      'image/jpeg': 'jpg',
      'image/png': 'png'
    };

    const extension = extensions[file.type];

    if (!extension) {
      return fail(400, {
        message: 'Only PDF, JPG and PNG files are accepted.'
      });
    }

    const filePath =
      `${user.id}/${documentType}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Document upload failed:', uploadError.message);
      return fail(500, {
        message: 'Unable to upload document to private storage.'
      });
    }

    const { error: insertError } = await supabase
      .from('exporter_documents')
      .insert({
        exporter_id: user.id,
        document_type: documentType,
        file_path: filePath,
        review_status: 'pending'
      });

    if (insertError) {
      // Remove the uploaded file if database registration fails.
      const { error: cleanupError } = await supabase.storage
        .from(BUCKET)
        .remove([filePath]);

      if (cleanupError) {
        console.error('Document cleanup failed:', cleanupError.message);
      }

      console.error('Document registration failed:', insertError.code);

      return fail(500, {
        message: 'Unable to register the uploaded document.'
      });
    }

    redirect(303, '/exporter/documents');
  }
};
