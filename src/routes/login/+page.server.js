import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    if (!env.ADMIN_USER_ID) {
      return fail(500, {
  message: 'The admin account has not been configured.',
  email: ''
});
    }

    const form = await event.request.formData();
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');

    if (!email || !password) {
      return fail(400, {
        message: 'Enter your email and password.',
        email
      });
    }

    const supabase = createAuthClient(event);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      console.error('Admin login failed:', error?.message ?? 'No user returned');
      return fail(400, {
        message: 'Unable to sign in. Check your email and password.',
        email
      });
    }

    if (data.user.id !== env.ADMIN_USER_ID.trim()) {
      await supabase.auth.signOut();

      return fail(403, {
        message: 'This account does not have admin access.',
        email
      });
    }

    redirect(303, '/admin');
  }
};