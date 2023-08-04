<script lang="ts">
	import * as THREE from 'three';
	import { useThrelte, useFrame } from '@threlte/core';
	import { onMount } from 'svelte';

	/** The tracking element, the view will be cut according to its whereabouts */
	export let el: HTMLElement;
	/** Views take over the render loop, optional render index (1 by default) */
	export let index = 1;
	/** If you know your view is always at the same place set this to 1 to avoid needless getBoundingClientRect overhead */
	export let frames = Infinity;
	/** The scene to render, if you leave this undefined it will render the default scene */
	export let scene: THREE.Scene;

	let isOffscreen = true;
	let rect: DOMRect;

	const col = new THREE.Color();
	const { camera, size, scene: threlteScene, renderer } = useThrelte();

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].intersectionRatio <= 0) {
			isOffscreen = true;
			return;
		}
		isOffscreen = false;
	});

	$: if (el) {
		setRect();
	}

	function setRect() {
		rect = el.getBoundingClientRect();
	}

	let frameCount = 0;
	useFrame(({ camera, renderer }) => {
		if (frames === Infinity || frameCount <= frames) {
			setRect();
			frameCount++;
		}

		if (rect) {
			const { left, width, height } = rect;
			window.rect = rect;
			const bottom = -rect.y + renderer?.domElement.height - rect.height;
			// const OGviewport = renderer?.getViewport(new THREE.Vector4());
			// window.viewport = OGviewport;

			const aspect = width / height;

			if ($camera.isOrthographicCamera) {
				if (
					camera.left !== width / -2 ||
					camera.right !== width / 2 ||
					camera.top !== height / 2 ||
					camera.bottom !== height / -2
				) {
					Object.assign($camera, {
						left: width / -2,
						right: width / 2,
						top: height / 2,
						bottom: height / -2
					});
					$camera.updateProjectionMatrix();
				}
			} else if ($camera.aspect !== aspect) {
				$camera.aspect = aspect;
				$camera.updateProjectionMatrix();
			}

			// window.viewport2 = { left, bottom, width, height };
			renderer?.setViewport(left, bottom, width, height);
			renderer?.setScissor(left, bottom, width, height);
			renderer?.setScissorTest(true);

			if (isOffscreen) {
				renderer?.getClearColor(col);
				renderer?.setClearColor(col, renderer?.getClearAlpha());
				renderer?.clear(true, true);
			} else {
				// When children are present render the portalled scene, otherwise the default scene
				renderer?.render(scene, $camera);
			}
			// Restore the default state
			// renderer?.setViewport(OGviewport);
			renderer?.setScissorTest(false);
		}
	});

	onMount(() => {
		if (!el) {
			throw 'View Component needs an HTMLElement to track';
		}
		observer.observe(el);
	});
</script>

<slot />
