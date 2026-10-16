
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

  // Preserve existing administrator authorization.
  const adminId = env.ADMIN_USER_ID?.trim();

  if (adminId && user.id === adminId) {
    redirect(303, '/admin');
  }

  // Registration metadata is user-editable.
  // Use it for dashboard presentation, not authorization.
  const metadata = user.user_metadata ?? {};

  const rawAccountType = metadata.account_type;

  const accountType =
    rawAccountType === 'exporter' ||
    rawAccountType === 'buyer'
      ? rawAccountType
      : 'unassigned';

  return {
    email: user.email ?? '',
    fullName:
      typeof metadata.full_name === 'string'
        ? metadata.full_name
        : '',
    companyName:
      typeof metadata.company_name === 'string'
        ? metadata.company_name
        : '',
    country:
      typeof metadata.country === 'string'
        ? metadata.country
        : '',
    accountType
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
