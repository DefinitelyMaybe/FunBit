<script lang="ts">
	import Quaternius from '../lib/components/QuaterniusCard.svelte';
	import { convertedAssets, workinprogressAssets } from './packs';
</script>

<div class="m-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
	<Quaternius title="How to guide" url="/how-to" tags={['Guide']}>
		<div class="flex h-full items-center justify-center bg-[#ebebeb]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-40 w-40 stroke-gray-600"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
				/>
			</svg>
		</div>
	</Quaternius>
	{#each convertedAssets as pack}
		<Quaternius {...pack} />
	{/each}
	{#each workinprogressAssets as pack}
		<Quaternius {...pack} WIP />
	{/each}
</div>
