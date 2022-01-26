import { derived, writable } from 'svelte/store';

export const settings = writable({
	ROWS: 5,
	LETTERS: 5
});

/* Settings to be used with Array methods */
export const iterables = derived(settings, (values) =>
	Object.entries(values).reduce((result, [key, value]) => {
		result[key] = [...new Array(value)];

		return result;
	}, {})
);
