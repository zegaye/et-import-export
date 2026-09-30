import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';

/** @param {import('@sveltejs/kit').RequestEvent} event */
export function createAuthClient(event) {
  if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) {
    error(500, 'Supabase login settings are missing.');
  }

  return createServerClient(
    env.SUPABASE_URL,
    env.SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return event.cookies.getAll();
        },
        setAll(cookies) {
          for (const { name, value, options } of cookies) {
            event.cookies.set(name, value, {
              ...options,
              path: '/',
              httpOnly: true,
              sameSite: 'lax',
              secure: event.url.protocol === 'https:'
            });
          }
        }
      }
    }
  );
}

/** @param {import('@sveltejs/kit').RequestEvent} event */
export async function requireAdmin(event) {
  const supabase = createAuthClient(event);
  const { data: { user }, error: authError } =
    await supabase.auth.getUser();

  if (authError || !user) {
    redirect(303, '/login');
  }

  if (!env.ADMIN_USER_ID || user.id !== env.ADMIN_USER_ID.trim()) {
    error(403, 'This account does not have admin access.');
  }

  return { supabase, user };
}