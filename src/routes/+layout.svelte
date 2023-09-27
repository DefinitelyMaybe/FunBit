<script lang="ts">
	import '../app.css';
</script>

<nav class="bg-gray-500 h-32 flex justify-between items-center z-[2]">
	<a href="https://definitelymaybe.github.io/">DefinitelyMaybe </a>
	<a href="/">
		<h1 class="text-5xl font-medium">FunBit</h1>
	</a>
	<div class="flex flex-col">
		<a href="https://quaternius.com/index.html">Original assets</a>
		<a href="https://www.patreon.com/quaternius">support Quaternius</a>
	</div>
</nav>
<main class="flex flex-col">
	<slot />
</main>
