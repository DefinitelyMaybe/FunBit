<script>
	import { T, useFrame } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';

	let rotation = 0;

	useFrame((_, delta) => {
		rotation += delta;
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}>
	<OrbitControls />
</T.PerspectiveCamera>
<T.DirectionalLight position={[0, 10, 10]} castShadow />
<T.Mesh position.y={1} rotation.y={rotation} castShadow>
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshStandardMaterial color="hotpink" />
</T.Mesh>
<Grid />
