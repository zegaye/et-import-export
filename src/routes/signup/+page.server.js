
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

  if (user) redirect(303, '/dashboard');

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

    const accountType = read('accountType').trim();
    const fullName = read('fullName').trim();
    const companyName = read('companyName').trim();
    const country = read('country').trim();
    const phone = read('phone').trim();
    const email = read('email').trim();
    const password = read('password');
    const confirmPassword = read('confirmPassword');

    const values = {
      accountType,
      fullName,
      companyName,
      country,
      phone,
      email
    };

    /** @param {string} message */
    function invalid(message) {
      return fail(400, {
        success: false,
        message,
        values
      });
    }

    if (!['exporter', 'buyer'].includes(accountType)) {
      return invalid('Select Exporter or International Buyer.');
    }

    if (!fullName || fullName.length > 100) {
      return invalid('Enter a valid full name (maximum 100 characters).');
    }

    if (!companyName || companyName.length > 150) {
      return invalid('Enter a company or business name (maximum 150 characters).');
    }

    if (!country || country.length > 100) {
      return invalid('Enter a valid country.');
    }

    if (!phone || phone.length > 30 || !/^\+?[0-9()\s.-]{7,30}$/.test(phone)) {
      return invalid('Enter a valid phone number.');
    }

    if (!email || email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return invalid('Enter a valid email address.');
    }

    if (password.length < 12 || password.length > 128) {
      return invalid('Password must contain 12–128 characters.');
    }

    if (password !== confirmPassword) {
      return invalid('Passwords do not match.');
    }

    const supabase = createAuthClient(event);

    const {
      data: { user: existingUser }
    } = await supabase.auth.getUser();

    if (existingUser) redirect(303, '/dashboard');

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          account_type: accountType,
          company_name: companyName,
          country,
          phone
        },
        emailRedirectTo: `${event.url.origin}/auth/confirm`
      }
    });

    if (signupError) {
      console.error(
        'Trade registration failed:',
        signupError.code ?? signupError.status
      );

      return fail(signupError.status === 429 ? 429 : 400, {
        success: false,
        message: signupError.status === 429
          ? 'Too many attempts. Please try again later.'
          : 'Unable to register. If you already have an account, try signing in.',
        values
      });
    }

    if (data.session) {
      redirect(303, '/dashboard');
    }

    return {
      success: true,
      message:
        'Check your email for the confirmation link. If this email is already registered, use the sign-in page.',
      values
    };
  }
};
