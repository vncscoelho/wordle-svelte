<script>
	import WordLetter from './WordLetter.svelte';
</script>

<div class="word-row">
	{#each 'wordle' as letter}
		<WordLetter />
	{/each}
</div>

<style>
	.word-row {
		display: flex;
		justify-content: center;
	}
</style>
