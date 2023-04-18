<script lang="ts">
	import Scene from './Scene.svelte';
	import { Canvas } from '@threlte/core';
	import paths from './paths.json';

	console.log(paths);
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Canvas>
	<Scene />
</Canvas>
<ul>
	{#each paths as path}
		<li>{path}</li>
	{/each}
</ul>
