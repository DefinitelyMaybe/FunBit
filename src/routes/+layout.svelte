<script lang="ts">
	import '../app.css';
</script>

<nav class="h-32 flex justify-between items-center z-[2]">
	<a href="https://definitelymaybe.github.io/" class="flex ml-8">
		<img src="/github-mark.png" alt="" class="h-12" /></a>
	<a href="/" class="flex flex-col items-center">
		<h1 class="text-5xl font-medium">FunBit</h1>
		<p class="text-xs">Assets for threlte projects</p>
	</a>
	<div class="flex flex-col items-center mr-8">
		<a href="https://www.patreon.com/quaternius"
			><img src="/quaternius/logo.png" alt="logo" class="h-12" /></a>
		<a href="https://quaternius.com/index.html" class="text-xs pt-2">Original assets</a>
	</div>
</nav>
<main class="flex flex-col grow">
	<slot />
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
