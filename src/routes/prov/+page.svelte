<script>
    let size = 3;

    const min = 3;
    const max = 8;

    function randomize() {
        size = Math.floor(Math.random() * (Math.ceil(max) - Math.floor(min) + 1))
    }
</script>

<div class="flex flex-row bg-stone-300 p-4 gap-4">
    <p class="my-auto">Storlek {size}x{size}</p>
    <input class="cursor-pointer" bind:value={size} type="range" min={min} max={max}>
    <button on:click={randomize} class="p-2 bg-red-400 text-white font-semibold font-xs rounded-xl cursor-pointer">Slumpa storlek</button>
</div>