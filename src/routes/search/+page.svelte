<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let search = '';
	const STORAGE_KEY = 'recent-searches';

	function handle() {
		if (!search.trim()) return;

		const normalized = search.toLowerCase();

		let searches = JSON.parse(
			sessionStorage.getItem(STORAGE_KEY) || '[]'
		);

		searches = searches.filter(s => s !== normalized);

		searches.unshift(normalized);

		searches = searches.slice(0, 5);

		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(searches));

		goto(`${base}/search/` + normalized);

		search = '';
	}
</script>

<form on:submit|preventDefault={handle}>
	<input
		type="text"
		placeholder="Sök upp en Pokémon"
		class="border-none rounded-xl px-4 py-2"
		bind:value={search}
	/>
</form>
