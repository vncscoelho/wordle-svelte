<script>
	import { searchName } from 'src/services/names.js';
	import { isGameOver } from 'src/stores/game';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import OvalButton from './OvalButton.svelte';
	import Tips from './Tips.svelte';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	let inputValue = '';
	let showTips = false;

	$: results = searchName(inputValue);
	$: $isGameOver && toggleTips(false);

	onMount(() => toggleTips(true));

	function handleSelect(id) {
		if (id) {
			inputValue = '';
			dispatch('select', id);
		}
	}

	function toggleTips(value) {
		showTips = typeof value === 'boolean' ? value : !showTips;
	}
</script>

<footer class="player-search">
	{#if showTips}
		<div class="player-search__wrapper" transition:fly|local={{ y: 100 }}>
			<Tips />
		</div>
	{/if}
	<div class="player-search__wrapper">
		<OvalButton on:click={() => toggleTips()}>
			{#if showTips}
				- DICAS
			{:else}
				+ DICAS
			{/if}
		</OvalButton>
		<input
			{disabled}
			type="text"
			placeholder="Busque por nome de jogadores"
			class="player-search__input"
			bind:value={inputValue}
		/>
	</div>
	<ul class="player-search__dropdown">
		{#each results as player}
			<li on:click={() => handleSelect(player.id)}>{player.name}</li>
		{/each}
	</ul>
</footer>

<style lang="scss">
	.player-search {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;

		&__wrapper {
			position: relative;
		}

		&__input {
			width: 100%;
			height: 75px;
			padding: 16px 8px;
			background: #fff;
			border: $useBorder;
			border-bottom: 0;

			&:disabled {
				background: $silver;
			}
		}

		:global(.oval-button) {
			position: absolute;
			z-index: 1;
			left: 50%;
			top: 0;
			background: $gold;
		}

		&__dropdown {
			width: 100%;
			border: $useBorder;
			border-top: 0;
			max-height: 180px;
			overflow-y: auto;

			li {
				width: 100%;
				padding: 12px 8px;
				background: lighten($primary, 30);
				font-weight: 700;

				&:nth-child(2n) {
					background: white;
				}

				&:hover {
					background: darken($primary, 30);
					color: #fff;
				}
			}
		}
	}
</style>
