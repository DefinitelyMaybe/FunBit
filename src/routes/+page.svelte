<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import Scene3 from './Scene3.svelte';
	import View from '../lib/components/View.svelte';
	import '../app.css';
	import Folder from './Folder.svelte';
	import tree from './static-data.json';
	// TODO-DefinitelyMaybe: Add link back to quaternius website

	let el;
	let el2;
</script>

<!-- <div class="min-h-screen relative">
	<div class="absolute w-full h-full">
		<div bind:this={el} class="absolute w-[200px] h-[200px]" />
		<div bind:this={el2} class="absolute left-[200px] w-[200px] h-[200px]" />
	</div>
	<div class="absolute w-full h-full z-[-1]">
		<Canvas>
			<View element={el}>
				<Scene element={el} />
			</View>
			<View element={el2}>
				<Scene3 element={el2} />
			</View>
		</Canvas>
	</div>
</div> -->
<div class="text-9xl">Quaternius assets</div>
<Folder name="" contents={tree.contents} expanded />
