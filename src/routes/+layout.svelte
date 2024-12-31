<script lang="ts">
	import '../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<nav class="z-[2] flex h-32 items-center justify-between">
	<a href="https://github.com/DefinitelyMaybe/FunBit" class="ml-8 flex">
		<img src="/github-mark.png" alt="" class="h-12" /></a
	>
	<a href="/" class="flex flex-col items-center">
		<h1 class="text-5xl font-medium">FunBit</h1>
		<p class="text-xs">Assets for threlte projects</p>
	</a>
	<div class="mr-8 flex flex-col items-center">
		<a href="https://www.patreon.com/quaternius"
			><img src="/quaternius/logo.png" alt="logo" class="h-12" /></a
		>
		<a href="https://quaternius.com/index.html" class="pt-2 text-xs">Original assets</a>
	</div>
</nav>
<main class="flex grow flex-col">
	{@render children?.()}
</main>

<style>
	:global(body) {
		/* this will apply to <body> */
		/* your styles go here */
		background-image: url('/quaternius/bg1.png');
		background-repeat: no-repeat;
		/* filter: invert(100%); */
	}
</style>
