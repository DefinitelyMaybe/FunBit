<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import View from '$lib/components/View.svelte';
	import Copy from '$lib/components/Copy.svelte';
	import InfiniteScroll from '$lib/components/infiniteScroll.svelte';
	import { Switch } from '$lib/components/ui/switch';

	export let assets: {
		id: number;
		el: HTMLElement | undefined;
		obj: any;
		src: string;
	}[];
	// export let

	// grab the first 10 objects
	let index = 10;
	let visibleAssets = assets.slice(0, index);
	let doneLoading = false;
	let rotatingObjects: number[] = [];
</script>

<div class="min-h-screen relative">
	<div class="absolute flex flex-col w-full h-full">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-4">
			{#each visibleAssets as group, i (group.id)}
				<div class="relative min-h-[300px] border border-[#666]">
					<div class="flex flex-col items-start gap-2">
						<div class="z-[1] lg:hidden">
							<div class="flex items-center">
								<Switch
									onCheckedChange={(checked) => {
										if (checked) {
											rotatingObjects.push(i);
											rotatingObjects = rotatingObjects;
										} else {
											rotatingObjects = rotatingObjects.filter((val) => val != i);
										}
									}} />
								<p class="p-2 text-sm">Enable Rotation</p>
							</div>
						</div>
						<div class="bg-white rounded-lg">
							<div class="flex">
								<Copy src={group.src} />
							</div>
						</div>
					</div>
					<div
						bind:this={group['el']}
						class="absolute top-0 left-0 w-full h-full {rotatingObjects.includes(i)
							? ''
							: 'pointer-events-none'} lg:pointer-events-auto" />
				</div>
			{/each}
			{#if !doneLoading}
				<div class="relative min-h-[300px]">
					<div class="flex">
						<div class="bg-grey rounded-lg">
							<div class="flex" />
							<InfiniteScroll
								on:load={() => {
									if (index < assets.length) {
										visibleAssets = [...visibleAssets, ...assets.slice(index, index + 10)];
										index += 10;
										for (let i = 0; i < visibleAssets.length; i++) {
											if (visibleAssets[i]?.callAPI) {
												visibleAssets[i]?.callAPI();
											}
										}
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
			{#each visibleAssets as group (group.id)}
				<View element={group.el}>
					<Scene element={group.el} bind:callAPI={group.callAPI}>
						<svelte:component this={group.obj} />
					</Scene>
				</View>
			{/each}
		</Canvas>
	</div>
</div>
