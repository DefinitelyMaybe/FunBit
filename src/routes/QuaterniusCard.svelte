<script lang="ts">
	export let title = '';
	export let url = '';
	export let imgSrc = '';
	export let imgAlt = '';
	export let tags: string[] = [];
</script>

<div class="flex flex-col m-8 text-[#333]">
	<a href={url} class="bg-[#d1d1d1] rounded-xl overflow-clip">
		<img src={imgSrc} alt={imgAlt} />
		<div class="px-4 py-2 flex flex-col md:flex-row justify-between">
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
</div>
