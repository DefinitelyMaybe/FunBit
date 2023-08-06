<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import Thing1 from '$lib/components/models/Ultimate-Stylized-Nature/Rock_1.svelte';
	import Thing2 from '$lib/components/models/Ultimate-Stylized-Nature/Rock_2.svelte';
	import Thing3 from '$lib/components/models/Ultimate-Stylized-Nature/Rock_3.svelte';
	import Thing4 from '$lib/components/models/Ultimate-Stylized-Nature/Rock_4.svelte';
	import Thing5 from '$lib/components/models/Ultimate-Stylized-Nature/Rock_5.svelte';

	export let element: HTMLElement;

	const { camera } = useThrelte();
</script>

<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
	<T is={OrbitControls} args={[camera.current, element]} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight />

<!-- {#each new Array(50) as _}
	{@const x = Math.random() * 20 - 10}
	{@const z = Math.random() * 20 - 10}
	{@const rot = Math.random() * Math.PI * 2}
	{@const scale = Math.random() * 0.5 + 1}
	<Thing position={[x, 0, z]} rotation.y={rot} {scale} />
{/each} -->
<Thing1 />
<Thing2 position={[2, 0, 0]} />
<Thing3 position={[2, 0, 2]} />
<Thing4 position={[0, 0, 2]} />
<Thing5 position={[-2, 0, -2]} />

<Grid sectionColor={'#000'} />
