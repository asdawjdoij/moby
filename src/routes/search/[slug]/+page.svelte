<script>
	/** @type {import('./$types').PageData} */
	export let data;
	const pokemon = data.response;
</script>

<article>
	{#each Object.entries(pokemon.sprites) as [key, value]}
		{#if typeof value === "string"}
			<img src={value} alt={key} />
		{/if}
	{/each}
</article>

<h1>{pokemon.name}</h1>

<section>
	<p>Height: {pokemon.height}</p>
	<p>Weight: {pokemon.weight}</p>
	<p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
</section>

<style>
    article {
        display: flex;
        gap: 1em;
        width: 90%;
        height: 30%;
        flex-wrap: wrap;
        justify-content: center;
    }

    img {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }

    h1 {
        text-transform: capitalize;
    }
</style>