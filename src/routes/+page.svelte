<script lang="ts">
	// TODO-DefinitelyMaybe: how to scissor render to multiple divs
	// Make a canvas that always covers the area you want the divs to go
	// (easy way is to have canvas cover whole window)
	// make scissor render for every (scene, div) pair being tracked
	// (can more or less just use three.js code)
	// profit!

	import '../app.css';
	// import Folder from './Folder.svelte';
	// import tree from './static-data.json';
	// TODO-DefinitelyMaybe: Add link back to quaternius website
	import ThreeSvelte from './threeVersion.svelte';
</script>

<ThreeSvelte />
<!-- <Folder name="Static" contents={tree.contents} expanded /> -->
