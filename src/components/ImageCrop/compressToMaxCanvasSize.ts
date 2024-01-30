// maxDeviation is the difference that is allowed default: 50kb
// Example: targetFileSizeKb = 500 then result will be between 450kb and 500kb
// increase the deviation to reduce the amount of iterations.
export default async function resizeImage(
  dataUrl: string,
  targetFileSizeKb: number,
  maxDeviation = 1
): Promise<string> {
  let originalFile = await urltoFile(dataUrl, "test.png", "image/png");
  if (originalFile.size / 1000 < targetFileSizeKb) {
    return dataUrl; // File is already smaller
  }

  let low = 0.0;
  let middle = 0.5;
  let high = 1.0;

  let result = dataUrl;

  let file = originalFile;

  while (Math.abs(file.size / 1000 - targetFileSizeKb) > maxDeviation) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = document.createElement("img");

    const promise = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });

    img.src = dataUrl;

    await promise;

    canvas.width = Math.round(img.width * middle);
    canvas.height = Math.round(img.height * middle);
    context!.scale(canvas.width / img.width, canvas.height / img.height);
    context!.drawImage(img, 0, 0);
    file = await urltoFile(canvas.toDataURL(), "test.png", "image/png");

    if (file.size / 1000 < targetFileSizeKb - maxDeviation) {
      low = middle;
    } else if (file.size / 1000 > targetFileSizeKb) {
      high = middle;
    }

    middle = (low + high) / 2;
    result = canvas.toDataURL();
  }

  return result;
}

export function urltoFile(
  url: string,
  filename: string,
  mimeType: string
): Promise<File> {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}
