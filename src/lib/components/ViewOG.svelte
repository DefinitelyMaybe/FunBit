<script context="module">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { onMount } from 'svelte';

	const geometries = [
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.SphereGeometry(0.5, 12, 8),
		new THREE.DodecahedronGeometry(0.5),
		new THREE.CylinderGeometry(0.5, 0.5, 1, 12)
	];
</script>

<script lang="ts">
	export let number: number;
	export let scene: THREE.Scene;
	let el: HTMLElement | undefined;

	const camera = new THREE.PerspectiveCamera(50, 1, 1, 10);
	camera.position.z = 2;
	scene.userData.camera = camera;

	// add one random mesh to each scene
	const geometry = geometries[(geometries.length * Math.random()) | 0];

	const material = new THREE.MeshStandardMaterial({
		color: new THREE.Color().setHSL(Math.random(), 1, 0.75, THREE.SRGBColorSpace),
		roughness: 0.5,
		metalness: 0,
		flatShading: true
	});

	scene.add(new THREE.Mesh(geometry, material));

	scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3));

	const light = new THREE.DirectionalLight(0xffffff, 1.5);
	light.position.set(1, 1, 1);
	scene.add(light);

	onMount(() => {
		scene.userData.element = el;
		const controls = new OrbitControls(camera, el);
		controls.minDistance = 2;
		controls.maxDistance = 5;
		controls.enablePan = false;
		controls.enableZoom = false;
		scene.userData.controls = controls;
	});
</script>

<div class="list-item">
	<div bind:this={el} class="w-[200px] h-[200px]" style="touch-action: none;" />
	<div>Scene {number}</div>
</div>

<style>
	.list-item {
		display: inline-block;
		margin: 1em;
		padding: 1em;
		box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.25);
	}

	.list-item > div:nth-child(2) {
		color: #888;
		font-family: sans-serif;
		font-size: large;
		width: 200px;
		margin-top: 0.5em;
	}
</style>
