import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { base } from '$app/paths';

const allowedRoutes = ['/', '/photoapp', 'register', 'login'];

export async function handle({ event, resolve }) {
  if (dev) return resolve(event);

  const path = `${base}/${event.url.pathname}`;

  if (!allowedRoutes.includes(path)) {
    throw redirect(302, '/');
  }

  return resolve(event);
	}