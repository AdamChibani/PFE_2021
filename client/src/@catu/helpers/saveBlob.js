export function saveFile(blob, filename) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  const blobUrl = window.URL.createObjectURL(blob);
  a.href = blobUrl;
  a.download = filename || "filename";
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  }, 0);
}
export const b64toBlob = (
  b64Data,
  contentType = "application/pdf",
  sliceSize = 512
) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
