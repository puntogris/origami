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

export { loadImage };
