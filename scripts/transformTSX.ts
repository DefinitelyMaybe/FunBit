/// <reference path="./deno.d.ts" />
import { walk } from 'https://deno.land/std@0.184.0/fs/mod.ts';

const typeRegex = /type\s+GLTFResult\s*=\s*GLTF\s*&\s*\{\s*[\s\S]*?\}\n\n\s*/;
const filenameRegex = /useGLTF\('\/(\w+)\.gltf'\) as GLTFResult/;
const dirPath = './static/';

for await (const entry of walk(dirPath)) {
	if (entry.name.endsWith('.tsx')) {
		console.log(entry.path);
		const text = Deno.readTextFileSync(entry.path);
		let output = `import * as THREE from 'three'\n\n`;
		let match = text.match(typeRegex);
		if (match) {
			let x = match[0].replace(/GLTF & /g, '');
			output += x;
		}
		match = text.match(filenameRegex);
		if (match) {
			output = output.replace(/type GLTFResult/g, `export type ${match[1]}`);
		}
		Deno.writeTextFileSync(entry.path, output);
	}
}

for await (const entry of walk(dirPath)) {
	if (entry.name.endsWith('.tsx')) {
		Deno.renameSync(entry.path, entry.path.replace(/\.tsx$/, '.ts'));
	}
}
