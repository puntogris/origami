<script lang="ts">
	import OrigagamiIcon from '$lib/icons/origamiIcon.svelte';
	import Dropzone from '$lib/components/dropzone.svelte';
	import FileList from '$lib/components/fileList.svelte';
	import OutputOptionsSelector from '$lib/components/outputOptionsSelector.svelte';
	import HiddenFileInput from '$lib/components/hiddenFileInput.svelte';
	import type { OutputOptions } from '$lib/utils/outputOptions';

	let selectedFiles: File[] = [];
	let outputOptions: OutputOptions = { formats: 'webp', quality: '80' };

	function handleFilesSelect(files: File[]) {
		selectedFiles = [...selectedFiles, ...files];
	}

	function handleFilesRemove(file: File) {
		selectedFiles = selectedFiles.filter((f) => f !== file);
	}
</script>

<svelte:head>
	<title>origami.puntogris</title>
</svelte:head>

<div class="container mx-auto flex min-h-screen max-w-3xl flex-col p-6">
	<header class="flex items-center gap-2">
		<OrigagamiIcon class="h-7 w-7" />
		<h1 class="text-2xl font-medium">origami.</h1>
	</header>
	<div class="mt-12">
		{#if selectedFiles.length}
			<div class="flex flex-col gap-6">
				<div class="flex items-center justify-between">
					<HiddenFileInput onFilesSelected={handleFilesSelect} />
					<OutputOptionsSelector bind:options={outputOptions} />
				</div>
				<FileList files={selectedFiles} onRemove={handleFilesRemove} />
				<button class="rounded-md bg-zinc-900 p-2.5 text-white">Convert</button>
			</div>
		{:else}
			<Dropzone onFilesSelected={(files) => (selectedFiles = files)} />
		{/if}
	</div>
</div>
