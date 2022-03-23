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
				<div class="modal__window">
					<slot />
				</div>
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

			:global(ul) {
				counter-reset: help;
			}

			:global(ul li) {
				text-align: left;
				display: grid;
				align-items: center;
				justify-content: start;
				grid-template: 'a b' / 32px auto;
				grid-gap: 0 8px;
				margin-bottom: 12px;

				&::before {
					display: flex;
					flex: 0 0 32px;
					justify-content: center;
					align-items: center;
					grid-area: a;
					transform: rotate(-15deg);
					height: 16px;
					content: '';
					background: #fff;
					border: $useBorder;
					border-radius: 50%;
					color: $black;
				}

				&::after {
					font-weight: 800;
					position: relative;
					z-index: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					grid-area: a;
					content: counter(help);
					counter-increment: help;
				}
			}
		}

		&__window {
			overflow: auto;
			max-height: 80vh;
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
