<script lang="ts">
	import type { OutputOptions } from '$lib/utils/outputOptions';

	export let options: OutputOptions;
</script>

<div class="flex w-60 flex-col gap-6 border-l border-zinc-200 pl-10">
	<h1 class="font-medium">Output options</h1>
	<div class="flex flex-col gap-2">
		<label for="formats" class="text-sm font-medium text-gray-700">Format</label>
		<select
			bind:value={options.formats}
			id="formats"
			class="w-full rounded-md border border-gray-300 bg-gray-50 p-2 pe-9 text-sm text-gray-900 focus:border-zinc-500 focus:ring-zinc-500"
		>
			<option selected value="webp">WebP</option>
			<option value="jpeg">JPEG</option>
		</select>
	</div>

	<div class="flex flex-col gap-2">
		<label for="quality" class="text-sm font-medium text-gray-700">Quality</label>
		<select
			bind:value={options.quality}
			id="quality"
			class="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pe-9 text-sm text-gray-900 focus:border-zinc-500 focus:ring-zinc-500"
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
