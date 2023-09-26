<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let component: HTMLDivElement;

	onMount(() => {
		const intersectionObserver = new IntersectionObserver((entries) => {
			// If intersectionRatio is 0, the target is out of view
			// and we do not need to do anything.
			if (entries[0].intersectionRatio <= 0) return;
			dispatch('load');
		});
		intersectionObserver.observe(component);
		return () => {
			intersectionObserver.disconnect();
		};
	});
</script>

<div bind:this={component} style="width:0px" />
