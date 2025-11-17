import { error } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + params.slug);

	if (!response.ok) {
		throw error(response.status, { message: response.statusText });
	}

	const data = await response.json();
	return { params, response: data };
}
