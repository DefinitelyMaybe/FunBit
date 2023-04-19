<script lang="ts">
	import File from './File.svelte';

	export let expanded = false;
	export let name: string;
	export let contents: any[];

	function toggle() {
		expanded = !expanded;
	}
</script>

<button class:expanded class="text-lg" on:click={toggle}>{name}</button>

{#if expanded}
	<ul>
		{#each contents as file}
			<li>
				{#if file.contents}
					<svelte:self {...file} />
				{:else}
					<File {...file} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	button {
		padding: 0 0 0 1.5em;
		background-size: 1em 1em;
		color: var(--fg-1);
		font-weight: bold;
		cursor: pointer;
		border: none;
		margin: 0;
	}

	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid rgba(128, 128, 128, 0.4);
	}

	li {
		padding: 0.2em 0;
	}
</style>
