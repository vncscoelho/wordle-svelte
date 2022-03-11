<button on:click class="oval-button">
	<span>
		<slot />
	</span>
</button>

<style lang="scss">
	.oval-button {
		@include isBox;
		border: $useBorder;
		transform: translate(-50%, -50%) rotate(-15deg);
		width: 80px;
		height: 40px;
		border-radius: 50%;
		background: #fff;

		span {
			display: block;
			font-size: 0.8em;
			font-weight: 700;
			transform: rotate(15deg);
		}
	}
</style>
