<script lang="ts">
	import '../app.css';
	import Folder from './Folder.svelte';
	import tree from './static-data.json';
	// TODO-DefinitelyMaybe: Add link back to quaternius website
</script>

<Folder name="Static" contents={tree.contents} expanded />
