import { type EncodeOptions } from '$lib/enc/avif/codecs/avif_enc';
import { AVIFTune } from './codecs/avif_types';

export { AVIFTune };

export const label = 'AVIF';
export const mimeType = 'image/avif';
export const extension = 'avif';
export const defaultOptions: EncodeOptions = {
	quality: 50,
	qualityAlpha: -1,
	denoiseLevel: 0,
	tileColsLog2: 0,
	tileRowsLog2: 0,
	speed: 6,
	subsample: 1,
	chromaDeltaQ: false,
	sharpness: 0,
	tune: AVIFTune.auto,
	enableSharpYUV: false
};
