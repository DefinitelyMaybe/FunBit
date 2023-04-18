/// <reference types="./deno" />
import * as path from 'https://deno.land/std@0.183.0/path/mod.ts';

async function collectRelativePaths(dir: string, baseDir: string, paths: string[] = []) {
	const dirEntries = await Deno.readDir(dir);
	for await (const entry of dirEntries) {
		const entryPath = path.join(dir, entry.name);
		if (entry.isDirectory) {
			await collectRelativePaths(entryPath, baseDir, paths);
		} else {
			const relativePath = path
				.relative(baseDir, entryPath)
				.replace(/\\/g, '/')
				.replace(/static\//, '');
			paths.push(relativePath);
		}
	}
	return paths;
}

const folderPath = 'static';
const baseDir = path.dirname(folderPath);
const relativePaths = await collectRelativePaths(folderPath, baseDir);
const json = JSON.stringify(relativePaths, null, 2);
await Deno.writeTextFile('src/paths.json', json);
