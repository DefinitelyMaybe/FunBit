<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@1.0.0-next.13 C:\Users\Aaron\Documents\FunBit\static\models\Petals_2.gltf --root /models/ --types --printwidth 120 --precision 2
-->

<script lang="ts">
	import * as THREE from 'three';
	import { Group } from 'three';
	import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core';
	import { useGltf, useTexture } from '@threlte/extras';

	type $$Props = Props<THREE.Group>;
	type $$Events = Events<THREE.Group>;
	type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } };

	export const ref = new Group();

	type GLTFResult = {
		nodes: {
			Petals_2: THREE.Mesh;
		};
		materials: {
			Flowers: THREE.MeshStandardMaterial;
		};
	};

	const gltf = useGltf<GLTFResult>('/Ultimate-Stylized-Nature/Petals_2.gltf');
	const texture1 = useTexture('/Ultimate-Stylized-Nature/Textures/Flowers.png').then((val) => {
		return val.clone();
	});

	const assets = Promise.all([gltf, texture1]);

	const component = forwardEventHandlers();
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await assets}
		<slot name="fallback" />
	{:then [gltf, t1]}
		<T.Mesh geometry={gltf.nodes.Petals_2.geometry} rotation={[2, -0.53, -1.01]}>
			<T.MeshStandardMaterial side={THREE.DoubleSide} alphaTest={0.5}>
				<T is={t1} attach="map" offset={[0, 0.2]} />
			</T.MeshStandardMaterial>
		</T.Mesh>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
