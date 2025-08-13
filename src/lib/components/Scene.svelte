<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, Suspense, CameraControls, type CameraControlsRef } from '@threlte/extras';
	import { Group, type Mesh, Vector3 } from 'three';

	interface Props {
		mesh?: Mesh;
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let controller = $state<CameraControlsRef>();

	const container = new Group();
</script>

<T.PerspectiveCamera makeDefault>
	<CameraControls bind:ref={controller} maxPolarAngle={1.7} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[1, 1, 1]} />
<T.AmbientLight intensity={0.75} />

<Suspense
	onload={() => {
		let mesh: Mesh;
		let count = 0;
		container.traverse((obj) => {
			if (obj?.isMesh) {
				count += 1;
				if (count == 1) {
					mesh = obj;
				}
			}
		});
		if (mesh) {
			mesh.geometry.computeBoundingBox();
			const x = mesh.geometry.boundingBox?.getSize(new Vector3());

			controller?.fitToBox(mesh, false); //, { cover: false, paddingBottom: 0.05, paddingTop: 0.05 }
			const dist = controller!.distance;
			controller?.setLookAt(0, dist, dist, 0, x!.y / 2, 0);
		} else {
			controller?.setLookAt(5, 5, 5, 0, 0, 0);
		}
	}}
>
	<T is={container}>
		{@render children?.()}
	</T>
</Suspense>

<Grid sectionColor={'#666'} />
