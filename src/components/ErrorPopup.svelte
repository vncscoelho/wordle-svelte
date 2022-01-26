<script>
	import { fly } from 'svelte/transition';

	export let show;
	export let currentGuess;
</script>

{#if show}
	<div class="word-error" transition:fly={{ duration: 300, y: -200 }}>
		{currentGuess} isn't a valid word.
	</div>
{/if}
