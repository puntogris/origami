<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';

	export let onFilesSelected: (file: File[]) => void = () => {};

	function handleFilesSelect(e: any) {
		const { acceptedFiles } = e.detail;
		if (acceptedFiles.length) {
			onFilesSelected(acceptedFiles);
		}
	}
</script>

<Dropzone
	on:drop={handleFilesSelect}
	multiple
	disableDefaultStyles
	accept="image/*"
	containerClasses="custom-dropzone"
>
	<p class="text-center text-gray-900">Drop files here or click to select them</p>
	<p class="mt-2 text-center text-gray-600">
		Conversion happens on your device so your files never leave your computer
	</p>
	<button class="mt-5 rounded bg-black px-8 py-2 text-sm text-white">Select files</button>
</Dropzone>

<style lang="postcss">
	:global(.custom-dropzone) {
		@apply flex flex-col items-center justify-center rounded-xl border border-zinc-300 bg-zinc-50 p-6 sm:px-8 sm:py-16;
	}
</style>
