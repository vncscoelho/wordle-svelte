<script>
	import WordLetter from './WordLetter.svelte';
	import { iterables } from '../stores/configuration';

	export let currentGuess = [];
</script>

<div class="word-row">
	{#each $iterables.LETTERS as _, index}
		<WordLetter letter={currentGuess[index]} />
	{/each}
</div>

<style>
	.word-row {
		display: flex;
		justify-content: center;
	}
</style>
