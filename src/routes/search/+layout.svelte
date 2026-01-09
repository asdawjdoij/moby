<script>
	import { onMount } from 'svelte';
    	import { base } from '$app/paths';

	const STORAGE_KEY = 'recent-searches';
	let searches = [];

	onMount(() => {
		const stored = sessionStorage.getItem(STORAGE_KEY);
		if (stored) {
			searches = JSON.parse(stored);
		}
	});

	function clearData() {
		sessionStorage.removeItem(STORAGE_KEY);
		searches = [];
	}
</script>

<div class="backdrop"></div>

    <button on:click={clearData} class="bg-red-500 p-4 rounded-xl mx-4 my-4 fixed font-medium hover:bg-red-600 text-white duration-300 cursor-pointer">
        Clear Data
    </button>
<main>
	<slot />
</main>

<footer class="fixed bottom-0 w-full flex justify-center gap-4 bg-white/80 py-4">
	{#each searches as search}
		<a
			class="pokemon-link"
			href={`${base}/search/${search}`}
		>
			{search.charAt(0).toUpperCase() + search.slice(1)}
		</a>
	{/each}
</footer>

<style>

    main {
        width: 80vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.8);
        margin: 5vh auto;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        box-sizing: border-box;
    }

    .backdrop {
        width: 100vw;
        height: 100vh;
        background-image: url('https://imageio.forbes.com/specials-images/imageserve/604202ff091b6539cb90fcbc/The-backs-of-a-number-of-Pok-mon-cards-/960x0.jpg?format=jpg&width=960');
        background-size: cover;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        filter: blur(5px);
    }

</style>
