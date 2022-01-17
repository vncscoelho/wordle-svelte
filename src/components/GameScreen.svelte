<script>
	import WordRow from './WordRow.svelte';

	let userInput = [];

	const addLetter = (letter) => {
		if (userInput.length < 5) {
			userInput = [...userInput, letter];
		}
	};
	const removeLetter = () => {
		userInput = userInput.slice(0, userInput.length - 1);
	};

	const handleUserInput = ({ key }) => {
		const isLetterGuess = (character) => character.match(/^[A-Za-z]$/);

		if (isLetterGuess(key)) {
			addLetter(key);
		} else if (key === 'Backspace') {
			removeLetter();
		}
	};
</script>

<!-- Input Listener -->
<svelte:window on:keydown={handleUserInput} on:key />

<div class="game-screen">
	{#each new Array(5) as row}
		<WordRow />
	{/each}
</div>
