import { writable, get } from 'svelte/store';
import { iterables } from './game';
import { browser } from '$app/env';

const { ROWS } = get(iterables);

const defaultResults = ROWS.reduce((allResults, _, index) => {
	allResults[index + 1] = 0;
	return allResults;
}, {});

const resultsStorage = (browser && JSON.parse(localStorage.getItem('results'))) || defaultResults;

export const results = writable(resultsStorage);

results.subscribe((results) => {
	if (browser) {
		localStorage.setItem('results', JSON.stringify(results));
	}
});
