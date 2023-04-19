<script lang="ts">
	export let name: string;
	export let url: string;

	let clicked = false;
	let type = name.slice(name.lastIndexOf('.') + 1);
</script>

<div class="flex items-center">
	<span>{name}</span>
	{#if type == 'jpg' || type == 'png'}
		<div class="w-20 h-20 p-2 flex items-center">
			<img src={url} alt="" loading="lazy" />
		</div>
	{/if}
	<button
		class="p-2"
		on:click={() => {
			clicked = true;
			navigator.clipboard.writeText(window.location + url);
			setTimeout(() => (clicked = false), 500);
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6 {clicked ? 'hidden' : ''}"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
			/>
		</svg>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6 {!clicked ? 'hidden' : ''}"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
		</svg>
	</button>
</div>

<style>
	span {
		padding: 0 0 0 1.5em;
		background: 0 0.1em no-repeat;
		background-size: 1em 1em;
	}
</style>
