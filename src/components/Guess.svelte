<script>
	import { Player } from 'src/models/Player';
	import { fly } from 'svelte/transition';
	import { playerOfTheDay } from 'src/stores/game';
	import FlagRow from './FlagRow.svelte';
	import { onMount } from 'svelte';

	export let player;
	export let key = 0;
	export let shrink = false;
	export let hits = {};

	$: p = player || new Player();
	$: isAnswer = p.id === $playerOfTheDay.id;

	$: footerString = isAnswer ? 'JOGADOR DO DIA' : 'GRÊMIO';

	/* function getImage(id) {
		return new URL(`../../static/players/${id}.png`, import.meta.url).href;
	} */
</script>

<div
	class="player-card"
	class:player-card--answer={isAnswer}
	class:player-card--shrink={shrink}
	class:player-card--flipped={!p.id}
	transition:fly|local={{ y: 100 }}
>
	<div class="player-card__face front">
		<div class="player-card__number">
			<span>{p.number}</span>
		</div>
		<div class="player-card__photo">
			{#if p.id}
				<img src={`players/${p.id}.png`} alt={p.fullName} />
			{/if}
		</div>
		<ul class="player-card__stats">
			<li class="player-card__item name" class:player-card__item--is-hit={hits.name}>
				<strong class="value">{p.name}</strong>
				<small>{p.fullName}</small>
			</li>
			<li class="player-card__item nationality" class:player-card__item--is-hit={hits.nationality}>
				<span class="label">Nacionalidade</span>
				<FlagRow countries={p.nationality} />
			</li>
			<li class="player-card__item seasons" class:player-card__item--is-hit={hits.seasons}>
				<span class="label">Elenco em</span>
				<strong class="value">{p.seasons}</strong>
			</li>
			<li class="player-card__item position" class:player-card__item--is-hit={hits.position}>
				<span class="label">Posição</span>
				<strong class="value">{p.position}</strong>
			</li>
			<li class="player-card__item club" class:player-card__item--is-hit={hits.club}>
				<span class="label">Clube</span>
				<strong class="value" title={p.currentClub}>{p.currentClub}</strong>
			</li>
		</ul>
		<div class="player-card__footer">
			<div class="line">
				<span>{footerString}</span>
				<span class="outlined">{footerString}</span>
				<span>{footerString}</span>
				<span class="outlined">{footerString}</span>
			</div>
			<div class="line">
				<span>{footerString}</span>
				<span class="outlined">{footerString}</span>
				<span>{footerString}</span>
				<span class="outlined">{footerString}</span>
			</div>
		</div>
	</div>
	<div class="player-card__face back">
		<div class="player-card__number inverse">
			<span>#{key + 1}</span>
		</div>
	</div>
</div>

<style lang="scss">
	$root: '.player-card';

	.player-card {
		position: relative;
		width: 260px;
		height: 380px;
		perspective: 1000px;
		transition: transform 0.5s;

		&::after {
			content: '';
			position: absolute;
			background: url('potd-bg.png');
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		&__face {
			@include isBox;
			position: absolute;
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			border-radius: 6px;
			border: $useBorder;
			backface-visibility: hidden;
			-webkit-backface-visibility: hidden;

			&.front {
				background: $primary;
			}

			&.back {
				background: url('/card-bg.svg') no-repeat center/contain $silver;
				transform: rotateY(180deg);
			}
		}

		&__number {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			border: $useBorder;
			top: 8px;
			left: 8px;
			transform: rotate(-15deg);
			padding: 8px;
			border-radius: 50%;
			width: 60px;
			height: 30px;
			background: #fff;

			span {
				transform: rotate(15deg);
				font-weight: 800;
			}

			&.inverse {
				left: initial;
				right: 8px;
			}
		}

		&__photo {
			display: flex;
			height: 200px;
			background: url('/card-bg.svg') no-repeat center/cover;
			overflow: hidden;
			border-radius: 3px;

			img {
				max-width: 100%;
				object-fit: cover;
				width: 100%;
				object-position: top center;
			}
		}

		&__stats {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, 1fr);
			flex: 1;
			margin-top: -20px;
			background: #fff;
			outline: $useBorder;
			border-radius: 15px 0 15px 0;
			overflow: hidden;
		}

		&__item {
			padding: 8px;
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			.label,
			small {
				display: block;
				font-size: 12px;
			}

			.value {
				font-size: 18px;
			}

			&:nth-of-type(2n) {
				border-right: $useBorder;
			}

			&:nth-of-type(n + 4) {
				border-top: $useBorder;
			}

			&.name {
				grid-column: span 2;
				border-bottom: $useBorder;
			}

			&.club strong {
				font-size: 0.8em;
			}

			&--is-hit {
				background: linear-gradient(165deg, $gold, #fff);
			}
		}

		&__footer {
			display: flex;
			flex: 0 0 30px;
			justify-content: center;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;

			.line {
				padding: 5px 0 0;
				display: flex;
				animation: slide 3s infinite linear;

				span {
					font-weight: 800;
					line-height: 0;

					&.outlined {
						-webkit-text-stroke: 1px $black;
						color: transparent;
					}
				}
			}
		}

		&--answer {
			#{$root}__number {
				background: linear-gradient(165deg, $silver, $white);
			}

			#{$root}__face.front {
				background: linear-gradient(90deg, $gold, $white);
			}

			#{$root}__item {
				background: linear-gradient(165deg, $gold, $white);
			}
		}

		&--flipped {
			transform: rotateY(-180deg);
			transform-style: preserve-3d;
		}

		&--shrink {
			transform: scale3d(0.9, 0.9, 1);

			&#{$root}--flipped {
				transform: rotateY(-180deg) scale3d(0.9, 0.9, 1);
				transform-style: preserve-3d;
			}
		}
	}

	@keyframes slide {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(-50%, 0, 0);
		}
	}
</style>
