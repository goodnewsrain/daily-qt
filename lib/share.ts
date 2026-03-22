export async function shareToInstagram(element: HTMLElement): Promise<void> {
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(element, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: "#fdf6ec",
  });

  const link = document.createElement("a");
  link.download = `daily-qt-${new Date().toISOString().split("T")[0]}.png`;
  link.href = dataUrl;
  link.click();
}

export async function copyShareImage(element: HTMLElement): Promise<void> {
  const { toBlob } = await import("html-to-image");
  const blob = await toBlob(element, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: "#fdf6ec",
  });
  if (blob) {
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);
  }
}
