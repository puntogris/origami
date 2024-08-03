async function loadImage(src: string) {
	const img = document.createElement('img');
	img.src = src;

	await new Promise((resolve) => (img.onload = resolve));

	const canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;

	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Could not get context.');
	}
	ctx.drawImage(img, 0, 0);

	return ctx.getImageData(0, 0, img.width, img.height);
}

function getFormatedBytes(bytes: number) {
	if (bytes < 1024) {
		return `${bytes} bytes`;
	}
	if (bytes < 1024 * 1024) {
		return `${(bytes / 1024).toFixed(2)} KB`;
	}
	return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export { loadImage, getFormatedBytes };
