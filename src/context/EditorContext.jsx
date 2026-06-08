import { createContext, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { MAX_DOWNLOAD_HISTORY, MAX_RECENT_UPLOADS, PAPER_PRESETS } from '../utils/constants';

const EditorContext = createContext(null);

const initialSettings = {
  presetKey: 'ieeeSingle',
  customWidth: PAPER_PRESETS.custom.width,
  customHeight: PAPER_PRESETS.custom.height,
  zoom: 1,
  rotation: 0,
  brightness: 0,
  contrast: 0,
  backgroundColor: '#ffffff',
  margin: 0,
  keepAspectRatio: true,
  cropX: 0,
  cropY: 0,
  cropWidth: 0,
  cropHeight: 0,
};

export function EditorProvider({ children }) {
  const [settings, setSettings] = useState(initialSettings);
  const [filename, setFilename] = useState('research-figure');
  const [isLoading, setIsLoading] = useState(false);
  const [editorApi, setEditorApi] = useState(null);
  const [historyState, setHistoryState] = useState({ canUndo: false, canRedo: false });
  const [previewDataUrl, setPreviewDataUrl] = useState('');
  const [originalImageData, setOriginalImageData] = useState(null);
  const [beforeImageUrl, setBeforeImageUrl] = useState('');
  const [recentUploads, setRecentUploads] = useLocalStorage('rfe_recent_uploads', []);
  const [downloadHistory, setDownloadHistory] = useLocalStorage('rfe_download_history', []);

  const activePreset = useMemo(() => {
    if (settings.presetKey === 'custom') {
      return {
        label: 'Custom',
        width: Number(settings.customWidth) || 1600,
        height: Number(settings.customHeight) || 1000,
      };
    }
    return PAPER_PRESETS[settings.presetKey] || PAPER_PRESETS.ieeeSingle;
  }, [settings]);

  const addRecentUpload = (item) => {
    setRecentUploads((prev) => {
      const next = [item, ...prev.filter((x) => x.dataUrl !== item.dataUrl)].slice(0, MAX_RECENT_UPLOADS);
      return next;
    });
  };

  const addDownloadHistory = (item) => {
    setDownloadHistory((prev) => [item, ...prev].slice(0, MAX_DOWNLOAD_HISTORY));
  };

  const resetSettings = () => setSettings(initialSettings);
  const registerEditorApi = (api) => setEditorApi(api);

  return (
    <EditorContext.Provider
      value={{
        settings,
        setSettings,
        filename,
        setFilename,
        isLoading,
        setIsLoading,
        editorApi,
        registerEditorApi,
        historyState,
        setHistoryState,
        previewDataUrl,
        setPreviewDataUrl,
        activePreset,
        recentUploads,
        addRecentUpload,
        downloadHistory,
        addDownloadHistory,
        resetSettings,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used inside EditorProvider');
  }
  return context;
}
