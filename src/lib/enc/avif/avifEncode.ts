import type { AVIFModule, EncodeOptions } from './avif_enc';

let emscriptenModule: Promise<AVIFModule>;

async function init() {
	const avifEncoder = await import('./avif_enc');
	return avifEncoder.default({ noInitialRun: true });
}

async function encode(data: ImageData, options: EncodeOptions): Promise<ArrayBuffer> {
	if (!emscriptenModule) {
		emscriptenModule = init();
	}

	const module = await emscriptenModule;
	const result = module.encode(data.data, data.width, data.height, options);

	if (!result) {
		throw new Error('Encoding error');
	}

	return result.buffer;
}

export { encode };
