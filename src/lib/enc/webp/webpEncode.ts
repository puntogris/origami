import type { WebPModule, EncodeOptions } from './webp_enc';

let emscriptenModule: Promise<WebPModule>;

async function init() {
	const webpEncoder = await import('./webp_enc');
	return webpEncoder.default({ noInitialRun: true });
}

async function encode(data: ImageData, options: EncodeOptions): Promise<ArrayBuffer> {
	if (!emscriptenModule) {
		emscriptenModule = init();
	}

	const module = await emscriptenModule;
	const result = module.encode(data.data, data.width, data.height, options);

	if (!result) {
		throw new Error('Encoding error.');
	}

	return result.buffer;
}

export { encode };
