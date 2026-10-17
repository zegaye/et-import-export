
import { redirect } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
  const tokenHash = event.url.searchParams.get('token_hash');
  const type = event.url.searchParams.get('type');
  const code = event.url.searchParams.get('code');

  const supabase = createAuthClient(event);

  // Support PKCE authentication links.
  if (code) {
    const { error } =
      await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback:', error.code);
      redirect(303, '/login?confirmation=invalid');
    }

    redirect(303, '/dashboard');
  }

  // Support token-hash confirmation links.
  if (
    tokenHash &&
    (type === 'signup' ||
      type === 'email' ||
      type === 'recovery')
  ) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type
    });

    if (error) {
      console.error('Email confirmation:', error.code);
      redirect(303, '/login?confirmation=invalid');
    }

    if (type === 'recovery') {
      redirect(303, '/reset-password');
    }

    redirect(303, '/dashboard');
  }

  // Default Supabase confirmation links can redirect
  // with a session in the URL fragment, which is not
  // available to server-side request handlers.
  // Show the login page after email confirmation.
  redirect(303, '/login?confirmation=complete');
}
