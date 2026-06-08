import { FileText } from 'lucide-react';

function ImageInfoPanel({ imageData }) {
  if (!imageData) {
    return (
      <div className="card">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <FileText size={16} /> Image Info
        </h3>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Upload an image to see details.</p>
      </div>
    );
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="card space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <FileText size={16} /> Image Info
      </h3>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Width:</span>
          <span className="font-medium">{imageData.width || 0} px</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Height:</span>
          <span className="font-medium">{imageData.height || 0} px</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">File Size:</span>
          <span className="font-medium">{imageData.fileSize ? formatBytes(imageData.fileSize) : 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">File Type:</span>
          <span className="font-medium">{imageData.fileType || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Aspect Ratio:</span>
          <span className="font-medium">
            {imageData.width && imageData.height
              ? (imageData.width / imageData.height).toFixed(2)
              : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageInfoPanel;
