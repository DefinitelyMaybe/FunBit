<script lang="ts">
	import { T, useThrelte, useThrelteUserContext } from '@threlte/core';
	import { Group, Box3, Vector3 } from 'three';

	type SizeProps = {
		box: Box3;
		size: Vector3;
		center: Vector3;
		distance: number;
	};

	export let damping = 6;
	// export let fit = false;
	// export let clip = false;
	// export let observe = false;
	export let margin = 1.2;
	export let eps = 0.01;
	// export let onFit: (data: SizeProps) => void;

	const { camera, invalidate } = useThrelte();
	const userCtx = useThrelteUserContext();
	const controls = $userCtx['threlte-controls']?.orbitControls;

	const container = new Group();
	const box = new Box3();
	const current = { animating: false, focus: new Vector3(), camera: new Vector3(), zoom: 1 };
	const goal = { focus: new Vector3(), camera: new Vector3(), zoom: 1 };

	const { children } = container;

	const center = new Vector3(0, 0, 0);

	$: if (children && $controls) {
		container.children;

		refresh();
		fit();
		clip();

		// const x = getSize();
		// center.copy(x.center);
		// console.log(x);
	}

	const isBox3 = (obj: any): obj is THREE.Box3 => obj && (obj as THREE.Box3).isBox3;

	function equals(a: Vector3, b: Vector3) {
		return Math.abs(a.x - b.x) < eps && Math.abs(a.y - b.y) < eps && Math.abs(a.z - b.z) < eps;
	}

	function getSize() {
		const size = box.getSize(new Vector3());
		const center = box.getCenter(new Vector3());
		const maxSize = Math.max(size.x, size.y, size.z);
		const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * $camera.fov) / 360));
		const fitWidthDistance = fitHeightDistance / $camera.aspect;
		const distance = margin * Math.max(fitHeightDistance, fitWidthDistance);
		return { box, size, center, distance };
	}

	function refresh(object?: THREE.Object3D | THREE.Box3) {
		if (isBox3(object)) box.copy(object);
		else {
			const target = object || container;
			// console.log(target);
			if (!target) return;
			target.updateWorldMatrix(true, true);
			box.setFromObject(target);
		}
		if (box.isEmpty()) {
			const max = $camera.position.length() || 10;
			// console.log(max);
			box.setFromCenterAndSize(new Vector3(), new Vector3(max, max, max));
		}
	}

	function clip() {
		const { distance } = getSize();
		if ($controls) $controls.maxDistance = distance * 10;
		$camera.near = distance / 100;
		$camera.far = distance * 100;
		$camera.updateProjectionMatrix();
		if ($controls) $controls.update();
		invalidate();
	}

	function moveTo({
		position,
		target
	}: {
		position: [number, number, number];
		target?: [number, number, number];
	}) {
		current.camera.copy(camera.position);
		const { center } = getSize();
		goal.camera.set(...position);

		if (target) {
			goal.focus.set(...target);
		} else {
			goal.focus.copy(center);
		}

		if (damping) {
			current.animating = true;
		} else {
			camera.position.set(...position);
		}

		return this;
	}

	function fit() {
		current.camera.copy($camera.position);

		if (controls) current.focus.copy($controls.target);

		const { center, distance } = getSize();
		const direction = center.clone().sub($camera.position).normalize().multiplyScalar(distance);

		goal.camera.copy(center).sub(direction);
		goal.focus.copy(center);

		$camera.position.copy(goal.camera);
		$camera.lookAt(goal.focus);

		if ($controls) {
			$controls.target.copy(goal.focus);
			$controls.update();
		}

		// if (onFitRef.current) onFitRef.current(this.getSize());

		invalidate();
	}
</script>

<T is={container}>
	<slot />
</T>

<T.Mesh position={center}>
	<T.SphereGeometry args={[1, 32, 16]} />
	<T.MeshBasicMaterial color={'red'} />
</T.Mesh>

<T is={box} let:ref>
	<T.Box3Helper args={[ref, 0xff0000]} />
</T>
