<script lang="ts">
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import { getFormatedBytes } from '$lib/utils/utils';
	import { flip } from 'svelte/animate';

	export let files: File[];
	export let onRemove: (file: File) => void;
</script>

<div class="flex flex-col gap-3 rounded">
	{#each files as file (file.name)}
		<div
			class="flex items-center gap-4 rounded bg-slate-50 py-3 pl-5 pr-3"
			animate:flip={{ duration: 200 }}
		>
			<div class="flex-1">
				<div class="font-medium">{file.name}</div>
				<div class="text-sm text-gray-500">{getFormatedBytes(file.size)}</div>
			</div>
			<button class="rounded p-2 hover:bg-slate-100" on:click={() => onRemove(file)}>
				<CrossIcon class="h-5 w-5 text-slate-600" />
			</button>
		</div>
	{/each}
</div>
