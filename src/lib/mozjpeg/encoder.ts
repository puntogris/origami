import type { EncodeOptions, MozJPEGModule } from './mozjpeg_enc';

let emscriptenModule: Promise<MozJPEGModule>;

async function init() {
	const mozjpegEncoder = await import('./mozjpeg_enc');
	return mozjpegEncoder.default({ noInitialRun: true });
}

async function encode(data: ImageData, options: EncodeOptions): Promise<ArrayBuffer> {
	if (!emscriptenModule) {
		emscriptenModule = init();
	}

	const module = await emscriptenModule;
	const resultView = module.encode(data.data, data.width, data.height, options);
	// wasm can’t run on SharedArrayBuffers, so we hard-cast to ArrayBuffer.
	return resultView.buffer as ArrayBuffer;
}

export { encode };
