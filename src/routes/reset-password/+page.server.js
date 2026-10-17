
import { fail, redirect } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({
    'cache-control': 'private, no-store'
  });

  const supabase = createAuthClient(event);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(303, '/login?recovery=invalid');
  }

  return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const password = String(form.get('password') ?? '');
    const confirm = String(form.get('confirm') ?? '');

    if (password.length < 12) {
      return fail(400, {
        message: 'Use a password of at least 12 characters.'
      });
    }

    if (password !== confirm) {
      return fail(400, {
        message: 'The passwords do not match.'
      });
    }

    const supabase = createAuthClient(event);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect(303, '/login?recovery=invalid');
    }

    const { error } = await supabase.auth.updateUser({
      password
    });

    if (error) {
      console.error('Password update:', error.code);
      return fail(400, {
        message: 'Unable to update your password. Try again.'
      });
    }

    await supabase.auth.signOut({ scope: 'local' });

    redirect(303, '/login?recovery=success');
  }
};
