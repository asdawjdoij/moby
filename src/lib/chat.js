import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import ElizaBot from 'elizabot';

const eliza = new ElizaBot();

function createChatStore() {
	const initial = browser
		? JSON.parse(window.localStorage.getItem('chat') || '[]')
		: [];

	const { subscribe, set, update } = writable(
		initial.length > 0 ? initial : [{ user: 'Eliza', message: eliza.getInitial(), date: new Date().toUTCString() }],
	);

	if (browser) {
		subscribe((value) => {
			window.localStorage.setItem('chat', JSON.stringify(value));
		});
	}

	return {
		subscribe,
		set,
		update,
		reset: () =>
			set([{ user: 'Eliza', message: eliza.getInitial(), date: new Date().toUTCString() }],)
	};
}

export const chat_store = createChatStore();