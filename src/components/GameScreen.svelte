<script>
	import WordRow from './WordRow.svelte';
	import { iterables, config } from '../stores/configuration';

	const MAX_LETTERS = $config.LETTERS;

	const rowsDataStorage = [...$iterables.ROWS].map(() => []);
	let currentRow = 0;

	$: isCurrentRowValid = rowsDataStorage[currentRow]?.length === MAX_LETTERS;

	const addLetter = (currentLetters, letter) => {
		if (!isCurrentRowValid) {
			rowsDataStorage[currentRow] = [...currentLetters, letter];
		}
	};

	const removeLetter = (currentLetters) => {
		rowsDataStorage[currentRow] = currentLetters.slice(0, currentLetters.length - 1);
	};

	const submitRow = () => {
		if (isCurrentRowValid) {
			currentRow++;
		}
	};

	const handleUserInput = ({ key }) => {
		const isLetterGuess = (character) => character.match(/^[A-Za-z]$/);
		const currentData = rowsDataStorage[currentRow];

		if (currentRow === MAX_LETTERS) {
			return;
		}

		if (isLetterGuess(key)) {
			addLetter(currentData, key);
		} else if (key === 'Backspace') {
			removeLetter(currentData);
		} else if (key === 'Enter') {
			submitRow();
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
