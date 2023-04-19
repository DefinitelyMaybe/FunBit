<script lang="ts">
	import '../app.css';
	import Folder from './Folder.svelte';
	import tree from './static-data.json';
</script>

<Folder name="Static" contents={tree.contents} expanded />
