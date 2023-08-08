<script lang="ts">
	import '../app.css';
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import View from './View.svelte';
	import Copy from './Copy.svelte';
	import Groups from './ObjectsArray';
</script>

<div class="min-h-screen relative">
	<div class="absolute w-full h-full">
		<a href="https://quaternius.com/" class="text-9xl underline text-blue-400">Quaternius assets</a>
		<div class="grid grid-cols-3 h-full gap-4">
			{#each Groups as group}
				<div class="relative">
					<div class="">
						<Copy src={group.src} />
					</div>
					<div bind:this={group['el']} class="absolute top-0 left-0 w-full h-full" />
				</div>
			{/each}
		</div>
	</div>
	<div class="fixed w-full h-full z-[-1]">
		<Canvas>
			{#each Groups as group}
				<View element={group.el}>
					<Scene element={group.el}>
						<svelte:component this={group.obj} />
					</Scene>
				</View>
			{/each}
		</Canvas>
	</div>
</div>
