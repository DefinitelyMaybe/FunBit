<script lang="ts">
	import * as THREE from 'three';
	import ViewOG from './ViewOG.svelte';
	import { onMount } from 'svelte';

	let canvas;
	let renderer;
	let content;

	const scenes: THREE.Scene[] | null[] = [];

	for (let i = 0; i < 40; i++) {
		scenes.push(null);
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

		canvas.style.transform = `translateY(${window.scrollY}px)`;

		renderer.setClearColor(0xffffff);
		renderer.setScissorTest(false);
		renderer.clear();

		renderer.setClearColor(0xe0e0e0);
		renderer.setScissorTest(true);

		scenes.forEach(function (scene) {
			// so something moves
			scene.children[0].rotation.y = Date.now() * 0.001;

			// get the element that is a place holder for where we want to
			// draw the scene
			const element = scene.userData.element;

			// get its position relative to the page's viewport
			const rect = element.getBoundingClientRect();

			// check if it's offscreen. If so skip it
			if (
				rect.bottom < 0 ||
				rect.top > renderer.domElement.clientHeight ||
				rect.right < 0 ||
				rect.left > renderer.domElement.clientWidth
			) {
				return; // it's off screen
			}

			// set the viewport
			const width = rect.right - rect.left;
			const height = rect.bottom - rect.top;
			const left = rect.left;
			const bottom = renderer.domElement.clientHeight - rect.bottom;

			renderer.setViewport(left, bottom, width, height);
			renderer.setScissor(left, bottom, width, height);

			const camera = scene.userData.camera;

			//camera.aspect = width / height; // not changing in this example
			//camera.updateProjectionMatrix();

			//scene.userData.controls.update();

			renderer.render(scene, camera);
		});
	}

	onMount(() => {
		renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
		renderer.setClearColor(0xffffff, 1);
		renderer.setPixelRatio(window.devicePixelRatio);

		animate();
	});
</script>

<div class="absolute top-0 w-full z-[1] p-12" bind:this={content}>
	{#each scenes as _, i}
		<ViewOG bind:scene={scenes[i]} number={i} />
	{/each}
</div>
<canvas class="absolute left-0 w-full h-full" bind:this={canvas} />
