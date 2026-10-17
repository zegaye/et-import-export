
import { fail } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const email = String(form.get('email') ?? '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, {
        message: 'Enter a valid email address.',
        email
      });
    }

    const supabase = createAuthClient(event);

    const redirectTo = new URL(
  '/auth/callback',
  event.url.origin
).toString();

    const { error } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo
      });

    if (error) {
      console.error('Password recovery:', {
        code: error.code,
        status: error.status
      });

      if (error.status === 429) {
        return fail(429, {
          message:
            'Too many requests. Please wait before trying again.',
          email
        });
      }

      return fail(503, {
        message:
          'Password recovery is temporarily unavailable. Please try again later.',
        email
      });
    }

    return {
      success: true,
      message:
        'If this email is eligible, password reset instructions will be sent. Check your inbox and spam folder.',
      email
    };
  }
};
