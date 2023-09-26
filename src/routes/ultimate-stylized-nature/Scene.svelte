<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import Bounds from '$lib/components/Bounds.svelte';

	export let element: HTMLElement;

	const { camera } = useThrelte();
</script>

<T.PerspectiveCamera makeDefault position={[5, 5, 5]}>
	{#if element}
		<T is={OrbitControls} args={[camera.current, element]} maxPolarAngle={1.55} />
	{/if}
</T.PerspectiveCamera>

<T.DirectionalLight position={[1, 1, 1]} />
<T.AmbientLight />

<Bounds>
	<slot />
</Bounds>

<Grid sectionColor={'#666'} infiniteGrid />
