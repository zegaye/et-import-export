
import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '$lib/server/auth.js';

const BUCKET = 'international-supplier-documents';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
  // Only an authenticated administrator can access this route.
  await requireAdmin(event);

  event.setHeaders({
    'cache-control': 'private, no-store',
    'referrer-policy': 'no-referrer'
  });

  const documentId = event.params.id;

  if (!UUID_PATTERN.test(documentId)) {
    error(400, 'Invalid document ID.');
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    error(500, 'Supabase server configuration is missing.');
  }

  const db = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );

  // Retrieve only the file path for the requested document.
  const { data: document, error: documentError } =
    await db
      .from('international_supplier_documents')
      .select('id, supplier_id, file_path')
      .eq('id', documentId)
      .maybeSingle();

  if (documentError) {
    console.error(
      'Supplier document lookup failed:',
      documentError.code
    );

    error(500, 'Unable to retrieve document.');
  }

  if (!document) {
    error(404, 'Document not found.');
  }

  // Ensure the file belongs to the supplier's storage folder.
  if (
    !document.file_path.startsWith(
      `${document.supplier_id}/`
    )
  ) {
    error(403, 'Invalid document storage path.');
  }

  // Generate a short-lived private download URL.
  const { data: signed, error: signedError } =
    await db.storage
      .from(BUCKET)
      .createSignedUrl(document.file_path, 60);

  if (signedError || !signed?.signedUrl) {
    console.error(
      'Supplier document URL creation failed:',
      signedError?.message
    );

    error(500, 'Unable to open document.');
  }

  // Redirect the administrator to the temporary URL.
  redirect(302, signed.signedUrl);
}
