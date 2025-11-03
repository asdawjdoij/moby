<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<article class="text-white">
	<h1>{data.title}</h1>
	<p>Published: {data.date}</p>
	<svelte:component this={data.content} />
</article>