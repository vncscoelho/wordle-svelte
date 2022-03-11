<script>
	import { currentScore, iterables, rows } from 'src/stores/game';
	import { fly } from 'svelte/transition';

	//🟦 acerto
	//⬜ erro
	//⬛ linha em branco

	// 🟦🟦⬜⬜🟦
	// 🟦⬜⬜🟦🟦
	// 🟦⬜🟦⬜🟦
	// ⬛⬛⬛⬛⬛

	let showConfirmation = false;

	async function copyResults() {
		const emptyRow = $iterables.ROWS.map(() => `⬛`).join``;
		const score = Object.values($currentScore);
		const results = $iterables.ROWS.map((_, index) => {
			if (score[index]) {
				return Object.values(score[index]).map((item) => (item ? `🟦` : `⬜`)).join``;
			}

			return emptyRow;
		});

		await navigator.clipboard.writeText(`Joguei gremio.ooo\n\n${results.join`\n`}`);

		displayConfirmation();
	}

	function displayConfirmation() {
		showConfirmation = true;
		setTimeout(() => (showConfirmation = false), 2000);
	}
</script>

<div class="share-button">
	<button class="share-button--button" on:click={copyResults}> Compartilhar </button>
	{#if showConfirmation}
		<div class="share-button--confirmation" in:fly={{ y: 100 }} out:fly={{ y: -100 }}>
			Resultados copiados!
		</div>
	{/if}
</div>

<style lang="scss">
	.share-button {
		position: relative;
		border-top: $useBorder;
		font-size: 2em;
		text-align: center;
		overflow: hidden;
		height: 75px;

		&--button {
			font-weight: 700;
			width: 100%;
			height: 100%;
			border: 0;
			background: $gold;
			text-transform: uppercase;
		}

		&--confirmation {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			color: $primary;
			background: #fff;
		}
	}
</style>
