<script>
	import WordRow from './WordRow.svelte';
	import { iterables, config } from '../stores/configuration';

	const rowsDataStorage = [...$iterables.ROWS].map(() => []);
	let currentRow = 0;

	const addLetter = (currentLetters, letter) => {
		if (currentLetters.length < $config.LETTERS) {
			rowsDataStorage[currentRow] = [...currentLetters, letter];
		}
	};

	const removeLetter = (currentLetters) => {
		rowsDataStorage[currentRow] = currentLetters.slice(0, currentLetters.length - 1);
	};

	const handleUserInput = ({ key }) => {
		const isLetterGuess = (character) => character.match(/^[A-Za-z]$/);
		const currentData = rowsDataStorage[currentRow];

		if (isLetterGuess(key)) {
			addLetter(currentData, key);
		} else if (key === 'Backspace') {
			removeLetter(currentData);
		}
	};
</script>

<!-- Input Listener -->
<svelte:window on:keydown={handleUserInput} />

<div class="game-screen">
	{#each $iterables.ROWS as _, rowIndex}
		<WordRow currentGuess={rowsDataStorage[rowIndex]} showResults={rowIndex < currentRow} />
	{/each}
</div>
