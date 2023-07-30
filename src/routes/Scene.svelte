<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import Thing from '$lib/components/models/Ultimate-Stylized-Nature/Petals_4.svelte';
</script>

<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
	<OrbitControls />
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
<Thing />
<Grid sectionColor={'#000'} />
