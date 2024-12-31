<script lang="ts">
	interface Props {
		title?: string;
		url?: string;
		imgSrc?: string;
		imgAlt?: string;
		tags?: string[];
		WIP?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		title = '',
		url = '',
		imgSrc = '',
		imgAlt = '',
		tags = [],
		WIP = false,
		children
	}: Props = $props();
</script>

<div class="relative flex text-[#333] {WIP ? 'cursor-not-allowed' : ''}">
	<a
		href={url}
		class="flex grow flex-col overflow-clip rounded-xl bg-[#d1d1d1] shadow-lg shadow-gray-600"
	>
		{#if imgSrc}
			<img src={imgSrc} alt={imgAlt} />
		{:else}
			{@render children?.()}
		{/if}
		<div class="flex flex-col justify-between px-4 py-2">
			<h1 class="flex items-center text-2xl">{title}</h1>
			<div class="flex">
				{#each tags as tag}
					<div class="my-2 mr-2 inline rounded-lg bg-[#ededed] p-2 px-3 text-[#858585]">
						{tag}
					</div>
				{/each}
			</div>
		</div>
	</a>
	{#if WIP}
		<div class="absolute flex h-full w-full items-center justify-center rounded-xl bg-black/50">
			<a
				href="https://github.com/DefinitelyMaybe/FunBit"
				class="flex -rotate-12 flex-col items-center text-white/50"
			>
				<h1 class="text-3xl">Help!</h1>
				<p class="text-xs">Pull Requests Welcome</p>
			</a>
		</div>
	{/if}
</div>
