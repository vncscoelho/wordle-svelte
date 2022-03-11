<script>
	import flags from 'src/services/flags';

	export let countries = [];
</script>

<div class="flag-row">
	{#each countries as country}
		<img class="flag" src={flags?.[country].image} alt={country} title={country} />
	{/each}
</div>

<style lang="scss">
	.flag {
		width: 25px;
	}
</style>
