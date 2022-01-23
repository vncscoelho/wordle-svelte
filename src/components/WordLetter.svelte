<script>
	export let letter;
</script>

<div class="word-letter">
	{letter || ''}
</div>

<style>
	.word-letter {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0 0 35px;
		height: 35px;
		border: 1px dashed grey;
	}
</style>
