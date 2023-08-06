<script lang="ts">
	import {
		HierarchicalObject,
		currentWritable,
		useFrame,
		useRender,
		useThrelte,
		type ThrelteContext
	} from '@threlte/core';
	import { onMount, setContext } from 'svelte';
	import { OrthographicCamera, PerspectiveCamera, Scene, Vector4 } from 'three';

	const context = useThrelte();

	export let element: HTMLElement;
	let isOffscreen = true;

	export const createDefaultCamera = (): PerspectiveCamera => {
		const defaultCamera = new PerspectiveCamera(75, 0, 0.1, 1000);
		defaultCamera.position.z = 5;
		defaultCamera.lookAt(0, 0, 0);
		return defaultCamera;
	};

	const defaultCamera = new PerspectiveCamera();
	defaultCamera.position.set(0, 0, 3);

	const viewScene = new Scene();

	const viewContext: typeof context = {
		...context,
		invalidate: () => {
			context.invalidate();
		},
		camera: currentWritable(createDefaultCamera())
	};

	const { camera: viewCamera } = viewContext;

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].intersectionRatio <= 0) {
			isOffscreen = true;
			return;
		}
		isOffscreen = false;
	});

	setContext<ThrelteContext>('threlte', viewContext);

	onMount(() => {
		// if the viewScene has children, it means that the user has added objects
		// to the viewScene, therefore this is the default scene in this context
		// now.
		if (!element) {
			throw 'View Component needs an HTMLElement to render to';
		}
		if (viewScene.children) viewContext.scene = viewScene;
		observer.observe(element);
		return () => {
			observer.disconnect();
		};
	});

	const isOrthographicCamera = (obj: any): obj is OrthographicCamera => !!obj.isOrthographicCamera;
	const isPerspectiveCamera = (obj: any): obj is PerspectiveCamera => !!obj.isPerspectiveCamera;

	let originalViewport = new Vector4();
	let originalScissor = new Vector4();
	let originalScissorTest: boolean;

	function computeContainerPosition(
		canvas: HTMLCanvasElement,
		trackingElement: HTMLElement
	): {
		left: number;
		width: number;
		bottom: number;
		height: number;
	} {
		const trackRect = trackingElement.getBoundingClientRect();
		const canvasRect = canvas.getBoundingClientRect();
		const { right, top, left: trackLeft, bottom: trackBottom, width, height } = trackRect;

		const canvasBottom = canvasRect.top + canvasRect.height;
		const bottom = canvasBottom - trackBottom;
		const left = trackLeft - canvasRect.left;

		return { width, height, left, bottom };
	}

	useFrame(() => {});

	useRender(({ renderer }) => {
		const { left, bottom, width, height } = computeContainerPosition(renderer.domElement, element);

		const aspect = width / height;

		// update camera
		if (isOrthographicCamera($viewCamera)) {
			if (
				$viewCamera.left !== width / -2 ||
				$viewCamera.right !== width / 2 ||
				$viewCamera.top !== height / 2 ||
				$viewCamera.bottom !== height / -2
			) {
				Object.assign($viewCamera, {
					left: width / -2,
					right: width / 2,
					top: height / 2,
					bottom: height / -2
				});
				$viewCamera.updateProjectionMatrix();
			}
		} else if (isPerspectiveCamera($viewCamera) && $viewCamera.aspect !== aspect) {
			$viewCamera.aspect = aspect;
			$viewCamera.updateProjectionMatrix();
		}

		if (isOffscreen) return;

		// save original state
		renderer.getScissor(originalScissor);
		renderer.getViewport(originalViewport);
		originalScissorTest = renderer.getScissorTest();

		// apply scissor
		renderer.setViewport(left, bottom, width, height);
		renderer.setScissor(left, bottom, width, height);
		renderer.setScissorTest(true);

		// render
		renderer.render(viewScene, $viewCamera);

		// reset state
		renderer.setViewport(originalViewport);
		renderer.setScissor(originalScissor);
		renderer.setScissorTest(originalScissorTest);
	});
</script>

<HierarchicalObject
	onChildMount={(child) => {
		viewScene.add(child);
	}}
	onChildDestroy={(child) => {
		viewScene.remove(child);
	}}>
	<slot />
</HierarchicalObject>
