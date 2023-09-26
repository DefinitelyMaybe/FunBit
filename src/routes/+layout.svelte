<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button';
	// import type { LayoutData } from './$types';

	// export let data: LayoutData;
</script>

<nav class="bg-gray-500 h-32 flex w-full justify-between items-center z-[2]">
	<div>
		<a href="/">Fun-Bit</a>
	</div>
	<div>
		<Button>X</Button>
	</div>
</nav>
<main class="flex flex-col">
	<slot />
</main>
