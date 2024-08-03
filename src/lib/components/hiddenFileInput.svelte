<script lang="ts">
	export let onFilesSelected: (files: File[]) => void;

	function handleFilesSelect(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const files = event.currentTarget.files;
		if (files && files.length) {
			onFilesSelected([...files]);
		}
	}
</script>

<label for="fileInput" class="cursor-pointer rounded-md bg-black px-4 py-2 text-sm text-white">
	Add more files
</label>
<input type="file" class="hidden" id="fileInput" multiple on:input={(e) => handleFilesSelect(e)} />
