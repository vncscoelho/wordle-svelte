<script>
	import GameBoard from 'src/components/GameBoard.svelte';
	import Header from 'src/components/Header.svelte';
	import normalize from 'normalize.css';
</script>

<main>
	<Header />
	<GameBoard />
</main>

<style lang="scss" global>
	* {
		box-sizing: border-box;
	}

	body {
		font-family: 'Work Sans';
		color: $black;
		background: $primary;
	}

	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		border: $useBorder;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	a {
		font-weight: 800;
		color: $primary;
	}

	button {
		cursor: pointer;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		max-width: 480px;
		width: 100%;
		margin: 0 auto;
		padding: 0 16px;
	}
</style>
