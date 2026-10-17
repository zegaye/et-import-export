
import { redirect } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
  const code = event.url.searchParams.get('code');

  if (!code) {
    redirect(303, '/login?recovery=invalid');
  }

  const supabase = createAuthClient(event);

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error('Auth callback:', error.code);
    redirect(303, '/login?recovery=invalid');
  }

  redirect(303, '/reset-password');
}
