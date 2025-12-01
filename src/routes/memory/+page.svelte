<main>
	{#each items as card}
		<div
			class="card {card.flipped ? 'flipped' : ''}"
			on:click={() => flip(card)}
		>
			<img class="front select-none" src={card.image} alt="front" />
			<div class="back bg-black/[25%] w-[100px] h-[100px]"></div>
		</div>
	{/each}
</main>

<aside
	class="blue"
	class:rounded-tr-lg={blueTurn}
>
	<p>{bluePoints}</p>
</aside>

<aside
	class="red"
	class:rounded-tl-lg={!blueTurn}
>
	<p>{redPoints}</p>
</aside>


<aside class="turn" class:blue={blueTurn}></aside>

<div class="bottom-[20px] fixed right-[50%] translate-x-[50%]">
	<button class="text-white font-semibold cursor-pointer text-2xl bg-black/[25%] p-4 rounded-xl"
					on:click={resetGame}>Starta om
	</button>
</div>

{#if gameover}
	<div class="flex justify-center">
		<p class="bg-black/[25%] p-4 rounded-xl ">Winner {winner}</p>
		</div>
{/if}

<style>
    main {
        display: grid;
        gap: 10px;
        justify-content: center;
        margin-top: 30px;
    }

    @media (min-height: 500px){
        main{
            grid-template-columns: repeat(4, 100px);
            grid-template-rows: repeat(3, 100px);
        }
    }
    @media (max-height: 500px){
        main{
            grid-template-columns: repeat(6, 100px);
            grid-template-rows: repeat(2, 100px);
        }
    }

    .card {
        position: relative;
        width: 100px;
        height: 100px;
        transform-style: preserve-3d;
        transition: transform 300ms;
        cursor: pointer;
    }

    .card img,
    .card .back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 6px;
        display: block;
    }

    .front {
        transform: rotateY(180deg);
    }

    .back {
        transform: rotateY(0deg);
    }

    .flipped {
        transform: rotateY(180deg);
    }

    .card:hover:not(.flipped) {
        transform: scale(1.1);
    }

    aside {
        width: 100px;
        height: 100px;
        position: fixed;
        bottom: 10px;
        right: 10px;
        background-color: #eb4034;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .blue {
        background-color: #34aeeb;
        left: 10px;
        right: auto;
    }

    .turn {
        width: 120px;
        height: 120px;
        position: fixed;
        bottom: 0;
        right: 0;
        box-shadow: 0 0 10px 10px rgba(255, 255, 255, 0.1);
        z-index: -1;
    }

    .turn.blue {
        left: 0;
        right: auto;
    }

    p {
        font-size: x-large;
        color: white;
        font-weight: bold;
    }


</style>

<script>

	import { onMount } from 'svelte';

	let blueTurn = true;
	let ellipsis = '';
	let items = [];
	let bluePoints = 0;
	let redPoints = 0;

	let flipped = [];
	let locked = false;

	let gameover = false;
	let winner = "";

	onMount(() => {
		setInterval(() => {
			if (ellipsis.length >= 3) {
				ellipsis = '';
			} else {
				ellipsis += '.';
			}
		}, 350);

		let pairs = [];
		for (let i = 0; i < 6; i++) {
			const url = `https://picsum.photos/100?random=${i}`;
			pairs.push(
				{ id: crypto.randomUUID(), image: url, flipped: false, matched: false },
				{ id: crypto.randomUUID(), image: url, flipped: false, matched: false }
			);
		}

		items = pairs.sort(() => Math.random() - 0.5);

	});

	function flip(card) {
		if (locked || card.matched || card.flipped) return;

		card.flipped = !card.flipped;

		flipped.push(card);

		if (flipped.length === 2) {
			locked = true;

			const [first, second] = flipped;

			if (first.image === second.image) {
				items = items.map(c => c.image === first.image ? { ...c, matched: true } : c);

				blueTurn ? bluePoints++ : redPoints++;

				flipped = [];
				locked = false;

				check()
			} else {
				setTimeout(() => {
					items = items.map(c =>
						c.matched
							? c
							: flipped.some(fc => fc.id === c.id)
								? { ...c, flipped: false }
								: c
					);

					flipped = [];
					locked = false;
					blueTurn = !blueTurn;
				}, 1000);
			}
		}

		items = items;


	}

	function check() {
		const allMatched = items.every(c => c.matched);

		if (allMatched) {
			gameover = true;

			if (bluePoints > redPoints) winner = "Blue";
			else if (redPoints > bluePoints) winner = "Red";
			else winner = "Draw";
		}
	}

	function resetGame() {
		bluePoints = 0;
		redPoints = 0;
		blueTurn = true;
		flipped = [];
		locked = false;

		let pairs = [];
		for (let i = 0; i < 6; i++) {
			const url = `https://picsum.photos/100?random=${i}`;
			pairs.push(
				{ id: crypto.randomUUID(), image: url, flipped: false, matched: false },
				{ id: crypto.randomUUID(), image: url, flipped: false, matched: false }
			);
		}

		items = pairs.sort(() => Math.random() - 0.5);

		winner = "";
		gameover = false;
	}

</script>