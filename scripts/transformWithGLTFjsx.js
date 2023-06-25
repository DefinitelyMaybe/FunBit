import { readdir, stat } from 'fs';
import { join, extname, dirname, parse } from 'path';
import { exec } from 'child_process';

// Set the directory to search for .gltf files
const searchDir = './static';

// Recursive function to search for .gltf files in all sub-directories
function searchForGltfFiles(directory) {
	readdir(directory, (err, files) => {
		if (err) throw err;
		files.forEach((file) => {
			const fullPath = join(directory, file);
			stat(fullPath, (err, stats) => {
				if (err) throw err;
				if (stats.isDirectory()) {
					// Recursively search sub-directories
					searchForGltfFiles(fullPath);
				} else if (extname(file) === '.gltf') {
					// Echo the name of the .gltf file that was found
					console.log(`Found ${fullPath}`);
					// Set the output file name to the same as the input .gltf file, but with a .jsx extension
					const outputFileName = join(dirname(fullPath), parse(fullPath).name + '.tsx');
					// Run npx gltfjsx on the input .gltf file and save the output to the output .jsx file
					const command = `npx gltfjsx ${fullPath} --output="${outputFileName}" --types`;
					exec(command, (err, stdout, stderr) => {
						if (err) throw err;
						console.log(`Converted ${fullPath} to ${outputFileName}`);
					});
				}
			});
		});
	});
}

// Start searching from the root directory
searchForGltfFiles(searchDir);
console.log('All done!');
