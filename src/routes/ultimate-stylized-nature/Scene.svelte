<script lang="ts">
	import { writable } from 'svelte/store';
	import { T, useThrelte, useThrelteUserContext } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import Bounds from '$lib/components/Bounds.svelte';
	import { onMount } from 'svelte';

	export let element: HTMLElement;
	export const callAPI = () => {
		setTimeout(() => {
			if (api) {
				api.refresh().fit();
			}
		}, 500);
	};

	const ref = writable(undefined);
	let api;

	const { camera } = useThrelte();
	const getCtx = () => {
		return { orbitControls: ref };
	};

	useThrelteUserContext('threlte-controls', getCtx);

	onMount(() => {
		callAPI();
	});
</script>

<T.PerspectiveCamera makeDefault position={[5, 5, 5]}>
	{#if element}
		<T
			is={OrbitControls}
			bind:ref={$ref}
			args={[camera.current, element]}
			maxPolarAngle={1.55}
			enableZoom={false} />
	{/if}
</T.PerspectiveCamera>

<T.DirectionalLight position={[1, 1, 1]} />
<T.AmbientLight />

<Bounds bind:api>
	<slot />
</Bounds>

<Grid sectionColor={'#666'} infiniteGrid />
