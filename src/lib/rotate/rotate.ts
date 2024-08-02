import { browser } from '$app/environment';
import type { Options } from './meta';

interface RotateModuleInstance {
	exports: {
		memory: WebAssembly.Memory;
		rotate(width: number, height: number, rotate: 0 | 90 | 180 | 270): void;
	};
}

// We are loading a 500B module here. Loading the code to feature-detect
// `instantiateStreaming` probably takes longer to load than the time we save by
// using `instantiateStreaming` in the first place. So let’s just use
// `ArrayBuffer`s here.
let instancePromise: Promise<WebAssembly.WebAssemblyInstantiatedSource>;

if (browser) {
	const wasmUrl = new URL('rotate.wasm', import.meta.url).href;

	instancePromise = fetch(wasmUrl)
		.then((r) => r.arrayBuffer())
		.then((buf) => WebAssembly.instantiate(buf));
}

async function rotate(data: ImageData, opts: Options): Promise<ImageData> {
	if (!instancePromise) {
		throw new Error('Wasm module not loaded.');
	}
	const instance = (await instancePromise).instance as RotateModuleInstance;

	// Number of wasm memory pages (á 64KiB) needed to store the image twice.
	const bytesPerImage = data.width * data.height * 4;
	const numPagesNeeded = Math.ceil((bytesPerImage * 2 + 8) / (64 * 1024));
	// Only count full pages, just to be safe.
	const numPagesAvailable = Math.floor(instance.exports.memory.buffer.byteLength / (64 * 1024));
	const additionalPagesToAllocate = numPagesNeeded - numPagesAvailable;

	if (additionalPagesToAllocate > 0) {
		instance.exports.memory.grow(additionalPagesToAllocate);
	}
	const view = new Uint8ClampedArray(instance.exports.memory.buffer);
	view.set(data.data, 8);

	instance.exports.rotate(data.width, data.height, opts.rotate);

	const flipDimensions = opts.rotate % 180 !== 0;
	return new ImageData(
		view.slice(bytesPerImage + 8, bytesPerImage * 2 + 8),
		flipDimensions ? data.height : data.width,
		flipDimensions ? data.width : data.height
	);
}

export { rotate };
