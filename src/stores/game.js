import { getPlayerById, getPlayerOfTheDay } from 'src/services/players';
import { derived, readable, writable } from 'svelte/store';
import { getUserGuesses, hasPlayedToday, setGuesses, setResult } from './user';

export const rows = readable(5);

/* 
	---------
	Game loop 
	---------
*/
export const playerOfTheDay = readable(getPlayerOfTheDay());

/* Guesses */
export const guesses = writable({ ...getUserGuesses() });

export function addGuess(id) {
	guesses.update(($guesses) => {
		try {
			const player = getPlayerById(id);
			const length = Object.entries($guesses).length;

			$guesses[length + 1] = player;

			setGuesses($guesses);

			return $guesses;
		} catch (e) {
			console.error('Error adding guess: ', e);
		}
	});
}

export const currentScore = derived([guesses, playerOfTheDay], ([$guesses, $potd]) => {
	return Object.values($guesses).map((guess) => guess.compare($potd));
});

export const currentRow = derived(guesses, ($guesses) => Object.values($guesses).length);

/* Helper: Objects to Array */
export const iterables = derived([guesses, rows], ([$guesses, $rows]) => ({
	GUESSES: Object.values($guesses),
	ROWS: [...new Array($rows)]
}));

/* Game over */
export const isGameOver = derived(
	[iterables, currentRow, playerOfTheDay, rows, hasPlayedToday],
	([$iterables, $currentRow, $potd, $rows, $hasPlayedToday]) => {
		const hasFoundAnswer = $iterables.GUESSES.find(({ id }) => id === $potd.id);

		if (hasFoundAnswer || $currentRow === $rows) {
			/* Player finished */
			setResult($currentRow);
		}

		/* Game not finished */
		return $hasPlayedToday;
	}
);
