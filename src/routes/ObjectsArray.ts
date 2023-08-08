import Object1 from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_1.svelte';
import Object1SRC from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_1.svelte?raw';
import Object2 from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_2.svelte';
import Object2SRC from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_2.svelte?raw';

export default [
	{ el: undefined, obj: Object1, src: Object1SRC },
	{ el: undefined, obj: Object2, src: Object2SRC }
] as {
	el: HTMLElement | undefined;
	obj: any;
	src: string;
}[];
