<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	<ul class="p-4 bg-stone-600 text-white font-semibold flex flex-col text-center sm:flex-row gap-10 justify-center">
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/shoppinglist">Shopping List</a>
		</li>
		<li>
			<a href="/register">Register</a>
		</li>
		<li>
			<a href="/photoapp">Photoapp</a>
		</li>
		<li>
			<a href="/memory">Memory</a>
		</li>
		<li>
			<a href="/chat">Chat</a>
		</li>
		<li>
			<a href="/search">Search</a>
		</li>
	</ul>
</main>

{@render children?.()}
