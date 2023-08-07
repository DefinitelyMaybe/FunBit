<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	export let element: HTMLElement;

	const { camera } = useThrelte();
</script>

<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
	<T is={OrbitControls} args={[camera.current, element]} maxPolarAngle={1.55} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight />

<!-- <ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} /> -->

<Float>
	<slot />
</Float>

<!-- <Grid sectionColor={'#000'} /> -->
<T.Mesh rotation.x={-Math.PI / 2}>
	<T.CircleGeometry args={[2, 32]} />
	<T.MeshStandardMaterial color="red" />
</T.Mesh>
