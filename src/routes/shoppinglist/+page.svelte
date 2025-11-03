<main class="flex-col ">
	<div class="bg-black/[25%] max-w-xl mx-auto my-5 rounded-xl flex p-3">
		<div class="flex justify-between w-full">
			<p class="p-3 text-2xl text-white my-auto font-serif rounded-xl">Shoppinglist</p>
			<div id="test" class="p-3 w-16 h-16 text-lg my-auto flex text-white rounded-xl">
				<FaShoppingCart />
			</div>
		</div>
	</div>
	<div>
		<section class="grid grid-cols-2 gap-5 px-20 text-white font-semibold text-lg text-center">
			{#each Object.entries(items) as [_, value]}
				<a class="item" href="/{value}">
					<p>{value}</p>
				</a>
			{/each}
		</section>
	</div>
</main>

<style>
    .item {
        background-color: rgba(0,0,0,25%);
        padding: 10px;
        border-radius: 30px;
    }
</style>

<script>
	import FaShoppingCart from 'svelte-icons/fa/FaShoppingCart.svelte';


	let items = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };

</script>