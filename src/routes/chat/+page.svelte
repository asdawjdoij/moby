<script>
	import ElizaBot from 'elizabot';
	import { enhance } from '$app/forms';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { chat_store } from '$lib/chat.js';

	const eliza = new ElizaBot();

	let renderKey = 0;

	let chat = writable([{ user: 'Eliza', message: eliza.getInitial(), date: new Date().toUTCString() }]);

	onMount(() => {
		chat_store.update(saved => {
			if (saved.length > 0) {
				chat.set(saved);
				return saved;
			}
			const initial = [{ user: 'Eliza', message: eliza.getInitial(), date: new Date().toUTCString() }];
			chat.set(initial);
			return initial;
		});
	});

	async function write(message) {
		chat.update(c => {
			const updated = [...c, { user: 'You', message: message, date: new Date().toUTCString() }];
			chat_store.set(updated);
			return updated;
		});

		const bubble = document.getElementById('bubble');
		bubble.style.display = 'flex';

		await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));

		chat.update(c => {
			const updated = [...c, { user: 'Eliza', message: eliza.transform(message), date: new Date().toUTCString() }];
			chat_store.set(updated);
			return updated;
		});

		bubble.style.display = 'none';
	}

	function reset() {
		renderKey += 1;
		chat_store.reset();

		const container = document.querySelector('section');
		if (container) container.scrollTop = 0;

		const bubble = document.getElementById('bubble');
		if (bubble) bubble.style.display = 'none';
	}

</script>

<main class="flex flex-col min-h-0 my-5 px-4">

	<div class="bg-black/[25%] w-full max-w-xl mx-auto mb-5 rounded-xl p-3">
		<p class="text-2xl text-white font-bold text-center rounded-xl">Chat</p>
	</div>

	{#key renderKey}
		<section
			class="bg-black/[25%] w-full max-w-5xl mx-auto mb-5 rounded-xl p-3 flex flex-col gap-2 overflow-y-scroll h-[69vh]">
			{#each $chat as message, i (i)}
				<article class="{message.user === 'Eliza' ? 'eliza' : 'user'} p-4 flex justify-between bg-stone-700 text-white rounded-xl w-9/12">
					<p>{message.message}</p>
					<p class="text-white/[50%]">{message.date}</p>
				</article>
			{/each}

			<article id="bubble" class="flex gap-2 items-center justify-center" style="display:none;">
				<span class="circle"></span>
				<span class="circle"></span>
				<span class="circle"></span>
			</article>
		</section>
	{/key}

	<div class="max-w-5xl rounded-xl mx-auto w-full flex flex-row p-3 bg-black/[25%]">
		<form
			class="flex gap-2 flex-grow"
			method="post"
			use:enhance={({ formData, cancel, formElement }) => {
      cancel();
      const text = formData.get('text');
      if (text) write(text);
      formElement.reset();
    }}
		>
			<input
				type="text"
				name="text"
				placeholder="Skriv ett meddelande..."
				required
				class="w-full flex-grow bg-transparent rounded-xl ring-0 text-white border-none"
			/>
		</form>

		<button on:click={reset}
						class="ml-2 bg-red-500 hover:bg-red-400 duration-300 rounded-xl py-2 px-4 cursor-pointer text-white font-semibold shrink-0">
			Reset
		</button>
	</div>

</main>

<style>
    .user {
        margin-left: auto;
        background-color: #4a4844;
    }

    .eliza {
        margin-right: auto;
        background-color: #3d3c38;
    }

    .circle {
        width: 10px;
        height: 10px;
        background-color: #fff;
        border-radius: 50%;
        animation: typing 1s ease-in-out infinite;
    }

    .circle:nth-child(1) {
        animation-delay: 0ms;
    }

    .circle:nth-child(2) {
        animation-delay: 333ms;
    }

    .circle:nth-child(3) {
        animation-delay: 666ms;
    }

    @keyframes typing {
        0%, 25%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.4);
        }
    }

    section::-webkit-scrollbar {
        width: 6px;
    }

    section::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 3px;
    }
</style>