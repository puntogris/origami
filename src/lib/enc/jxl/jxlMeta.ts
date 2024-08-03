import type { EncodeOptions } from './codecs/jxl_enc';

export const label = 'JPEG XL (beta)';
export const mimeType = 'image/jxl';
export const extension = 'jxl';
export const defaultOptions: EncodeOptions = {
	effort: 7,
	quality: 75,
	progressive: false,
	epf: -1,
	lossyPalette: false,
	decodingSpeedTier: 0,
	photonNoiseIso: 0,
	lossyModular: false
};
