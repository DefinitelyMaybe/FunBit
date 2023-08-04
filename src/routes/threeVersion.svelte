<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	let canvas: HTMLElement | undefined;
	let renderer: THREE.WebGLRenderer;

	const pairs = [];
	const x1 = {
		scene: new THREE.Scene(),
		camera: new THREE.PerspectiveCamera(90, 1, 1, 10),
		el: undefined
	};

	function create(el) {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(90, 1, 1, 10);
		camera.position.z = 2;

		// add one random mesh to each scene
		const geometry = new THREE.BoxGeometry(1, 1, 1);

		const material = new THREE.MeshStandardMaterial({
			color: new THREE.Color().setHSL(Math.random(), 1, 0.75, THREE.SRGBColorSpace)
		});

		scene.add(new THREE.Mesh(geometry, material));

		scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3));

		const light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.position.set(1, 1, 1);
		scene.add(light);

		return {
			camera,
			scene,
			el
		};
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
		const { x, y: rectY, width: w, height: h } = el.getBoundingClientRect();
		const y = -rectY + renderer?.domElement.height - h;
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

		// renderer.setClearColor(0xffffff, 1);
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

<div class="min-h-screen relative">
	<div class="absolute w-full h-full">
		{#each Array(3) as _, i}
			<div class="absolute top-[{300 * i}px] left-[100px] w-[200px] h-[200px] bg-black/10" />
		{/each}
	</div>
	<div class="absolute w-full h-full">
		<canvas class="w-full h-full" bind:this={canvas} />
	</div>
</div>
