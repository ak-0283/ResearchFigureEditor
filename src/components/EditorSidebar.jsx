import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { UploadCloud } from 'lucide-react';
import { useEditorContext } from '../context/EditorContext';
import { PAPER_PRESETS } from '../utils/constants';

function EditorSidebar() {
  const fileInputRef = useRef(null);
  const {
    settings,
    setSettings,
    filename,
    setFilename,
    editorApi,
    historyState,
    resetSettings,
    setIsLoading,
  } = useEditorContext();

  const [resizeWidth, setResizeWidth] = useState(1200);
  const [resizeHeight, setResizeHeight] = useState(800);

  const update = (patch) => setSettings((prev) => ({ ...prev, ...patch }));

  const onUploadFile = async (file) => {
    if (!file) return;
    setIsLoading(true);
    try {
      await editorApi?.loadFromFile(file);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) onUploadFile(file);
  };

  return (
    <aside className="card space-y-4">
      <h2 className="text-lg font-semibold">Controls</h2>

      <div
        className="rounded-xl border-2 border-dashed border-slate-300 p-4 text-center dark:border-slate-700"
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <UploadCloud className="mx-auto mb-2 text-brand-600" />
        <p className="text-sm">Drag and drop image here</p>
        <button type="button" className="btn-primary mt-3" onClick={() => fileInputRef.current?.click()}>
          Choose File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => onUploadFile(event.target.files?.[0])}
        />
      </div>

      <div>
        <label className="label">Preset</label>
        <select
          className="input"
          value={settings.presetKey}
          onChange={(event) => update({ presetKey: event.target.value })}
        >
          {Object.entries(PAPER_PRESETS).map(([key, preset]) => (
            <option key={key} value={key}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      {settings.presetKey === 'custom' && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label">Custom Width</label>
            <input
              className="input"
              type="number"
              value={settings.customWidth}
              onChange={(e) => update({ customWidth: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="label">Custom Height</label>
            <input
              className="input"
              type="number"
              value={settings.customHeight}
              onChange={(e) => update({ customHeight: Number(e.target.value) })}
            />
          </div>
        </div>
      )}

      <div>
        <label className="label">Background Color</label>
        <input
          type="color"
          className="h-10 w-full rounded-xl border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-900"
          value={settings.backgroundColor}
          onChange={(event) => update({ backgroundColor: event.target.value })}
        />
      </div>

      <div>
        <label className="label">Margin / Padding</label>
        <input
          type="range"
          min="0"
          max="300"
          className="w-full"
          value={settings.margin}
          onChange={(event) => update({ margin: Number(event.target.value) })}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label">Zoom</label>
          <input
            className="input"
            type="number"
            min="0.2"
            max="3"
            step="0.1"
            value={settings.zoom}
            onChange={(event) => update({ zoom: Number(event.target.value) })}
          />
        </div>
        <div>
          <label className="label">Rotate</label>
          <input
            className="input"
            type="number"
            min="-180"
            max="180"
            value={settings.rotation}
            onChange={(event) => update({ rotation: Number(event.target.value) })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label">Brightness</label>
          <input
            type="range"
            min="-100"
            max="100"
            value={settings.brightness}
            onChange={(event) => update({ brightness: Number(event.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="label">Contrast</label>
          <input
            type="range"
            min="-100"
            max="100"
            value={settings.contrast}
            onChange={(event) => update({ contrast: Number(event.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={settings.keepAspectRatio}
          onChange={(event) => update({ keepAspectRatio: event.target.checked })}
        />
        Maintain aspect ratio while resizing
      </label>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label">Resize W</label>
          <input
            className="input"
            type="number"
            value={resizeWidth}
            onChange={(e) => setResizeWidth(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="label">Resize H</label>
          <input
            className="input"
            type="number"
            value={resizeHeight}
            onChange={(e) => setResizeHeight(Number(e.target.value))}
          />
        </div>
      </div>
      <button type="button" className="btn-secondary w-full" onClick={() => editorApi?.resizeImage(resizeWidth, resizeHeight)}>
        Apply Resize
      </button>

      <div className="grid grid-cols-2 gap-2">
        <input
          className="input"
          type="number"
          placeholder="Crop X"
          value={settings.cropX}
          onChange={(e) => update({ cropX: Number(e.target.value) })}
        />
        <input
          className="input"
          type="number"
          placeholder="Crop Y"
          value={settings.cropY}
          onChange={(e) => update({ cropY: Number(e.target.value) })}
        />
        <input
          className="input"
          type="number"
          placeholder="Crop W"
          value={settings.cropWidth}
          onChange={(e) => update({ cropWidth: Number(e.target.value) })}
        />
        <input
          className="input"
          type="number"
          placeholder="Crop H"
          value={settings.cropHeight}
          onChange={(e) => update({ cropHeight: Number(e.target.value) })}
        />
      </div>
      <button type="button" className="btn-secondary w-full" onClick={() => editorApi?.applyCrop()}>
        Apply Crop
      </button>

      <div>
        <label className="label">Filename</label>
        <input className="input" value={filename} onChange={(e) => setFilename(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" className="btn-secondary" disabled={!historyState.canUndo} onClick={() => editorApi?.undo()}>
          Undo
        </button>
        <button type="button" className="btn-secondary" disabled={!historyState.canRedo} onClick={() => editorApi?.redo()}>
          Redo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" className="btn-primary" onClick={() => editorApi?.exportImage('png')}>
          Download PNG
        </button>
        <button type="button" className="btn-primary" onClick={() => editorApi?.exportImage('jpg')}>
          Download JPG
        </button>
      </div>

      <button
        type="button"
        className="btn-secondary w-full"
        onClick={() => {
          if (!editorApi) {
            toast.error('Load an image first');
            return;
          }
          editorApi.resetAll(resetSettings);
        }}
      >
        Reset All
      </button>
    </aside>
  );
}

export default EditorSidebar;
