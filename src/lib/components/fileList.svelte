<script lang="ts">
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import { getFormatedBytes } from '$lib/utils/utils';

	export let files: File[];
	export let onRemove: (file: File) => void;
</script>

<div class="flex flex-col divide-y rounded border">
	{#each files as file}
		<div class="flex items-center gap-4 p-4">
			<img src={URL.createObjectURL(file)} class="h-16 w-16 rounded-sm object-cover" alt="file" />
			<div class="flex-1">
				<div class="font-medium">{file.name}</div>
				<div class="text-sm text-gray-500">{getFormatedBytes(file.size)}</div>
			</div>
			<button
				class="rounded border border-red-300 p-1.5 hover:bg-red-50"
				on:click={() => onRemove(file)}
			>
				<CrossIcon class="h-5 w-5 text-red-400" />
			</button>
		</div>
	{/each}
</div>
