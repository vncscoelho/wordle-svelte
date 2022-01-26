<script context="module">
	export const LETTER_STATUS = {
		NORMAL: 'normal',
		CORRECT_SPOT: 'correct-spot',
		MISPLACED: 'misplaced',
		NOT_EXISTS: 'not-exists'
	};
</script>

<script>
	export let letter;
	export let status;

	$: classes = (() => {
		let classes = ['word-letter'];

		if (status) {
			classes.push(`word-letter--${status}`);
		}

		return classes.join(' ');
	})();
</script>

<div class={classes}>
	{letter || ''}
</div>

<style lang="scss">
	.word-letter {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0 0 48px;
		height: 48px;
		border: 1px dashed grey;

		&--correct-spot {
			background: green;
		}

		&--misplaced {
			background: yellow;
		}

		&--not-exists {
			background: grey;
		}
	}
</style>
