<main>
	{#each items as card}
		<div
			class="card {card.flipped ? 'flipped' : ''}"
			on:click={() => flip(card)}
		>
			<img class="front select-none" src={card.image} alt="front" />
			<div class="back bg-sky-500 w-[100px] h-[100px]"></div>
		</div>
	{/each}
</main>

<aside class="blue">
	<p>{bluePoints}</p>
</aside>

<aside class="red">
	<p>{redPoints}</p>
</aside>

<aside class="turn" class:blue={blueTurn}></aside>

<style>
    main {
        display: grid;
        grid-template-columns: repeat(4, 100px);
        grid-template-rows: repeat(3, 100px);
        gap: 10px;
        justify-content: center;
        margin-top: 30px;
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
        border: rgba(0, 0, 0, 10%) 3px solid;
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
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .blue {
        background-color: blue;
        left: 10px;
        right: auto;
    }

    .turn {
        width: 120px;
        height: 120px;
        position: fixed;
        bottom: 0;
        right: 0;
        box-shadow: 0 0 10px 10px gold;
        z-index: -1;
    }

    .turn.blue {
        left: 0;
        right: auto;
    }

    p {
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

				blueTurn ? bluePoints++ : redPoints++

				flipped = []
				locked = false
			} else {
				setTimeout(() => {
					items = items.map(c =>
						c.matched
							? c
							: flipped.some(fc => fc.id === c.id)
								? { ...c, flipped: false }
								: c
					);

					flipped = []
					locked = false
					blueTurn = !blueTurn
				}, 1000)
			}
		}

		items = items;


	}

</script>