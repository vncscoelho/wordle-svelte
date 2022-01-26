<script>
	import { fade } from 'svelte/transition';
	import { results } from '../stores/userStats';

	export let show;
	export let rowsCompleted;

	$: tries = rowsCompleted;
</script>

{#if show}
	<div class="game-over" transition:fade={{ duration: 300 }}>
		Congratulations! You've guessed the word in {tries} tries.

		{#each Object.entries($results) as [tier, wins]}
			<p>
				<strong>{tier}:</strong>
				<progress min="1" max="50" value={wins} />
				<span>{wins}</span>
			</p>
		{/each}
	</div>
{/if}
