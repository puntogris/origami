<script lang="ts">
	import OrigagamiIcon from '$lib/icons/origamiIcon.svelte';
	import Dropzone from '$lib/components/dropzone.svelte';
	import FileList from '$lib/components/fileList.svelte';

	let selectedFiles: File[] = [];

	function handleFilesSelect(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const files = event.currentTarget.files;
		if (files && files.length) {
			selectedFiles = [...selectedFiles, ...Array.from(files)];
		}
	}

	function handleFilesRemove(file: File) {
		selectedFiles = selectedFiles.filter((f) => f !== file);
	}
</script>

<svelte:head>
	<title>origami.puntogris</title>
</svelte:head>

<div class="container mx-auto flex h-screen max-w-5xl flex-col p-6">
	<header class="flex items-center gap-2">
		<OrigagamiIcon class="h-7 w-7" />
		<h1 class="text-2xl font-medium">origami.</h1>
	</header>
	<div class="mt-12">
		{#if selectedFiles.length}
			<div class="flex flex-col gap-2">
				<div class="flex items-center justify-between">
					<label for="fileInput" class="cursor-pointer rounded bg-black p-2 text-white">
						Add more files
					</label>
					<input
						type="file"
						class="hidden"
						id="fileInput"
						multiple
						on:input={(e) => handleFilesSelect(e)}
					/>

					<div class="flex gap-6">
						<div class="inline-flex items-center gap-2">
							<label for="formats" class="text-sm font-medium text-gray-900">Format</label>
							<select
								id="formats"
								class="w-full rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
							>
								<option selected value="webp">WebP</option>
								<option value="jpeg">JPEG</option>
							</select>
						</div>

						<div class="flex items-center gap-2">
							<label for="quality" class="text-sm font-medium text-gray-900">Quality</label>
							<select
								id="quality"
								class="w-full rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
							>
								<option value="10">10</option>
								<option value="20">20</option>
								<option value="30">30</option>
								<option value="40">40</option>
								<option value="50">50</option>
								<option value="60">60</option>
								<option value="70">70</option>
								<option value="80">80</option>
								<option selected value="90">90</option>
								<option value="100">100</option>
							</select>
						</div>
					</div>
				</div>
				<FileList files={selectedFiles} onRemove={handleFilesRemove} />
				<button class="rounded bg-black p-2 text-white">Convert</button>
			</div>
		{:else}
			<Dropzone onFilesSelected={(files) => (selectedFiles = files)} />
		{/if}
	</div>
</div>
