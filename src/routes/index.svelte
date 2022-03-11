<script>
	import GameBoard from 'src/components/GameBoard.svelte';
	import Header from 'src/components/Header.svelte';
	import normalize from 'normalize.css';
</script>

<main>
	<Header />
	<GameBoard />
</main>

<svelte:head>
	<style lang="scss">
		@use 'src/styles/global.scss';
	</style>
</svelte:head>
