<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@3.0.0-next.11 C:\Users\blah\Documents\FunBit\static\Ultimate-Stylized-Nature\Flower_2.gltf --root /Ultimate-Stylized-Nature/ --types --printwidth 120 --precision 2 --suspense
-->

<script lang="ts">
	import type * as THREE from 'three';

	import type { Snippet } from 'svelte';
	import { T, type Props } from '@threlte/core';
	import { useGltf, useSuspense } from '@threlte/extras';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet<[{ ref: THREE.Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
	} = $props();

	const suspend = useSuspense();

	type GLTFResult = {
		nodes: {
			Flower_2: THREE.Mesh;
		};
		materials: {};
	};

	const gltf = suspend(useGltf<GLTFResult>('/Ultimate-Stylized-Nature/Flower_2.gltf'));
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<T.Mesh
			geometry={gltf.nodes.Flower_2.geometry}
			material={gltf.nodes.Flower_2.material}
			scale={0.75}
		/>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{@render children?.({ ref })}
</T.Group>
