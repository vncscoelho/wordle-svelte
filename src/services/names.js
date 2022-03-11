import names from 'src/data/names';

export function searchName(string = '') {
	const normalized = normalizeString(string);

	// eslint-disable-next-line no-unused-vars
	if (string.length > 1) {
		return names
			.reduce((opts, item) => {
				const matchIndex = normalizeString(item.name).indexOf(normalized);

				if (matchIndex > -1) {
					opts.push({ ...item, matchIndex });
				}

				return opts;
			}, [])
			.sort((a, b) => a.matchIndex - b.matchIndex);
	}

	return [];
}

function normalizeString(string = '') {
	try {
		return string
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim();
	} catch (e) {
		console.error('Not possible to normalize string', string);
	}
}
