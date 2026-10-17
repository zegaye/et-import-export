
import { redirect } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
  const token_hash = event.url.searchParams.get('token_hash');
  const type = event.url.searchParams.get('type');

  if (!token_hash || type !== 'recovery') {
    redirect(303, '/login?recovery=invalid');
  }

  const supabase = createAuthClient(event);

  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type: 'recovery'
  });

  if (error) {
    console.error('Recovery verification:', error.code);
    redirect(303, '/login?recovery=invalid');
  }

  redirect(303, '/reset-password');
}
