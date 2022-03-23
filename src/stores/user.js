import { browser } from '$app/env';
import { Player } from 'src/models/Player';
import { getPlayerById } from 'src/services/players';
import { derived, get, writable } from 'svelte/store';

const userData = getUserData();
const today = new Date().setHours(0, 0, 0, 0);

export const userStore = writable(userData);

export const hasPlayedToday = derived(userStore, (data) => (data?.[today]?.result ? true : false));

userStore.subscribe((store) => {
	if (browser) {
		localStorage.setItem('userData', JSON.stringify(store));
	}
});

export function setResult(result) {
	userStore.update((store) => ({
		...store,
		[today]: {
			...store[today],
			result
		}
	}));
}

export function setGuesses(guesses) {
	try {
		userStore.update((store) => ({
			...store,
			[today]: {
				...store[today],
				guesses: parseGuessesIds(guesses)
			}
		}));
	} catch (e) {
		console.error('Error setting guess: ', e);
	}
}

function getUserData() {
	try {
		if (browser) {
			return JSON.parse(localStorage.getItem('userData')) || {};
		}
	} catch (e) {
		console.warn('[USER] Not possible to parse user data.');
		return {};
	}
}

function parseGuessesIds(guesses) {
	return Object.values(guesses).map(({ id }) => id);
}

export function getUserGuesses() {
	try {
		const store = get(userStore)?.[today];

		return store?.guesses.reduce((allGuesses, id, index) => {
			allGuesses[index + 1] = getPlayerById(id);

			return allGuesses;
		}, {});
	} catch (e) {
		console.warn('[USER] Not possible to parse guesses.');
		return {};
	}
}
