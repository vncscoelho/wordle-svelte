<script>
	import { currentRow, playerOfTheDay as player } from 'src/stores/game';
	import FlagRow from './FlagRow.svelte';

	const tips = [
		{
			key: 'seasons',
			label: 'Elenco'
		},
		{
			key: 'nationality',
			label: 'Nacionalidade'
		},
		{
			key: 'club',
			label: 'Clube'
		},
		{
			key: 'position',
			label: 'Posição'
		},
		{
			key: 'initials',
			label: 'Iniciais'
		}
	];

	const foundTips = {};
</script>

<ul class="player-info">
	{#each tips as tip, index}
		<li class="player-info__item {tip.key}">
			<span class="label">{tip.label}</span>
			{#if foundTips[tip.key] || $currentRow >= index}
				{#if tip.key === 'nationality'}
					<FlagRow countries={$player.nationality} />
				{:else}
					<strong class="value">{$player[tip.key]}</strong>
				{/if}
			{:else}
				<span>-</span>
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	.player-info {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 8px 0;
		width: 100%;
		background: #ededed;
		border: $useBorder;
		border-bottom: 0;
		padding: 16px 16px 20px;
		counter-reset: tips;

		&__item {
			display: grid;
			align-items: center;
			justify-content: start;
			grid-template:
				'a b'
				'a c';
			grid-gap: 0 8px;

			.label {
				font-size: 0.8em;
			}

			.value {
				font-weight: 700;
			}

			&::before {
				display: flex;
				justify-content: center;
				align-items: center;
				grid-area: a;
				width: 32px;
				transform: rotate(-15deg);
				height: 16px;
				content: '';
				background: #fff;
				border: $useBorder;
				border-radius: 50%;
			}

			&::after {
				font-weight: 800;
				position: relative;
				z-index: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				grid-area: a;
				content: counter(tips);
				counter-increment: tips;
			}

			&.seasons {
				grid-area: 1 / 1 / 1 / 1;
			}

			&.nationality {
				grid-area: 1 / 2 / 1 / span 2;
			}

			&.club {
				grid-area: 2 / span 3;
			}

			&.position {
				grid-area: 3 / 1;
			}

			&.initials {
				grid-area: 3 / 2;
			}
		}
	}
</style>
