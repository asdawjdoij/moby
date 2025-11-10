<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { dev } from '$app/environment';
	
	let { children } = $props();


	import { base } from '$app/paths';

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	<ul class="p-4 bg-stone-600 text-white font-semibold flex flex-col text-center sm:flex-row gap-10 justify-center">
		<li>
			<a href="{base}/">Home</a>
		</li>
		<li>
			<a href="{base}/shoppinglist">Shopping List</a>
		</li>
		<li>
			<a href="{base}/register">Register</a>
		</li>
		<li>
			<a href="{base}/photoapp">Photoapp</a>
		</li>
		<li>
			<a href="{base}/memory">Memory</a>
		</li>
		<li>
			<a href="{base}/chat">Chat</a>
		</li>
		<li>
			<a href="{base}/search">Search</a>
		</li>
	</ul>
</main>

{@render children?.()}
