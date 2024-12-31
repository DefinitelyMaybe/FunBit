<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Grid, Suspense } from '@threlte/extras';
	import CameraControls from './CameraControls.svelte';
	import { Group, type Mesh, PerspectiveCamera, Vector3 } from 'three';

	interface Props {
		mesh?: Mesh;
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	const { dom } = useThrelte();

	const camera = new PerspectiveCamera();
	const controls = new CameraControls(camera, dom);
	controls.maxPolarAngle = 1.7;

	const container = new Group();
</script>

<T is={camera} makeDefault />

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

			controls.fitToBox(mesh, false); //, { cover: false, paddingBottom: 0.05, paddingTop: 0.05 }
			const dist = controls.distance;
			controls.setLookAt(0, dist, dist, 0, x!.y / 2, 0);
		} else {
			controls.setLookAt(5, 5, 5, 0, 0, 0);
		}
	}}
>
	<T is={container}>
		{@render children?.()}
	</T>
</Suspense>

<Grid sectionColor={'#666'} />
