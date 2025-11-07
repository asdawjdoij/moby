<script>
	let image = 'https://picsum.photos/id/70/367/267';
	let photo = 'https://picsum.photos/id/88/367/267';
	let picture = 'https://picsum.photos/id/93/367/267';

	const photos = { image, photo, picture };
</script>

<main class="text-white">
	<h1 class="font-semibold text-xl">Photoapp</h1>
	<p>Denna sida innehåller fina bilder</p>
	<div class="flex w-full h-[300px] overflow-hidden">
		{#each Object.entries(photos) as [_, value]}
			<div class="image-wrapper">
				<img src="{value}" alt="">
			</div>
		{/each}
	</div>
</main>

<style>

    .image-wrapper {
        flex: 1 1 0;
        margin: 5px;
        transition: flex 0.5s;
    }

    .image-wrapper:hover {
        flex: 2 1 0;
    }

    .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
        box-shadow: 4px 8px 10px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
    }

</style>