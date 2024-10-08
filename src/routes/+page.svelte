<script lang="ts">
	import Dropzone from '$lib/components/dropzone.svelte';
	import FileList from '$lib/components/fileList.svelte';
	import OutputOptionsSelector from '$lib/components/outputOption.svelte';
	import FileInputButton from '$lib/components/fileInputButton.svelte';
	import type { OutputOptions } from '$lib/utils/outputOptions';
	import { webpEncode, jpegEncode, webpDefaultOptions, jpegDefaultOptions } from '$lib/enc/encode';
	import { loadImage } from '$lib/utils/utils';
	import Sidebar from '$lib/components/sidebar.svelte';
	import Button from '$lib/components/button.svelte';

	let selectedFiles: File[] = [];
	let outputOptions: OutputOptions = { format: 'webp', quality: '80' };
	let convertedFiles: { name: string; data: Blob }[] = [];

	function handleFilesSelect(files: File[]) {
		let filesToAdd: File[] = [];

		for (const file of files) {
			if (!selectedFiles.find((f) => f.name === file.name)) {
				filesToAdd.push(file);
			}
		}

		selectedFiles = [...selectedFiles, ...filesToAdd];
	}

	function handleFilesRemove(file: File) {
		selectedFiles = selectedFiles.filter((f) => f !== file);
	}

	async function handleConversionStart() {
		const { format, quality } = outputOptions;

		for (const file of selectedFiles) {
			const url = URL.createObjectURL(file);
			const imageData = await loadImage(url);

			if (format === 'webp') {
				const data = await webpEncode(imageData, {
					...webpDefaultOptions,
					quality: parseInt(quality)
				});
				convertedFiles.push({ name: file.name, data: new Blob([data]) });
			}
			if (format === 'jpeg') {
				const data = await jpegEncode(imageData, {
					...jpegDefaultOptions,
					quality: parseInt(quality)
				});
				convertedFiles.push({ name: file.name, data: new Blob([data]) });
			}
		}
	}
</script>

<div class="mt-12 flex grow flex-col">
	{#if selectedFiles.length}
		<div class="flex h-full grow gap-12">
			<div class="flex w-full flex-col gap-6">
				<div class="flex items-center justify-between">
					<div class="flex items-center justify-between">
						<FileInputButton onFilesSelected={handleFilesSelect} />
					</div>
				</div>
				<FileList files={selectedFiles} onRemove={handleFilesRemove} />
			</div>
			<Sidebar>
				<Button on:click={handleConversionStart} class="p-2">Start conversion</Button>
				<OutputOptionsSelector bind:options={outputOptions} />
			</Sidebar>
		</div>
	{:else}
		<div class="flex grow flex-col">
			<Dropzone onFilesSelected={(files) => (selectedFiles = files)} />
			<footer class="mt-auto flex items-center justify-end gap-2">
				<a
					href="https://puntogris.com"
					target="_blank"
					class="text-sm text-slate-800 hover:underline">puntogris</a
				>
				•
				<a
					href="https://github.com/puntogris/origami"
					target="_blank"
					class="text-sm text-slate-800 hover:underline">github</a
				>
			</footer>
		</div>
	{/if}
</div>
