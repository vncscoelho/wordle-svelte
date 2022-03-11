<script>
	import { fly, fade } from 'svelte/transition';

	import OvalButton from './OvalButton.svelte';

	export let show = false;
</script>

{#if show}
	<div class="modal" transition:fade>
		<div class="container">
			<div class="modal__content" transition:fly={{ y: -500 }}>
				<OvalButton on:click={() => (show = false)}>✖</OvalButton>
				<slot />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(1px);
		padding: 24px;
		z-index: 10;

		&__content {
			position: relative;
			background: #fff;
			border: $useBorder;
			width: 100%;
			padding: 24px 8px;
			text-align: center;

			:global(h3:nth-of-type(1)) {
				margin-top: 0;
			}
		}

		:global(.oval-button) {
			position: absolute;
			left: 50%;
			top: -16px;
			border: $useBorder;
			border-radius: 50%;
			transform: translateX(-50%) rotate(-15deg);
			width: 32px;
			height: 32px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
