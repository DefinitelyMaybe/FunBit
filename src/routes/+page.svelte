<script lang="ts">
	import Quaternius from './QuaterniusCard.svelte';
	import { convertedAssets, workinprogressAssets } from './packs';
</script>

<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 m-8">
	{#each convertedAssets as pack}
		<Quaternius {...pack} />
	{/each}
	{#each workinprogressAssets as pack}
		<Quaternius {...pack} WIP />
	{/each}
</div>
