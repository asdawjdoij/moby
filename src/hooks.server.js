import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

const allowedRoutes = ['/', '/photoapp'];

export async function handle({ event, resolve }) {
  if (dev) return resolve(event);

  const path = event.url.pathname;

  if (!allowedRoutes.includes(path)) {
    throw redirect(302, '/');
  }

  return resolve(event);
}