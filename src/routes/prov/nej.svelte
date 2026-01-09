<script>
    var hidden = false;

    let all = [1,2,3,4,5,6];
    let even = [2,4,6];

    function bg(n) {
        if (n === 1) {
            return "bg-red-600"
        }
        if (n === 2) {
            return "bg-blue-600"
        }
        if (n === 3) {
            return "bg-yellow-300"
        }
        if (n === 4) {
            return "bg-purple-600"
        }
        if (n === 5) {
            return "bg-orange-600"
        }
        if (n === 6) {
            return "bg-green-600"
        }
        return "bg-sky-600"
}
</script>

<div class="m-10 bg-stone-400 max-w-[60%]">
    <div class="flex flex-row p-4">
    <input class="my-auto mr-2 p-2" type="checkbox" bind:checked={hidden}>
    <p>Visa endast jämna nummer</p>
    </div>
    <div class="grid grid-cols-3 gap-2 py-10 px-10 my-auto text-center h-full text-white justify-center">
    {#each hidden ? even : all as number}
            <div class={hidden ? `visible ${bg(number)} h-full rounded-xl my-auto py-40 duration-300 hover:scale-[1.1]` : `visible ${bg(number)} h-full rounded-xl my-auto py-20 duration-300 hover:scale-[1.1]`}>
                {number}
            </div>
    {/each}
    </div>
</div>

<style>
</style>