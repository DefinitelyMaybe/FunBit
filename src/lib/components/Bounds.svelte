<script lang="ts">
	import type * as THREE from 'three';
	import { T, useThrelte, useThrelteUserContext } from '@threlte/core';
	import { Group, Box3, Vector3, MathUtils } from 'three';
	import { onMount } from 'svelte';

	type SizeProps = {
		box: Box3;
		size: Vector3;
		center: Vector3;
		distance: number;
	};

	export let damping = 6;
	export let fit = false;
	export let clip = false;
	export let observe = false;
	export let margin = 1.2;
	export let eps = 0.01;
	export let onFit: ((data: SizeProps) => void) | undefined = undefined;
	export const api = {
		getSize,
		refresh,
		clip: clipCamera,
		to,
		fit: fitView
	};

	const { camera, invalidate } = useThrelte();
	const userCtx = useThrelteUserContext();
	const controls = $userCtx['threlte-controls']?.orbitControls;

	const container = new Group();
	const box = new Box3();
	let center = [0, 0, 0];
	let count = 0;

	const isOrthographic = (def: THREE.Camera): def is THREE.OrthographicCamera =>
		def && (def as THREE.OrthographicCamera).isOrthographicCamera;
	const isBox3 = (def: any): def is THREE.Box3 => def && (def as THREE.Box3).isBox3;
	// const onFit: ((data: SizeProps) => void) | undefined = undefined;

	const current = {
		animating: false,
		focus: new Vector3(),
		camera: new Vector3(),
		zoom: 1
	};
	const goal = {
		focus: new Vector3(),
		camera: new Vector3(),
		zoom: 1
	};

	const updateCenter = () => {
		let x = api.getSize();
		center = x.center.toArray();
		console.log(center);
	};

	function equals(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) {
		return Math.abs(a.x - b.x) < eps && Math.abs(a.y - b.y) < eps && Math.abs(a.z - b.z) < eps;
	}

	function damp(
		v: { x: number; y: number; z: number },
		t: { x: number; y: number; z: number },
		lambda: any,
		delta: number
	) {
		v.x = MathUtils.damp(v.x, t.x, lambda, delta);
		v.y = MathUtils.damp(v.y, t.y, lambda, delta);
		v.z = MathUtils.damp(v.z, t.z, lambda, delta);
	}

	function getSize() {
		const size = box.getSize(new Vector3());
		const center = box.getCenter(new Vector3());
		const maxSize = Math.max(size.x, size.y, size.z);
		const fitHeightDistance = isOrthographic($camera)
			? maxSize * 4
			: maxSize / (2 * Math.atan((Math.PI * $camera.fov) / 360));
		const fitWidthDistance = isOrthographic($camera)
			? maxSize * 4
			: fitHeightDistance / $camera.aspect;
		const distance = margin * Math.max(fitHeightDistance, fitWidthDistance);
		return { box, size, center, distance };
	}

	function refresh(object?: THREE.Object3D | THREE.Box3) {
		if (isBox3(object)) box.copy(object);
		else {
			const target = object || container;
			if (!target) return; //this;
			target.updateWorldMatrix(true, true);
			box.setFromObject(target);
		}
		if (box.isEmpty()) {
			const max = $camera.position.length() || 10;
			box.setFromCenterAndSize(new Vector3(), new Vector3(max, max, max));
		}

		if ($controls?.constructor.name === 'OrthographicTrackballControls') {
			// Put camera on a sphere along which it should move
			const { distance } = getSize();
			const direction = $camera.position
				.clone()
				.sub($controls.target)
				.normalize()
				.multiplyScalar(distance);
			const newPos = $controls.target.clone().add(direction);
			$camera.position.copy(newPos);
		}

		updateCenter();
		return; //this;
	}

	function clipCamera() {
		const { distance } = getSize();
		if ($controls) $controls.maxDistance = distance * 10;
		$camera.near = distance / 100;
		$camera.far = distance * 100;
		$camera.updateProjectionMatrix();
		if ($controls) $controls.update();
		invalidate();
		return; //this;
	}

	function to({
		position,
		target
	}: {
		position: [number, number, number];
		target?: [number, number, number];
	}) {
		current.camera.copy($camera.position);
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
			$camera.position.set(...position);
		}

		return; //this;
	}

	function fitView() {
		current.camera.copy($camera.position);
		if ($controls) current.focus.copy($controls.target);

		const { center, distance } = getSize();
		const direction = center.clone().sub($camera.position).normalize().multiplyScalar(distance);

		goal.camera.copy(center).sub(direction);
		goal.focus.copy(center);

		if (isOrthographic($camera)) {
			current.zoom = $camera.zoom;

			let maxHeight = 0,
				maxWidth = 0;
			const vertices = [
				new Vector3(box.min.x, box.min.y, box.min.z),
				new Vector3(box.min.x, box.max.y, box.min.z),
				new Vector3(box.min.x, box.min.y, box.max.z),
				new Vector3(box.min.x, box.max.y, box.max.z),
				new Vector3(box.max.x, box.max.y, box.max.z),
				new Vector3(box.max.x, box.max.y, box.min.z),
				new Vector3(box.max.x, box.min.y, box.max.z),
				new Vector3(box.max.x, box.min.y, box.min.z)
			];
			// Transform the center and each corner to camera space
			center.applyMatrix4($camera.matrixWorldInverse);
			for (const v of vertices) {
				v.applyMatrix4($camera.matrixWorldInverse);
				maxHeight = Math.max(maxHeight, Math.abs(v.y - center.y));
				maxWidth = Math.max(maxWidth, Math.abs(v.x - center.x));
			}
			maxHeight *= 2;
			maxWidth *= 2;
			const zoomForHeight = ($camera.top - $camera.bottom) / maxHeight;
			const zoomForWidth = ($camera.right - $camera.left) / maxWidth;
			goal.zoom = Math.min(zoomForHeight, zoomForWidth) / margin;
			if (!damping) {
				$camera.zoom = goal.zoom;
				$camera.updateProjectionMatrix();
			}
		}

		if (damping) {
			current.animating = true;
		} else {
			$camera.position.copy(goal.camera);
			$camera.lookAt(goal.focus);
			if ($controls) {
				$controls.target.copy(goal.focus);
				$controls.update();
			}
		}
		if (onFit) onFit(getSize());
		invalidate();
		return; //this;
	}

	onMount(() => {
		if ($controls) {
			// Try to prevent drag hijacking
			const callback = () => (current.animating = false);
			$controls.addEventListener('start', callback);
			return () => $controls.removeEventListener('start', callback);
		}
		if (observe || count++ === 0) {
			api.refresh();
			if (fit) api.fit();
			if (clip) api.clip();
		}
	});
</script>

<T is={container}>
	<slot />
</T>
<!-- 
<T.Mesh position={center}>
	<T.SphereGeometry args={[0.2, 32, 16]} />
	<T.MeshBasicMaterial color={'red'} />
</T.Mesh>

<T.Box3Helper args={[box, 0xff0000]} /> -->
