/// <reference types="./deno" />

import { walk } from 'https://deno.land/std@0.190.0/fs/mod.ts';
import { extname, join } from 'https://deno.land/std@0.190.0/path/mod.ts';

const dirPath = './static'; // Update this with your directory path

for await (const entry of walk(dirPath)) {
	const ext = extname(entry.path).toLowerCase();
	if (entry.isFile && (ext === '.glb' || ext === '.gltf')) {
		const command = new Deno.Command(Deno.execPath(), {
			args: ['eval', "console.log('Hello World')"],
			stdin: 'piped',
			stdout: 'piped'
		});
		const child = command.spawn();

		// open a file and pipe the subprocess output to it.
		child.stdout.pipeTo(Deno.openSync('output', { write: true, create: true }).writable);

		// manually close stdin
		child.stdin.close();
		const status = await child.status;
		console.log(`child status is ${status}`);
		// const command = `npx @threlte/gltf@next ${entry.path}`;
		// await exec(command);
	}
}

// const glbFiles = globSync('./static/**/*.{glb|gltf}', { ignore: 'node_modules/**', absolute: true })

// for (const glbFile of glbFiles) {
// 	console.log(`Transforming ${glbFile}...`)
// 	const dir = glbFile.split('/').slice(0, -1).join('/')
// 	const out = execSync(`cd ${dir} && npx @threlte/gltf@next ${glbFile} -u -i -t -s`)
// 	console.log(out.toString())
// }

// const newGlbFiles = globSync('./src/**/*.glb', { ignore: 'node_modules/**', absolute: true })

// for (const glbFile of newGlbFiles) {
// 	const fileName = glbFile.split('/').pop()
// 	const targetDir = './static'
// 	renameSync(glbFile, join(targetDir, fileName))
// }
