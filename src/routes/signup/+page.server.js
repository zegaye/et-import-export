import { fail, redirect } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({
    'cache-control': 'private, no-store'
  });

  const supabase = createAuthClient(event);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect(303, '/dashboard');
  }

  return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const form = await event.request.formData();

    /** @param {string} name */
    function read(name) {
      const value = form.get(name);
      return typeof value === 'string' ? value : '';
    }

    const fullName = read('fullName').trim();
    const email = read('email').trim();
    const password = read('password');
    const confirmPassword = read('confirmPassword');

    // Keep only non-sensitive fields when displaying errors.
    const values = {
      fullName,
      email
    };

    if (!fullName || fullName.length > 100) {
      return fail(400, {
        success: false,
        message: 'Enter your name using no more than 100 characters.',
        values
      });
    }

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return fail(400, {
        success: false,
        message: 'Enter a valid email address.',
        values
      });
    }

    if (password.length < 12 || password.length > 128) {
      return fail(400, {
        success: false,
        message: 'Use a password between 12 and 128 characters.',
        values
      });
    }

    if (password !== confirmPassword) {
      return fail(400, {
        success: false,
        message: 'Your passwords do not match.',
        values
      });
    }

    const supabase = createAuthClient(event);

    // Prevent registration from replacing an existing signed-in account.
    const {
      data: { user: existingUser }
    } = await supabase.auth.getUser();

    if (existingUser) {
      redirect(303, '/dashboard');
    }

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        },
        emailRedirectTo: `${event.url.origin}/auth/confirm`
      }
    });

    if (signupError) {
      console.error(
        'Supplier registration failed:',
        signupError.code ?? signupError.status
      );

      return fail(signupError.status === 429 ? 429 : 400, {
        success: false,
        message:
          signupError.status === 429
            ? 'Too many attempts. Please wait before trying again.'
            : 'Unable to register. If you already have an account, try signing in. Otherwise, try again later.',
        values
      });
    }

    // A session is returned immediately if email confirmation is disabled.
    if (data.session) {
      redirect(303, '/dashboard');
    }

    return {
      success: true,
      message:
        'Check your inbox and spam folder for a confirmation email. If this address is already registered, use the sign-in page.',
      values
    };
  }
};