import { error, fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '$lib/server/auth.js';

function createDatabaseClient() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    error(500, 'Supabase database settings are missing.');
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

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({ 'cache-control': 'private, no-store' });

  const { user } = await requireAdmin(event);
  const database = createDatabaseClient();

  const { data: inquiries, error: databaseError } = await database
    .from('buyer_inquiries')
    .select(
      'id, full_name, company, email, phone, inquiry_type, product_name, quantity, message, status, created_at'
    )
    .order('created_at', { ascending: false })
    .limit(100);

  if (databaseError) {
    console.error('Admin inquiries error:', databaseError.message);
    error(500, 'Unable to load inquiries. Please try again.');
  }

  return {
    email: user.email,
    inquiries: inquiries ?? []
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  updateStatus: async (event) => {
    await requireAdmin(event);

    const form = await event.request.formData();
    const id = String(form.get('id') ?? '').trim();
    const status = String(form.get('status') ?? '').trim();
    const previousStatus = String(form.get('previousStatus') ?? '').trim();

    const validId =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    const allowedStatuses = ['new', 'contacted', 'closed'];

    if (
      !validId ||
      !allowedStatuses.includes(status) ||
      !allowedStatuses.includes(previousStatus)
    ) {
      return fail(400, {
        success: false,
        message: 'Invalid inquiry update request.'
      });
    }

    const database = createDatabaseClient();

    const { data: updated, error: databaseError } = await database
      .from('buyer_inquiries')
      .update({ status })
      .eq('id', id)
      .eq('status', previousStatus)
      .select('id');

    if (databaseError) {
      console.error('Inquiry status error:', databaseError.message);

      return fail(500, {
        success: false,
        message: 'Unable to update the inquiry. Please try again.'
      });
    }

    if (!updated?.length) {
      return fail(409, {
        success: false,
        message:
          'This inquiry changed or no longer exists. Refresh the page and try again.'
      });
    }

    return {
      success: true,
      message: `Inquiry marked as ${status}.`
    };
  }
};