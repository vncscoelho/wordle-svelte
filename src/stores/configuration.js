import { derived, writable } from 'svelte/store';

export const config = writable({
	ROWS: 5,
	LETTERS: 5
});

export const iterables = derived(config, (configValues) =>
	Object.entries(configValues).reduce((result, [key, value]) => {
		result[key] = new Array(value);

		return result;
	}, {})
);
