## How to help

1. Pick a asset collection you'd like to add.
2. Download the assets into the static folder.
3. adjust the `sourceDir` configuration in `model-pipeline.js` to point to the new collection folder.
4. Run `npx scripts/model-pipeline.js` to generate the components.
5. create a new route for your collection
6. Run `deno run srcipts/generateObjectsArrayScript.ts`
7. Move the generated script into the new route
8. Adjust contents of generated svelte components until sorted
