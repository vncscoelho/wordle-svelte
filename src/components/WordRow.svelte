<script>
	import WordLetter from './WordLetter.svelte';
	import { iterables, settings } from '../stores/game';
	import { wordIterable } from '../stores/words';
	import { LETTER_STATUS } from './WordLetter.svelte';
	import { createEventDispatcher } from 'svelte';

	export let currentGuess = iterables.LETTERS.fill('');
	export let showResults = false;

	const dispatch = createEventDispatcher();

	/* Word indicators */
	$: currentWordStatus = currentGuess.map((letter, letterIndex) => {
		if (!showResults) {
			return LETTER_STATUS.NORMAL;
		}

		if (letter === $wordIterable[letterIndex]) {
			return LETTER_STATUS.CORRECT_SPOT;
		} else if ($wordIterable.includes(letter)) {
			return LETTER_STATUS.MISPLACED;
		}

		return LETTER_STATUS.NOT_EXISTS;
	});

	/* Correct word handling */
	$: isWordGuessed =
		currentGuess.length === $settings.LETTERS &&
		currentWordStatus.every((status) => status === LETTER_STATUS.CORRECT_SPOT);

	$: if (isWordGuessed === true) {
		dispatch('success');
	}
</script>

<div class="word-row">
	{#each $iterables.LETTERS as _, index}
		<WordLetter letter={currentGuess[index]} status={currentWordStatus[index]} />
	{/each}
</div>

<style>
	.word-row {
		display: flex;
		justify-content: center;
	}
</style>
