<script>
	import WordRow from './WordRow.svelte';
	import { iterables, settings } from '../stores/game';
	import { results } from '../stores/userStats';
	import { lastValidGuess } from '../stores/words';
	import { checkExistingWord } from '../services/words';
	import ErrorPopup from './ErrorPopup.svelte';
	import GameOver from './GameOver.svelte';

	const MAX_LETTERS = $settings.LETTERS;

	/* Init row guesses storage */
	const rowsDataStorage = $iterables.ROWS.fill([]);
	/* Controls which row is being played */
	let currentRow = 0;

	/* Max letters validation */
	$: isCurrentRowValid = rowsDataStorage[currentRow]?.length === MAX_LETTERS;

	/* Row handling */
	const addLetter = (currentLetters, letter) => {
		if (!isCurrentRowValid) {
			rowsDataStorage[currentRow] = [...currentLetters, letter.toUpperCase()];
		}
	};

	const removeLetter = (currentLetters) => {
		rowsDataStorage[currentRow] = currentLetters.slice(0, currentLetters.length - 1);
	};

	/* Controls game loop */
	const submitRow = async () => {
		const currentGuess = rowsDataStorage[currentRow].join('');
		const wordExists = await checkExistingWord(currentGuess);

		if (isCurrentRowValid && wordExists) {
			currentRow++;
			lastValidGuess.set(currentGuess);
			return;
		}

		showWordError(currentGuess);
	};

	/* Shows game over */
	let isGameOver = false;

	const gameOver = () => {
		results.update((results) => {
			console.log({ ...results });
			results[currentRow]++;

			return results;
		});

		isGameOver = true;
	};

	/* Error handling */
	let showError = false;
	let invalidWord;

	const showWordError = (word) => {
		showError = true;
		invalidWord = word;
		setTimeout(() => (showError = false), 2000);
	};

	/* Keyboard input handling */
	const handleUserInput = ({ key }) => {
		const isLetterGuess = (character) => character.match(/^[A-Za-z]$/);
		const currentData = rowsDataStorage[currentRow];

		if (currentRow === MAX_LETTERS || isGameOver) {
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
		<WordRow
			currentGuess={rowsDataStorage[rowIndex]}
			showResults={rowIndex < currentRow}
			on:success={gameOver}
		/>
	{/each}
</div>

<ErrorPopup show={showError} currentGuess={invalidWord} />

<GameOver show={isGameOver} rowsCompleted={currentRow} />
