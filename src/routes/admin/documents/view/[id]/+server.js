
import { error, redirect } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { requireAdmin } from '$lib/server/auth.js';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
  // Authenticate the administrator before using privileged credentials.
  await requireAdmin(event);

  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    error(500, 'Supabase server configuration is missing.');
  }

  const id = event.params.id;

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    error(400, 'Invalid document ID.');
  }

  // This client must only be used on the server.
  const adminDb = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );

  const { data: document, error: documentError } = await adminDb
    .from('exporter_documents')
    .select('id, exporter_id, file_path')
    .eq('id', id)
    .single();

  if (documentError || !document) {
    error(404, 'Document not found.');
  }

  // Ensure the file belongs to the recorded exporter.
  if (!document.file_path.startsWith(`${document.exporter_id}/`)) {
    error(403, 'Invalid document ownership.');
  }

  const { data, error: signedUrlError } = await adminDb.storage
    .from('exporter-documents')
    .createSignedUrl(document.file_path, 60);

  if (signedUrlError || !data?.signedUrl) {
    error(500, 'Unable to open document.');
  }

  // Temporary URL expires after 60 seconds.
  redirect(303, data.signedUrl);
}
