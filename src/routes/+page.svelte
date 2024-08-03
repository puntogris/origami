<script lang="ts">
	import OrigagamiIcon from '$lib/icons/origamiIcon.svelte';
	import Dropzone from '$lib/components/dropzone.svelte';
	import FileList from '$lib/components/fileList.svelte';
	import OutputOptionsSelector from '$lib/components/outputOptionsSelector.svelte';
	import HiddenFileInput from '$lib/components/hiddenFileInput.svelte';
	import type { OutputOptions } from '$lib/utils/outputOptions';
	import { webpEncode, jpegEncode, webpDefaultOptions, jpegDefaultOptions } from '$lib/encoder';
	import { loadImage } from '$lib/utils/utils';

	let selectedFiles: File[] = [];
	let outputOptions: OutputOptions = { format: 'webp', quality: '80' };
	let convertedFiles: { name: string; data: Blob }[] = [];

	function handleFilesSelect(files: File[]) {
		selectedFiles = [...selectedFiles, ...files];
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

<svelte:head>
	<title>origami.puntogris</title>
</svelte:head>

<div class="container mx-auto flex min-h-screen max-w-5xl flex-col p-6">
	<header class="flex items-center gap-2">
		<OrigagamiIcon class="h-7 w-7" />
		<h1 class="text-2xl font-medium">origami.</h1>
	</header>
	<div class="mt-12">
		{#if selectedFiles.length}
			<div class="flex gap-12">
				<div class="flex w-full flex-col gap-6">
					<div class="flex items-center justify-between">
						<div class="flex items-center justify-between">
							<HiddenFileInput onFilesSelected={handleFilesSelect} />
						</div>
						<button
							on:click={handleConversionStart}
							class="rounded-md border border-slate-950 bg-slate-950 px-6 py-2 text-sm text-white hover:bg-slate-900"
							>Start conversion</button
						>
					</div>
					<FileList files={selectedFiles} onRemove={handleFilesRemove} />
				</div>
				<OutputOptionsSelector bind:options={outputOptions} />
			</div>
		{:else}
			<Dropzone onFilesSelected={(files) => (selectedFiles = files)} />
		{/if}
	</div>
</div>
