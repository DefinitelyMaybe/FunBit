<script lang="ts">
	// TODO-DefinitelyMaybe: how to scissor render to multiple divs
	// Make a canvas that always covers the area you want the divs to go
	// (easy way is to have canvas cover whole window)
	// make scissor render for every (scene, div) pair being tracked
	// (can more or less just use three.js code)
	// profit!

	import '../app.css';
	// import Folder from './Folder.svelte';
	// import tree from './static-data.json';
	// TODO-DefinitelyMaybe: Add link back to quaternius website
	// import { Canvas } from '@threlte/core';
	// import { Theatre } from '@threlte/theatre';
	// import Scene from './Scene.svelte';
	// import Example from '$lib/components/Example.svelte';
	import * as THREE from 'three';
	// import ViewOG from './ViewOG.svelte';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { onMount } from 'svelte';

	let canvas: HTMLElement | undefined;
	let renderer: THREE.WebGLRenderer;
	let camera: THREE.Camera;
	let el: HTMLElement;

	const scene = new THREE.Scene();
	createScene();
	// const scenes: THREE.Scene[] = [];

	// for (let i = 0; i < numberOfScenes; i++) {
	// 	scenes.push(new THREE.Scene());
	// }
	function createScene() {
		camera = new THREE.PerspectiveCamera(90, 1, 1, 10);
		camera.position.z = 2;

		// add one random mesh to each scene
		const geometry = new THREE.BoxGeometry(1, 1, 1);

		const material = new THREE.MeshStandardMaterial({
			color: new THREE.Color('black')
		});

		scene.add(new THREE.Mesh(geometry, material));

		scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3));

		const light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.position.set(1, 1, 1);
		scene.add(light);
	}

	function updateSize() {
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;

		if (canvas.width !== width || canvas.height !== height) {
			renderer.setSize(width, height, false);
		}
	}

	function animate() {
		render();
		requestAnimationFrame(animate);
	}

	function render() {
		renderer.setViewport(canvas?.clientTop, canvas?.clientLeft, canvas.width, canvas.height);
		renderer.render(scene, camera);

		// Set the scissor area
		const { x, y, width: w, height: h } = el.getBoundingClientRect();
		// const y = 0;
		renderer.setViewport(x, y, w, h);
		renderer.setScissor(x, y, w, h);
		renderer.setClearColor(0xe0e0e0);

		renderer.setScissorTest(true);
		renderer.render(scene, camera);

		renderer.setScissorTest(false);
		renderer.setClearColor(0x000000);
	}

	onMount(() => {
		renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
		updateSize();
		console.log(el?.getBoundingClientRect());

		renderer.setClearColor(0xffffff, 1);
		renderer.setPixelRatio(window.devicePixelRatio);

		camera.aspect = canvas.width / canvas.height;
		camera.updateProjectionMatrix();

		const controls = new OrbitControls(camera, canvas);
		controls.minDistance = 2;
		controls.maxDistance = 5;
		controls.enablePan = false;

		animate();
	});
</script>

<svelte:window on:resize={updateSize} />

<div class="min-h-screen">
	<!-- <Canvas>
		<Scene />
	</Canvas> -->
	<canvas class="flex w-full" bind:this={canvas} />
	<div class="absolute top-0 right-5 w-[200px] h-[200px]" bind:this={el} />
</div>
<!-- <Folder name="Static" contents={tree.contents} expanded /> -->
