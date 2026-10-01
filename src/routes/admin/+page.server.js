import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { error, fail, redirect } from '@sveltejs/kit';
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

  const { data: submissions, error: databaseError } = await database
    .from('product_submissions')
    .select(
      'id, seller_name, phone, product_name, direction, category, origin, quantity, description, status, created_at, image_path'
    )
    .order('created_at', { ascending: false })
    .limit(100);

  if (databaseError) {
    console.error('Admin listing error:', databaseError.message);
    error(500, 'Unable to load product submissions.');
  }

  const submissionsWithPhotos = await Promise.all(
    (submissions ?? []).map(async (submission) => {
      let imageUrl = '';
      let imageError = false;

      if (submission.image_path) {
        const { data: photo, error: photoError } = await database.storage
          .from('product-photos')
          .createSignedUrl(submission.image_path, 3600);

        if (photoError) {
          console.error('Admin photo error:', photoError.message);
          imageError = true;
        } else {
          imageUrl = photo?.signedUrl ?? '';
          imageError = !imageUrl;
        }
      }

      return {
        ...submission,
        imageUrl,
        imageError
      };
    })
  );

  return {
    email: user.email,
    submissions: submissionsWithPhotos
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  review: async (event) => {
    await requireAdmin(event);

    const form = await event.request.formData();
    const id = String(form.get('id') ?? '').trim();
    const status = String(form.get('status') ?? '');

    const validId =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (!validId || !['approved', 'rejected'].includes(status)) {
      return fail(400, {
        success: false,
        message: 'Invalid product review request.'
      });
    }

    const database = createDatabaseClient();

    const { data: updated, error: databaseError } = await database
      .from('product_submissions')
      .update({ status })
      .eq('id', id)
      .eq('status', 'pending')
      .select('id');

    if (databaseError) {
      console.error('Product review error:', databaseError.message);

      return fail(500, {
        success: false,
        message: 'Unable to update the product. Please try again.'
      });
    }

    if (!updated?.length) {
      return fail(409, {
        success: false,
        message: 'This product was already reviewed or no longer exists.'
      });
    }

    return {
      success: true,
      message:
        status === 'approved'
          ? 'Product approved. It can now appear on the public listing page.'
          : 'Product rejected. It will remain hidden from public listings.'
    };
  },

  logout: async (event) => {
    const { supabase } = await requireAdmin(event);
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      return fail(500, {
        success: false,
        message: 'Unable to sign out. Please try again.'
      });
    }

    redirect(303, '/login');
  }
};