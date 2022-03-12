<script>
	import { userStore } from 'src/stores/user';
	import { onMount } from 'svelte';
	import GameStats from './GameStats.svelte';
	import Modal from './Modal.svelte';

	let showContact, showStats;

	onMount(() => {
		showContact = !Object.values($userStore || {})?.length;
	});
</script>

<header class="header">
	<div class="container">
		<button on:click={() => (showContact = true)}>❔</button>
		<h1><span>GREMI.OOO</span></h1>
		<button on:click={() => (showStats = true)}>📊</button>
	</div>
</header>

<Modal bind:show={showContact}>
	<h3>Como jogar</h3>
	<ul>
		<li><span>São <strong>5 chances</strong> para descobrir o jogador do dia</span></li>
		<li>
			<span>
				No campo de texto inferior você pode buscar por jogadores que comporam elencos do Grêmio de
				1995 até 2022 (atualizado em 03/22)
			</span>
		</li>
		<li>
			Clicando em dicas você receberá uma informação do jogador do dia a cada rodada, na sequência
		</li>
		<li>
			<span>
				A sequência de dicas é: <strong>elencos</strong> que participou,
				<strong>nacionalidade</strong>, <strong>clube</strong> atual, <strong>posição</strong> e por
				fim, as <strong>iniciais</strong> deste jogador
			</span>
		</li>
	</ul>
	<h3>Entre em contato</h3>
	<p>Para reportar bugs, informações incorretas ou outros assuntos, mande um email para:</p>
	<a href="mailto:contato@gremi.ooo">contato@gremi.ooo</a>
	<h3>Créditos</h3>
	<p>
		Dados de jogadores e elenco extraídos de
		<a href="https://www.transfermarkt.com/">Transfermarket</a>
		e fotos Bing Imagens e <a href="https://www.gremiopedia.com/">Grêmiopédia</a>
	</p>
</Modal>

<Modal bind:show={showStats}>
	<h3>Seus resultados</h3>
	<GameStats />
</Modal>

<style lang="scss">
	.header {
		position: relative;
		z-index: 5;
		border-bottom: 3px solid $black;
		background: #fff;

		.container {
			text-align: center;
			flex-direction: row;
		}

		h1 {
			flex: 1;
		}

		button {
			background: none;
			border: 0;
			padding: 16px;
		}
	}
</style>
