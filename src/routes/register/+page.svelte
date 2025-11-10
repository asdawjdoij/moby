<script>
	import { onMount } from 'svelte';
	import { users_store } from '$lib/user';
	import { base } from '$app/paths';

	let shown = false;
	let name = '';
	let email = '';
	let password = '';
	let color = 'blue';

	let users = [];

	onMount(() => {
		if ($users_store.length > 2) {
			users = JSON.parse($users_store);
		}
	});

	const colors = [
		{ namn: 'Blå', value: 'blue' },
		{ namn: 'Röd', value: 'red' },
		{ namn: 'Grön', value: 'green' },
		{ namn: 'Gul', value: 'yellow' },
		{ namn: 'Lila', value: 'purple' }
	];

	function toggle() {
		shown = !shown;
	}

	function handleSubmit() {
		if (!name || !email || !password) {
			alert("Fyll i alla fält!");
			return;
		}

		let existing = users.filter(user => user.username === name);
		if (existing.length > 0) {
			alert("Användarnamnet finns redan! Välj ett annat.");
			return;
		}

		let new_user = { username: name, email, password, color };
		users = [...users, new_user];
		$users_store = JSON.stringify(users);

		alert(`Välkommen ${name}! Du är nu registrerad.`);
		name = email = password = '';
		color = 'blue';
	}

</script>

<main class="">
	<div
		class="text-white flex justify-center gap-4 bg-stone-800 max-w-xl h-full mx-auto flex-col border-stone-700 border-4 rounded-xl">
		<h1 class="text-center text-3xl mt-3 font-semibold">Registering</h1>
		<div class="flex flex-col gap-2">
			<div class="flex flex-col gap-2 w-full px-16">
				<label class="text-sm font-semibold" for="name">Namn:</label>
				<input class="bg-stone-600 border-none rounded-lg" bind:value={name} type="text" id="name">
			</div>
			<div class="flex flex-col gap-2 w-full px-16">
				<label class="text-sm font-semibold" for="email">Email:</label>
				<input class="bg-stone-600 border-none rounded-lg" bind:value={email} type="email" id="email">
			</div>
			<div class="flex flex-col gap-2 w-full px-16">
				<label class="text-sm font-semibold" for="password">Password:</label>
				<input class="bg-stone-600 border-none rounded-lg" bind:value={password} type={shown ? "text" : "password"}
							 id="password">
			</div>

			<div class="flex flex-col gap-2 w-full px-16">
				<label class="text-sm font-semibold" for="color">Favoritfärg:</label>
				<select
					id="color"
					bind:value={color}
					class="bg-stone-600 border-none rounded-lg p-2"
					style="background-image: radial-gradient(circle at 15px center, {color} 0%, {color} 100%);
           background-repeat: no-repeat;
           background-size: 20px 20px;">
					{#each colors as c}
						<option value={c.value}>{c.namn}</option>
					{/each}
				</select>
			</div>

		</div>
		<a href="{base}/login" class="text-center">Har du redan ett konto? Logga In</a>
		<div class="flex flex-row gap-2 w-full px-16">
			<button class="cursor-pointer bg-stone-600 rounded-xl w-full py-4" on:click={toggle}>{shown ? "Hide" : "Show"}
				Password
			</button>
			<button class="cursor-pointer bg-stone-600 rounded-xl w-full py-4" on:click={handleSubmit}>Register</button>
		</div>
	</div>
</main>

<style>
    :global(body), :global(html) {
        margin: 0%;
        padding: 0%;
        height: 100vh;
        width: 100vw;
    }

    main {
        background-image: url("https://t4.ftcdn.net/jpg/05/21/65/59/360_F_521655929_N80d5GaCQJ2VP073PfTXJTe9mkvsNtHE.jpg");
        background-size: cover;
        width: 100%;
        height: 100%;
        padding: 5%;
    }
</style>