<script>
	let shown = false

	function toggle() {
		shown = !shown;
	}

</script>

<main class="">
	<div class="text-white flex justify-center gap-4 bg-stone-800 max-w-xl h-full mx-auto flex-col border-stone-700 border-4 rounded-xl">
		<h1 class="text-center text-3xl mt-3 font-semibold">Registering</h1>
		<div class="flex flex-col gap-2">
			<div class="flex flex-col gap-2 w-full px-16">
			<label class="text-sm font-semibold" for="name">Namn:</label>
			<input class="bg-stone-600 border-none rounded-lg" type="text" id="name" >
			</div>
			<div class="flex flex-col gap-2 w-full px-16">
				<label class="text-sm font-semibold" for="email">Email:</label>
				<input class="bg-stone-600 border-none rounded-lg" type="email" id="email" >
			</div>
			<div class="flex flex-col gap-2 w-full px-16">
				<label class="text-sm font-semibold" for="password">Password:</label>
				<input class="bg-stone-600 border-none rounded-lg" type={shown ? "text" : "password"} id="password" >
			</div>
		</div>
		<div class="flex flex-row gap-2 w-full px-16">
			<button class="cursor-pointer bg-stone-600 rounded-xl w-full py-4" on:click={toggle}>{shown ? "Hide" : "Show"} Password</button>
			<button class="cursor-pointer bg-stone-600 rounded-xl w-full py-4">Register</button>
		</div>
	</div>
</main>

<style>
    :global(body), :global(html){
        margin: 0%;
        padding: 0%;
        height: 100vh;
        width: 100vw;
    }
    main{
        background-image: url("https://t4.ftcdn.net/jpg/05/21/65/59/360_F_521655929_N80d5GaCQJ2VP073PfTXJTe9mkvsNtHE.jpg");
        background-size: cover;
        width: 100%;
        height: 100%;
        padding: 5%;
    }
</style>