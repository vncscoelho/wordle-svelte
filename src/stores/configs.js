import { derived, writable } from 'svelte/store';

export const configs = writable({
	ROWS: 5,
	LETTERS: 5
});

export const iterables = derived(configs, (configValues) =>
	Object.entries(configValues).reduce((result, [key, value]) => {
		result[key] = new Array(value);

		return result;
	}, {})
);
