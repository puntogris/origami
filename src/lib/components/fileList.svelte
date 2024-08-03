<script lang="ts">
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import { getFormatedBytes } from '$lib/utils/utils';

	export let files: File[];
	export let onRemove: (file: File) => void;
</script>

<div class="flex flex-col gap-3 rounded">
	{#each files as file}
		<div class="flex items-center gap-4 rounded-md bg-slate-100 px-5 py-3">
			<div class="flex-1">
				<div class="font-medium">{file.name}</div>
				<div class="text-sm text-gray-500">{getFormatedBytes(file.size)}</div>
			</div>
			<button
				class="rounded border border-zinc-500 p-1 hover:bg-slate-200"
				on:click={() => onRemove(file)}
			>
				<CrossIcon class="h-5 w-5 text-zinc-500" />
			</button>
		</div>
	{/each}
</div>
