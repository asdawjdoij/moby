<main class="flex-col">
	<div class="bg-black/[25%] max-w-xl mx-auto my-5 rounded-xl flex p-3">
		<div class="flex justify-between w-full">
			<p class="p-3 text-2xl text-white font-bold my-auto rounded-xl">Shoppinglist</p>
			<div id="test" class="p-3 w-16 h-16 text-lg my-auto flex text-white rounded-xl">
				<FaShoppingCart />
			</div>
		</div>
	</div>
	<div class="max-w-xl mx-auto bg-black/20 p-4 rounded-xl text-white mb-6">
		<p class="text-xl mb-3 font-semibold">Lägg till vara</p>
		<input
			bind:value={newItem}
			placeholder="Vara"
			class="w-full p-2 rounded-lg mb-3 bg-white/20 text-white"
		/>

		<input
			bind:value={newCategory}
			placeholder="Kategori (valfritt)"
			class="w-full p-2 rounded-lg mb-3 bg-white/20 text-white"
		/>

		<input
			type="number"
			bind:value={newPriority}
			min="1"
			max="10"
			placeholder="Prioritet (1-10)"
			class="w-full p-2 rounded-lg mb-3 bg-white/20 text-white"
		/>

		<button on:click={addItem}
						class="bg-green-500 hover:bg-green-400 duration-300 w-full p-2 rounded-lg font-bold cursor-pointer">
			Lägg till
		</button>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 max-w-4xl mx-auto text-white">

		<section>
			<h2 class="text-2xl font-bold mb-3">Att köpa</h2>

			<ul class="space-y-3">
				{#each items.filter(i => !i.bought).sort((a,b) => a.priority - b.priority) as item}
					<li class="grid grid-cols-[50px_1fr_100px] bg-black/25 p-3 rounded-xl items-center">
						<button on:click={() => toggleBought(item)} class="text-2xl cursor-pointer">+</button>

						<div>
							<p class="font-semibold">{item.name}</p>
							<p class="text-sm opacity-70">({item.category})</p>
						</div>

						<button on:click={() => deleteItem(item)} class="text-red-400 hover:text-red-300 duration-300 cursor-pointer font-bold text-lg">
							Ta bort
						</button>
					</li>
				{/each}
			</ul>
		</section>

		<section>
			<h2 class="text-2xl font-bold mb-3">Köpta</h2>

			<ul class="space-y-3">
				{#each items.filter(i => i.bought).sort((a,b) => a.priority - b.priority) as item}
					<li class="grid grid-cols-[50px_1fr_100px] bg-black/25 p-3 rounded-xl items-center">
						<button on:click={() => toggleBought(item)} class="text-2xl cursor-pointer">-</button>

						<div>
							<p class="font-semibold line-through">{item.name}</p>
							<p class="text-sm opacity-70">({item.category})</p>
						</div>

						<button on:click={() => deleteItem(item)} class="text-red-400 hover:text-red-300 duration-300 cursor-pointer font-bold text-lg">
							Ta bort
						</button>
					</li>
				{/each}
			</ul>
		</section>

	</div>
</main>

<script>
	import FaShoppingCart from 'svelte-icons/fa/FaShoppingCart.svelte';

	let items = [
		{ name: 'Mjölk', category: 'Mejeri', bought: false, priority: 2 },
		{ name: 'Bananer', category: 'Frukt', bought: false, priority: 3 },
		{ name: 'Ägg', category: 'Mejeri', bought: true, priority: 1 }
	];

	let newItem = '';
	let newCategory = '';
	let newPriority = 1;


	function addItem() {
		if (!newItem.trim()) return;
		items = [
			...items,
			{
				name: newItem,
				category: newCategory || 'Okänd',
				bought: false,
				priority: newPriority
			}
		];
		newItem = '';
		newCategory = '';
		newPriority = 1;
	}

	function toggleBought(item) {
		item.bought = !item.bought;
		items = [...items];
	}

	function deleteItem(item) {
		items = items.filter(i => i !== item);
	}

</script>