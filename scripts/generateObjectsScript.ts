//// <reference path="./deno.d.ts" />

import { walk } from 'https://deno.land/std@0.201.0/fs/mod.ts';

const dir = '../src/lib/components/models/Cube-World';
const names = [];
let outputString = '';
let outputStringPart2 = '';

for await (const entry of walk(dir)) {
	if (entry.isFile && entry.name.endsWith('.svelte')) {
		names.push(entry);
	}
}

const importPath = dir.replace('../src/', '$');

for (let i = 0; i < names.length; i++) {
	const path = names[i].path.replace(/\\/g, '/').replace(dir, '');
	const name = names[i].name.split('.')[0];

	console.log(path);

	outputString += `import ${name} from '${importPath}${path}'\n`;
	outputString += `import ${name}SRC from '${importPath}${path}?raw'\n`;
	outputStringPart2 += `{ id: ${i}, el: undefined, obj: ${name}, src: ${name}SRC },\n`;
}

const output =
	'// This is a generated list of imports and exports from generateObjectsScript.ts\n' +
	outputString +
	'\n\nexport default [\n' +
	outputStringPart2 +
	`] as {
	id: number;
	el: HTMLElement | undefined;
	obj: any;
	src: string;
}[];`;

Deno.writeTextFileSync('ObjectsArray.ts', output);

// import Object1 from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_1.svelte';
// import Object1SRC from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_1.svelte?raw';
// import Object2 from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_2.svelte';
// import Object2SRC from '$lib/components/models/Ultimate-Stylized-Nature/BirchTree_2.svelte?raw';

// export default [
// 	{ el: undefined, obj: Object1, src: Object1SRC },
// 	{ el: undefined, obj: Object2, src: Object2SRC }
// ] as {
// 	el: HTMLElement | undefined;
// 	obj: any;
// 	src: string;
// }[];
