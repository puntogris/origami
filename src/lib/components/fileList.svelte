<script lang="ts">
	export let files: File[];
	export let onRemove: (file: File) => void;
</script>

<div class="flex flex-col divide-y rounded border">
	{#each files as file}
		<div class="flex items-center gap-2 p-3">
			<img src={URL.createObjectURL(file)} class="h-10 w-10 rounded-full" alt="file" />
			<div class="flex-1 text-sm">
				<div class="font-medium">{file.name}</div>
				<div class="text-xs text-gray-500">{file.size} bytes</div>
			</div>
			<button class="p-2 text-red-500" on:click={() => onRemove(file)}>Remove</button>
		</div>
	{/each}
</div>
