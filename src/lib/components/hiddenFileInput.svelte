<script lang="ts">
	export let onFilesSelected: (files: File[]) => void;

	function handleFilesSelect(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const files = event.currentTarget.files;
		if (files && files.length) {
			onFilesSelected([...files]);
		}
	}
</script>

<label
	for="fileInput"
	class="cursor-pointer rounded-md border border-zinc-800 px-4 py-2 text-sm text-zinc-900 hover:bg-slate-100"
>
	Add more files
</label>
<input type="file" class="hidden" id="fileInput" multiple on:input={(e) => handleFilesSelect(e)} />
