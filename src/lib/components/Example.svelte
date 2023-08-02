<script lang="ts">
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
		updateSize();
		scissorDraw(el);
		renderer.render(scene, camera);
	}

	function computeContainerPosition() {
		const {
			right,
			top,
			left: trackLeft,
			bottom: trackBottom,
			width,
			height
		} = el.getBoundingClientRect();
		const {
			top: canvasTop,
			left: canvasLeft,
			bottom: canvasBottom,
			width: canvasWidth,
			height: canvasHeight
		} = canvas.getBoundingClientRect();
		const isOffscreen =
			trackBottom < 0 || top > canvasHeight || right < 0 || trackLeft > canvasWidth;

		const canvasBottomY = canvasTop + canvasHeight;
		const bottom = canvasBottomY - trackBottom;
		const left = trackLeft - canvasLeft;

		return { position: { width, height, left, top, bottom, right }, isOffscreen };
	}

	function scissorDraw(el) {
		// renderer.setClearColor(0xffffff);
		// renderer.setScissorTest(false);
		// renderer.clear();
		// renderer.setClearColor(0xe0e0e0);
		// renderer.setScissorTest(true);
		// get its position relative to the page's viewport
		// const rect = el.getBoundingClientRect();
		// // check if it's offscreen. If so skip it
		// if (
		// 	rect.bottom < 0 ||
		// 	rect.top > renderer.domElement.clientHeight ||
		// 	rect.right < 0 ||
		// 	rect.left > renderer.domElement.clientWidth
		// ) {
		// 	console.log('skipped');
		// 	return; // it's off screen
		// }
		// // set the viewport
		// const width = rect.right - rect.left;
		// const height = rect.bottom - rect.top;
		// const left = rect.left;
		// const bottom = renderer.domElement.clientHeight - rect.bottom;
		// renderer.setViewport(left, bottom, width, height);
		// renderer.setScissor(left, bottom, width, height);
		// renderer.setScissorTest(true);
		// if (isOffscreen) {
		// 	renderer.getClearColor(col);
		// 	renderer.setClearColor(col, renderer.getClearAlpha());
		// 	renderer.clear(true, true);
		// } else {
		// When children are present render the portalled scene, otherwise the default scene
		// renderer.render(scene, camera);
		// }
		// Restore the default state
		// renderer.setScissorTest(true);
	}

	onMount(() => {
		renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
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

<!-- <div class="top-0 w-full z-[1] p-12" bind:this={content}>
	{#each scenes as _, i}
	<ViewOG scene={scenes[0]} number={0} />
	<ViewOG scene={scenes[1]} number={1} />
	{/each}
</div> -->
<canvas class="flex w-full" bind:this={canvas} />
<div class="w-[200px] h-[200px] bg-slate-200" bind:this={el} />
