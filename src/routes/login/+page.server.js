import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const form = await event.request.formData();

    const emailValue = form.get('email');
    const passwordValue = form.get('password');

    const email =
      typeof emailValue === 'string' ? emailValue.trim() : '';

    const password =
      typeof passwordValue === 'string' ? passwordValue : '';

    if (!email || !password) {
      return fail(400, {
        message: 'Enter your email and password.',
        email
      });
    }

    const supabase = createAuthClient(event);

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (loginError || !data.user || !data.session) {
      return fail(400, {
        message:
          'Unable to sign in. Check your email and password, and confirm your email if you have just registered.',
        email
      });
    }

    const adminId = env.ADMIN_USER_ID?.trim();

    if (adminId && data.user.id === adminId) {
      redirect(303, '/admin');
    }

    redirect(303, '/dashboard');
  }
};