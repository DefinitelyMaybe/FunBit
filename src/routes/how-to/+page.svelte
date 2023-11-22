<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import mdString from './how-to.md?raw';
	import SvelteMarkdown from 'svelte-markdown';
</script>

<section class="flex flex-col items-center m-8">
	<div class="markdown-body max-w-lg w-full rounded-lg p-8">
		<SvelteMarkdown source={mdString} />
	</div>
</section>
