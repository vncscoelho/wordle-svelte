<script>
	import GameStats from './GameStats.svelte';
	import Modal from './Modal.svelte';

	let showContact, showStats;
</script>

<header class="header">
	<div class="container">
		<button on:click={() => (showContact = true)}>💌</button>
		<h1><span>GREMI.OOO</span></h1>
		<button on:click={() => (showStats = true)}>📊</button>
	</div>
</header>

<Modal bind:show={showContact}>
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
