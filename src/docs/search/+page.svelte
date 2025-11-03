<script>
	import { goto } from '$app/navigation';
	let search = '';

	function handle() {
		if (search.trim()) {
			goto('/search/' + search.toLowerCase());
		}
	}
</script>


<form class="" on:submit|preventDefault={handle}>
	<input
		type="text"
		placeholder="Sök upp en Pokemon"
		class="border-none rounded-xl"
		bind:value={search}
	/>
</form>