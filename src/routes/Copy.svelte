<script lang="ts">
	import { browser } from '$app/environment';

	export let src: string;

	let clicked = false;

	if (browser) {
		src = src.replaceAll(/useGltf\<GLTFResult\>\('\//g, `useGltf<GLTFResult>('${window.location}`);
		src = src.replaceAll(/useTexture\('\//g, `useTexture('${window.location}`);
	}
</script>

<div class="flex items-center">
	<button
		class="flex p-2 pointer-events-auto z-[1]"
		on:click={() => {
			clicked = true;
			navigator.clipboard.writeText(src);
			setTimeout(() => (clicked = false), 500);
		}}>
		Copy
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
			class:hidden={clicked}>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
		</svg>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
			class:hidden={!clicked}>
			<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
		</svg>
	</button>
</div>
