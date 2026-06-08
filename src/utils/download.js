export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function buildExportName(baseName, format) {
  const safe = (baseName || 'research-figure').trim().replace(/[^a-z0-9-_]/gi, '_');
  return `${safe || 'research-figure'}.${format}`;
}
