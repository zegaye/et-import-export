import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createAuthClient } from '$lib/server/auth.js';

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

  return {
    email: user.email ?? ''
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  logout: async (event) => {
    const supabase = createAuthClient(event);

    const { error: logoutError } = await supabase.auth.signOut({
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