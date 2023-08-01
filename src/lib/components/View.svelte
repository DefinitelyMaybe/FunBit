<script lang="ts">
	import * as THREE from 'three';
	import { useThrelte, useFrame } from '@threlte/core';
	import Container from './Container.svelte';

	// TODO-DefinitelyMaybe: Double check events from the track element are connnected

	/** The tracking element, the view will be cut according to its whereabouts */
	export let track: HTMLElement;
	/** Views take over the render loop, optional render index (1 by default) */
	export let index = 1;
	/** If you know your view is always at the same place set this to 1 to avoid needless getBoundingClientRect overhead */
	export let frames = Infinity;
	/** The scene to render, if you leave this undefined it will render the default scene */
	export let children; //?: React.ReactNode

	let ready = false;
	const col = new THREE.Color();
	const { camera, size, scene } = useThrelte();

	$: isOrthographicCamera = $camera.isOrthographicCamera;

	let rect: DOMRect;

	const virtualScene = () => new THREE.Scene();

	const compute = (event, state) => {
		if (rect && track && event.target === track) {
			const { width, height, left, top } = rect;
			const x = event.clientX - left;
			const y = event.clientY - top;
			state.pointer.set((x / width) * 2 - 1, -(y / height) * 2 + 1);
			state.raycaster.setFromCamera(state.pointer, state.camera);
		}
	};

	$: if (track) {
		// We need the tracking elements bounds beforehand in order to inject it into the portal
		rect = track.getBoundingClientRect();
		// And now we can proceed
		ready = true;
	}

	function computeContainerPosition(
		canvasSize: LegacyCanvasSize | CanvasSize,
		trackRect: DOMRect
	): {
		position: CanvasSize & { bottom: number; right: number };
		isOffscreen: boolean;
	} {
		const { right, top, left: trackLeft, bottom: trackBottom, width, height } = trackRect;
		const isOffscreen =
			trackRect.bottom < 0 ||
			top > canvasSize.height ||
			right < 0 ||
			trackRect.left > canvasSize.width;

		const canvasBottom = canvasSize.top + canvasSize.height;
		const bottom = canvasBottom - trackBottom;
		const left = trackLeft - canvasSize.left;

		return { position: { width, height, left, top, bottom, right }, isOffscreen };
	}

	let frameCount = 0;
	useFrame(
		({ camera, renderer }) => {
			if (frames === Infinity || frameCount <= frames) {
				rect = track?.getBoundingClientRect();
				frameCount++;
			}

			if (rect) {
				const {
					position: { left, bottom, width, height },
					isOffscreen
				} = computeContainerPosition(canvasSize, rect);

				const aspect = width / height;

				if (isOrthographicCamera) {
					if (
						camera.current.left !== width / -2 ||
						camera.current.right !== width / 2 ||
						camera.current.top !== height / 2 ||
						camera.current.bottom !== height / -2
					) {
						Object.assign(camera.current, {
							left: width / -2,
							right: width / 2,
							top: height / 2,
							bottom: height / -2
						});
						camera.current.updateProjectionMatrix();
					}
				} else if (camera.aspect !== aspect) {
					camera.current.aspect = aspect;
					camera.current.updateProjectionMatrix();
				}

				renderer?.setViewport(left, bottom, width, height);
				renderer?.setScissor(left, bottom, width, height);
				renderer?.setScissorTest(true);

				if (isOffscreen) {
					renderer?.getClearColor(col);
					renderer?.setClearColor(col, renderer?.getClearAlpha());
					renderer?.clear(true, true);
				} else {
					// When children are present render the portalled scene, otherwise the default scene
					renderer?.render(children ? virtualScene : scene, camera);
				}
				// Restore the default state
				renderer?.setScissorTest(true);
			}
		},
		{ order: index }
	);
</script>

<!-- import { createPortal, useFrame, useThree } from '@react-three/fiber' -->
<!-- <>
      {ready &&
        createPortal(
          <Container canvasSize={size} frames={frames} scene={scene} track={track} rect={rect} index={index}>
            {children}
            {/* Without an element that receives pointer events state.pointer will always be 0/0 */}
            <group onPointerOver={() => null} />
          </Container>,
          virtualScene,
          { events: { compute, priority: index }, size: { width: rect?.width, height: rect?.height } }
        )}
    </> -->
{#if ready}
	<slot />
{/if}
