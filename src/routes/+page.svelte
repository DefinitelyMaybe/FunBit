<script lang="ts">
	import '../app.css';
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import View from './View.svelte';
	import Copy from './Copy.svelte';

	import MainObject from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_1.svelte';
	import MainObjectSrc from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_1.svelte?raw';

	const groups: { el: HTMLElement | undefined; obj: any }[] = [];

	for (let i = 0; i < Array(10).length; i++) {
		groups.push({
			el: undefined,
			obj: MainObject
		});
	}
</script>

<div class="min-h-screen relative">
	<div class="absolute w-full h-full">
		<a href="https://quaternius.com/" class="text-9xl underline text-blue-400">Quaternius assets</a>
		<div class="grid grid-cols-3 h-full gap-4">
			{#each groups as group}
				<div class="relative bg-black/10">
					<div bind:this={group['el']} class="absolute w-full h-full" />
					<div class="">
						<Copy name="hello" url="" />
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="fixed w-full h-full z-[-1]">
		<Canvas>
			{#each groups as group}
				<View element={group.el}>
					<Scene element={group.el}>
						<MainObject />
					</Scene>
				</View>
			{/each}
		</Canvas>
	</div>
</div>
<!-- <Folder name="" contents={tree.contents} expanded /> -->
