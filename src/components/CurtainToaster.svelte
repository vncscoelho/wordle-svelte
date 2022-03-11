<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import ConffetiSvg from './ConffetiSvg.svelte';

	export let show;
	export let message = 'Parabéns!';
	export let emoji = `🏆`;
	export let subtitle = 'Você acertou o jogador do dia!';
	export let showConfetti = false;

	const animate = (delay = 0, x = 0) => ({
		delay,
		duration: 350,
		easing: cubicInOut,
		x
	});

	setTimeout(() => (show = false), 2300);
</script>

{#if show}
	<div class="curtain-toaster">
		<div class="curtain one" transition:fly={animate(0, 350)} />
		<div class="curtain two" transition:fly={animate(350, -350)} />
		<div class="curtain content" transition:fade={animate(700, 500)}>
			<span>{emoji}</span>
			<h3>{message}</h3>
			<p>{subtitle}</p>
			{#if showConfetti}
				<ConffetiSvg />
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.curtain-toaster {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100%;

		.curtain {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;

			&.one {
				background: $black;
			}

			&.two {
				background: $primary;
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: #fff;
			color: $primary;

			h3 {
				font-size: max(32px, 5vw);
			}

			span {
				font-size: max(10vw, 40px);
			}

			p {
				font-size: max(18px, 3vw);
				color: $black;
			}

			* + * {
				margin: 8px 0 0;
			}
		}

		:global(#confetti-svg) {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
