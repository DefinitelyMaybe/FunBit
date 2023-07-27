<script lang="ts">
	import '../app.css';
	// import Folder from './Folder.svelte';
	// import tree from './static-data.json';
	// TODO-DefinitelyMaybe: Add link back to quaternius website
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<div class="min-h-screen">
	<Canvas>
		<Scene />
	</Canvas>
</div>
<!-- <Folder name="Static" contents={tree.contents} expanded /> -->
