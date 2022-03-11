<script>
	import {
		addGuess,
		currentRow,
		currentScore,
		isGameOver,
		iterables,
		playerOfTheDay,
		rows
	} from '../stores/game';
	import PlayerSearch from './PlayerSearch.svelte';
	import Guess from './Guess.svelte';
	import { fade } from 'svelte/transition';
	import ShareButton from './ShareButton.svelte';
	import CurtainToaster from './CurtainToaster.svelte';
	import toasters from 'src/data/toasters';
	import { onMount } from 'svelte';

	/* Game loop
		- versão light dark e elifoot98
	*/

	let showToaster = false;

	$: hasGuessesLeft = $currentRow < $rows;

	function registerGuess({ detail }) {
		if (hasGuessesLeft) {
			addGuess(detail);
			if ($isGameOver) {
				showToaster = true;
			}
		}
	}

	function scrollIntoView(node, shouldScroll) {
		if (shouldScroll) {
			const parent = node.parentElement;

			setTimeout(() => parent.scrollTo(10000, 0), 2000);
		}
	}

	function isNotPotd(guess) {
		return guess.id !== $playerOfTheDay.id;
	}

	let isMounted = false;
	onMount(() => {
		isMounted = true;
	});
</script>

{#if isMounted}
	<div class="game-board" transition:fade>
		<div class="wrapper">
			<div class="game-board__guesses">
				{#each $iterables.ROWS as _, rowIndex}
					{#if $isGameOver === false ? $iterables.GUESSES.length >= rowIndex : $iterables.GUESSES.length > rowIndex && isNotPotd($iterables.GUESSES[rowIndex])}
						<div
							class="game-board__guess"
							data-key={rowIndex}
							use:scrollIntoView={rowIndex && $isGameOver === false}
						>
							<Guess
								player={$iterables.GUESSES[rowIndex]}
								key={rowIndex}
								shrink={hasGuessesLeft === false}
								hits={$currentScore[rowIndex]}
							/>
						</div>
					{/if}
				{/each}
				{#if $isGameOver === true}
					<div class="game-board__guess" use:scrollIntoView={true}>
						<Guess player={$playerOfTheDay} />
					</div>
				{/if}
			</div>
		</div>
		{#if $isGameOver === false}
			<PlayerSearch on:select={registerGuess} />
		{:else}
			<CurtainToaster show={showToaster} {...toasters[$isGameOver === true ? 'success' : 'fail']} />
			<ShareButton />
		{/if}
	</div>
{/if}

<style lang="scss">
	.game-board {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		width: 100%;
		background: $primary;

		.wrapper {
			position: relative;
			flex: 1;
			display: flex;
			align-items: center;
			margin-top: -83px;
		}

		&__guesses {
			display: flex;
			padding: 40px calc(50% - 150px);
			overflow: auto;
			scroll-behavior: smooth;
			scroll-snap-type: x mandatory;
		}

		&__guess {
			scroll-snap-align: center;
			margin: 0 20px;
			transition: transform 300ms;
		}
	}
</style>
