import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	// @ts-ignore
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + params.slug);

	if (!response.ok) {
		throw error(response.status, { message: response.statusText });
	}

	const data = await response.json();
	return { params, response: data };
}
