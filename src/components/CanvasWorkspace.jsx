import { useEffect, useRef } from 'react';
import LoadingOverlay from './LoadingOverlay';
import { useEditorContext } from '../context/EditorContext';
import useFabricEditor from '../hooks/useFabricEditor';

function CanvasWorkspace() {
  const canvasElementRef = useRef(null);
  const {
    settings,
    activePreset,
    filename,
    isLoading,
    setIsLoading,
    setHistoryState,
    setPreviewDataUrl,
    addRecentUpload,
    addDownloadHistory,
    registerEditorApi,
    previewDataUrl,
  } = useEditorContext();

  const editorApi = useFabricEditor({
    canvasElementRef,
    settings,
    activePreset,
    filename,
    setIsLoading,
    setHistoryState,
    setPreviewDataUrl,
    addRecentUpload,
    addDownloadHistory,
  });

  useEffect(() => {
    registerEditorApi(editorApi);
  }, [editorApi, registerEditorApi]);

  return (
    <div className="card relative overflow-hidden">
      <LoadingOverlay show={isLoading} />
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Editor Canvas</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Preset: {activePreset.label} ({activePreset.width}×{activePreset.height})
          </p>
        </div>
      </div>

      <div className="overflow-auto rounded-xl border border-slate-200 p-2 dark:border-slate-700">
        <canvas ref={canvasElementRef} className="max-w-full" aria-label="Fabric image editor canvas" />
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-semibold">Final Preview</h3>
        {previewDataUrl ? (
          <img
            src={previewDataUrl}
            alt="Final export preview"
            className="max-h-72 w-full rounded-xl border border-slate-200 object-contain dark:border-slate-700"
          />
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            Upload an image to see preview.
          </div>
        )}
      </div>
    </div>
  );
}

export default CanvasWorkspace;
