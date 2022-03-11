<script>
	import { iterables } from 'src/stores/game';

	import { fade } from 'svelte/transition';
	import { userStore } from '../stores/user';

	const defaultStats = $iterables.ROWS.reduce((stats, _, index) => {
		stats[index + 1] = 0;

		return stats;
	}, {});

	$: resultsArray = Object.values($userStore);
	$: played = resultsArray.length;
	$: wins = resultsArray.map(({ result }) => result);
	$: stats = Object.entries(
		wins.reduce((all, tier) => {
			all[tier]++;

			return all;
		}, defaultStats)
	);
	$: won = wins.length;
</script>

<div class="game-stats">
	<div class="game-stats__row">
		<div class="game-stats__column">
			<span>Vitórias</span>
			<strong>{played ? `${(won * 100) / played}%` : 0}</strong>
		</div>
		<div class="game-stats__column">
			<span>Partidas</span>
			<strong>{played}</strong>
		</div>
	</div>
	<div class="game-stats__row game-stats__row--between">
		<small>Acertos</small>
		<small>Qtd.</small>
	</div>
	{#each stats as [tier, result]}
		<div class="game-stats__item">
			<span>{tier}</span>
			<div class="game-stats__bar-wrapper">
				<div class="game-stats__bar" style={`flex: 0 0 ${(result * 100) / won}%`} />
			</div>
			<strong>{result}</strong>
		</div>
	{/each}
</div>

<style lang="scss">
	.game-stats {
		&__item {
			display: flex;
			margin-top: 8px;
		}

		strong,
		span {
			flex: 0 0 30px;
		}

		&__row {
			display: flex;
			justify-content: center;

			&--between {
				justify-content: space-between;
			}
		}

		&__column {
			display: flex;
			flex-direction: column;

			& + & {
				margin: 0 0 0 32px;
			}
		}

		&__bar-wrapper {
			border: $useBorder;
			display: flex;
			flex: 0 1 100%;
			background: $silver;
			overflow: hidden;
		}

		&__bar {
			position: relative;
			background: linear-gradient(90deg, $black, $primary);
			margin: 0 0 0 -15px;

			&:before {
				content: '';
				display: block;
				position: absolute;
				top: 0;
				left: 100%;
				height: 100%;
				width: 20px;
				background: linear-gradient(90deg, $primary, transparent);
			}
		}
	}
</style>
