<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@3.0.0-next.11 C:\Users\blah\Documents\FunBit\static\Ultimate-Stylized-Nature\Bush.gltf --root /Ultimate-Stylized-Nature/ --types --printwidth 120 --precision 2 --suspense
-->

<script lang="ts">
	import type * as THREE from 'three';

	import type { Snippet } from 'svelte';
	import { T, type Props } from '@threlte/core';
	import { useGltf, useSuspense, useTexture } from '@threlte/extras';

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
			Bush: THREE.Mesh;
		};
		materials: {
			Bush_Leaves: THREE.MeshStandardMaterial;
		};
	};

	const gltf = suspend(useGltf<GLTFResult>('/Ultimate-Stylized-Nature/Bush.gltf'));
	const texture1 = suspend(useTexture('/Ultimate-Stylized-Nature/Textures/Bush_Leaves.png'));

	const assets = Promise.all([gltf, texture1]);
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await assets}
		{@render fallback?.()}
	{:then [gltf, t1]}
		<T.Mesh geometry={gltf.nodes.Bush.geometry} rotation={[1.96, -0.48, -0.85]}>
			<T.MeshStandardMaterial map={t1} alphaTest={0.2} />
		</T.Mesh>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{@render children?.({ ref })}
</T.Group>
