import { derived, writable } from 'svelte/store';
import { playableWords } from '../services/words';

const getRandomWord = () => {
	const randomNumber = Math.floor(Math.random() * playableWords.length);
	const word = playableWords[randomNumber];
	console.log('Word of the day', word);

	return word;
};

export const wordOfTheDay = writable(getRandomWord());

export const wordIterable = derived(wordOfTheDay, (word) => [...word]);

export const lastValidGuess = writable('');
