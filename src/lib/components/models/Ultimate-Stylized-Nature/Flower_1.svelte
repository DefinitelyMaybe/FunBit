<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@1.0.0-next.13 C:\Users\Aaron\Documents\FunBit\static\models\Flower_1.gltf --root /models/ --types --printwidth 120 --precision 2
-->

<script lang="ts">
	import type * as THREE from 'three';
	import { Group } from 'three';
	import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	type $$Props = Props<THREE.Group>;
	type $$Events = Events<THREE.Group>;
	type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } };

	export const ref = new Group();

	type GLTFResult = {
		nodes: {
			Flower_1: THREE.Mesh;
		};
		materials: {};
	};

	const gltf = useGltf<GLTFResult>('/Ultimate-Stylized-Nature/Flower_1.gltf');

	const component = forwardEventHandlers();
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Mesh geometry={gltf.nodes.Flower_1.geometry} material={gltf.nodes.Flower_1.material} />
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
