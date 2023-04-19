import { walk } from 'https://deno.land/std@0.184.0/fs/mod.ts';

type Folder = {
	name: string;
	contents: (Folder | File)[];
};

type File = {
	name: string;
	url: string;
};

async function generateTree(dirPath: string) {
	const tree: Folder = { name: '', contents: [] };

	for await (const entry of walk(dirPath)) {
		const { path, isFile, name } = entry;
		const url = isFile ? path.replace(/\\/g, '/').replace(/static\//, '') : undefined;

		// find where to put it.
		let parts = path.split(/\\/g);
		parts = parts.slice(1, parts.length - 1);
		let current = tree;

		for (const part of parts) {
			let dir = current.contents.find((child) => child.name === part);
			if (!dir) {
				dir = { name: part, contents: [] };
				current.contents.push(dir);
			}
			current = dir;
		}

		if (isFile) {
			current.contents.push({ name, url });
		}
	}

	return tree;
}

function sortTree(tree: Folder) {
	tree.contents.sort((a, b) => {
		if ('contents' in a && !('contents' in b)) {
			return -1;
		}
		if ('contents' in b && !('contents' in a)) {
			return 1;
		}
		return 0;
	});
	for (const contents of tree.contents) {
		if (contents.contents) {
			sortTree(contents);
		}
	}
}

const dirPath = './static/';
const tree = await generateTree(dirPath);
sortTree(tree);
const json = JSON.stringify(tree, null, 2);
Deno.writeTextFileSync('src/routes/static-data.json', json);
