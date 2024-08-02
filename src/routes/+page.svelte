<script lang="ts">
	import { encode } from '$lib/mozjpeg/encoder';
	import { defaultOptions } from '$lib/mozjpeg/meta';
	import { defaultOptions as asd } from '$lib/rotate/meta';
	import { rotate } from '$lib/rotate/rotate';
	import { loadImage } from '$lib/utils/utils';
	import { onMount } from 'svelte';

	let file: FileList;

	let imgSrc = '';

	async function encode2() {
		const image = await loadImage(URL.createObjectURL(file[0]));
		const result = await encode(image, defaultOptions);

		imgSrc = URL.createObjectURL(new Blob([result], { type: 'image/jpeg' }));
	}

	async function rotate2() {
		const image = await loadImage(URL.createObjectURL(file[0]));
		const result = await rotate(image, { rotate: 90 });
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (ctx) {
			// Set canvas dimensions
			canvas.width = result.width;
			canvas.height = result.height;

			// Put ImageData to canvas
			ctx.putImageData(result, 0, 0);

			// Get data URL from canvas
			imgSrc = canvas.toDataURL();
		}

		//	imgSrc = URL.createObjectURL(new Blob([result.data as ArrayBuffer], { type: 'image/jpeg' }));
	}
</script>

<img src={imgSrc} alt="" />
<button on:click={encode2}>Helllo</button>
<button on:click={rotate2}>rotate</button>
<input type="file" bind:files={file} />

<style>
	button {
		padding: 20px;
	}
	:root {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: rgb(62, 79, 136);
	}
</style>
