<script lang="ts">
	export let title = '';
	export let url = '';
	export let imgSrc = '';
	export let imgAlt = '';
	export let tags: string[] = [];
	export let WIP: boolean = false;
</script>

<div class="flex text-[#333] relative {WIP ? 'cursor-not-allowed' : ''}">
	<a href={url} class="bg-[#d1d1d1] rounded-xl overflow-clip flex flex-col grow">
		<img src={imgSrc} alt={imgAlt} class="" />
		<div class="px-4 py-2 flex flex-col justify-between">
			<h1 class="flex items-center text-2xl">{title}</h1>
			<div class="flex">
				{#each tags as tag}
					<div class="inline bg-[#ededed] text-[#858585] px-3 mr-2 my-2 p-2 rounded-lg">
						{tag}
					</div>
				{/each}
			</div>
		</div>
	</a>
	{#if WIP}
		<div class="absolute w-full h-full flex bg-black/50 justify-center items-center rounded-xl">
			<div class="text-white -rotate-12 flex flex-col items-center">
				<h1 class="text-3xl">Work In Progress</h1>
				<a href="https://github.com/sponsors/DefinitelyMaybe" class="text-xs">support this work</a>
			</div>
		</div>
	{/if}
</div>
