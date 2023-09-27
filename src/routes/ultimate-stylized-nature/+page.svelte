<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import View from '$lib/components/View.svelte';
	import Copy from '$lib/components/Copy.svelte';
	import Groups from './ObjectsArray';
	import InfiniteScroll from '$lib/components/infiniteScroll.svelte';

	// grab the first 10 objects
	let index = 10;
	let visibleGroups = Groups.slice(0, 10);
	let doneLoading = false;
</script>

<div class="min-h-screen relative">
	<div class="absolute flex flex-col w-full h-full">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-4">
			{#each visibleGroups as group, i}
				<div class="relative min-h-[300px]">
					<div class="flex">
						<div class="bg-white rounded-lg">
							<div class="flex">
								<Copy src={group.src} />
							</div>
						</div>
					</div>
					<div bind:this={group['el']} class="absolute top-0 left-0 w-full h-full" />
				</div>
			{/each}
			{#if !doneLoading}
				<div class="relative min-h-[300px]">
					<div class="flex">
						<div class="bg-grey rounded-lg">
							<div class="flex" />
							<InfiniteScroll
								on:load={() => {
									if (index < Groups.length) {
										visibleGroups = [...visibleGroups, ...Groups.slice(index, index + 10)];
										index += 10;
									} else {
										doneLoading = true;
									}
								}} />
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="fixed w-full h-full top-0 left-0 z-[-1]">
		<Canvas>
			{#each visibleGroups as group, i}
				<View element={group.el}>
					<Scene element={group.el}>
						<svelte:component this={group.obj} />
					</Scene>
				</View>
			{/each}
		</Canvas>
	</div>
</div>
