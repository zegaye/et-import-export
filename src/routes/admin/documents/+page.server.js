
import { error, fail } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { requireAdmin } from '$lib/server/auth.js';

/**
 * Create a database connection for admin operations.
 * This function is only used after requireAdmin().
 */
function getAdminDatabase() {
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
export async function load(event) {
  // Check the administrator before accessing private data.
  await requireAdmin(event);

  event.setHeaders({
    'cache-control': 'private, no-store'
  });

  const adminDb = getAdminDatabase();

  const { data: documents, error: documentsError } = await adminDb
    .from('exporter_documents')
    .select(
      'id, exporter_id, document_type, review_status, review_notes, created_at, reviewed_at'
    )
    .order('created_at', { ascending: false });

  if (documentsError) {
    console.error('Document query error:', documentsError.code);
    error(500, 'Unable to load exporter documents.');
  }

  const exporterIds = [
    ...new Set((documents ?? []).map((doc) => doc.exporter_id))
  ];

  /** @type {Record<string, {company_name: string, full_name: string}>} */
  const companyMap = {};

  if (exporterIds.length > 0) {
    const { data: profiles, error: profilesError } = await adminDb
      .from('trade_profiles')
      .select('user_id, company_name, full_name')
      .in('user_id', exporterIds);

    if (profilesError) {
      console.error('Exporter profile query:', profilesError.code);
      error(500, 'Unable to load exporter profiles.');
    }

    for (const profile of profiles ?? []) {
      companyMap[profile.user_id] = {
        company_name: profile.company_name ?? 'Unknown company',
        full_name: profile.full_name ?? 'Unknown exporter'
      };
    }
  }

  return {
    documents: (documents ?? []).map((doc) => ({
      id: doc.id,
      document_type: doc.document_type,
      review_status: doc.review_status,
      review_notes: doc.review_notes,
      created_at: doc.created_at,
      reviewed_at: doc.reviewed_at,
      company_name:
        companyMap[doc.exporter_id]?.company_name ?? 'Unknown company',
      full_name:
        companyMap[doc.exporter_id]?.full_name ?? 'Unknown exporter'
    }))
  };
}

export const actions = {
  /**
   * @param {import('@sveltejs/kit').RequestEvent} event
   */
  review: async (event) => {
    // Never trust a browser request without checking admin identity.
    await requireAdmin(event);

    const formData = await event.request.formData();

    const id = String(formData.get('id') ?? '').trim();
    const status = String(formData.get('status') ?? '').trim();
    const notes = String(formData.get('notes') ?? '').trim();

    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidPattern.test(id)) {
      return fail(400, {
        success: false,
        message: 'Invalid document ID.'
      });
    }

    if (status !== 'approved' && status !== 'rejected') {
      return fail(400, {
        success: false,
        message: 'Invalid review decision.'
      });
    }

    if (notes.length > 1000) {
      return fail(400, {
        success: false,
        message: 'Review notes must be 1000 characters or fewer.'
      });
    }

    if (status === 'rejected' && !notes) {
      return fail(400, {
        success: false,
        message: 'Please provide a reason for rejection.'
      });
    }

    const adminDb = getAdminDatabase();

    // Review only pending documents.
    const { data: updated, error: updateError } = await adminDb
      .from('exporter_documents')
      .update({
        review_status: status,
        review_notes: notes || null,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('review_status', 'pending')
      .select('id')
      .maybeSingle();

    if (updateError) {
      console.error('Document review error:', updateError.code);

      return fail(500, {
        success: false,
        message: 'Unable to save the review decision.'
      });
    }

    if (!updated) {
      return fail(409, {
        success: false,
        message: 'Document not found or already reviewed.'
      });
    }

    return {
      success: true,
      message:
        status === 'approved'
          ? 'Document approved successfully.'
          : 'Document rejected successfully.'
    };
  }
};
