<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { interactivity } from '@threlte/extras';

	export let element: HTMLElement;

	const { camera } = useThrelte();

	interactivity({
		target: element
	});

	let color: string = 'hotpink';
</script>

<T.PerspectiveCamera makeDefault position={[3, 3, 3]} on:create={({ ref }) => ref.lookAt(0, 0, 0)}>
	<T is={OrbitControls} args={[camera.current, element]} />
</T.PerspectiveCamera>

<T.Mesh
	on:pointerenter={() => {
		color = 'red';
	}}
	on:pointerleave={() => {
		color = 'hotpink';
	}}>
	<T.MeshStandardMaterial {color} />
	<T.BoxGeometry />
</T.Mesh>
<T.DirectionalLight />
<T.AmbientLight />
