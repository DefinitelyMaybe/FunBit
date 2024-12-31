<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { View } from '@threlte/extras';
	import Copy from './Copy.svelte';
	import InfiniteScroll from './infiniteScroll.svelte';
	import { AssetClass, type Asset } from '$lib/Asset.svelte';

	let { assets }: { assets: Asset[] } = $props();

	let array = [];

	for (let i = 0; i < assets.length; i++) {
		array.push(new AssetClass(assets[i]));
	}

	// grab the first couple of objects
	let index = $state(21);
	let visibleAssets = $derived(array.slice(0, index));
	let doneLoading = $state(false);
	const incrementAmount = 21;
</script>

<div class="relative min-h-screen">
	<div class="absolute flex h-full w-full flex-col">
		<div class="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each visibleAssets as asset (asset.id)}
				<div class="relative min-h-[300px] rounded-lg border border-[#666] shadow-lg">
					<div class="flex flex-col items-start gap-2">
						<div class="lg:hidden">
							<div class="flex items-center">
								<p class="p-2 text-sm">Enable Rotation</p>
							</div>
						</div>
						<div class="z-[2] rounded-lg bg-white">
							<div class="flex">
								<Copy src={asset.src} />
							</div>
						</div>
					</div>
					<div
						bind:this={asset['el']}
						class="absolute left-0 top-0 z-[1] h-full w-full lg:pointer-events-auto"
					></div>
				</div>
			{/each}
			{#if !doneLoading}
				<div class="relative min-h-[300px]">
					<div class="flex">
						<div class="bg-grey rounded-lg">
							<div class="flex"></div>
							<InfiniteScroll
								load={() => {
									if (index < assets.length) {
										index += incrementAmount;
									} else {
										doneLoading = true;
									}
								}}
							/>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="fixed left-0 top-0 z-[-1] h-full w-full">
		<Canvas>
			{#each visibleAssets as asset (asset.id)}
				<View dom={asset.el}>
					<Scene>
						<asset.obj />
					</Scene>
				</View>
			{/each}
		</Canvas>
	</div>
</div>
