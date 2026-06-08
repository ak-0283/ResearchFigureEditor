import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, FabricImage, filters } from 'fabric';
import toast from 'react-hot-toast';
import { MAX_HISTORY } from '../utils/constants';
import { buildExportName, downloadDataUrl } from '../utils/download';

export default function useFabricEditor({
  canvasElementRef,
  settings,
  activePreset,
  filename,
  setHistoryState,
  setPreviewDataUrl,
  addRecentUpload,
  addDownloadHistory,
}) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const sourceDataUrlRef = useRef('');
  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);

  const applyCanvasDimensions = useCallback(
    (width, height) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.setWidth(width);
      canvas.setHeight(height);

      const displayScale = Math.min(1, 920 / width, 620 / height);
      const cssWidth = `${Math.max(220, Math.round(width * displayScale))}px`;
      const cssHeight = `${Math.max(180, Math.round(height * displayScale))}px`;

      if (canvas.lowerCanvasEl) {
        canvas.lowerCanvasEl.style.width = cssWidth;
        canvas.lowerCanvasEl.style.height = cssHeight;
      }
      if (canvas.upperCanvasEl) {
        canvas.upperCanvasEl.style.width = cssWidth;
        canvas.upperCanvasEl.style.height = cssHeight;
      }
      if (canvas.wrapperEl) {
        canvas.wrapperEl.style.width = cssWidth;
        canvas.wrapperEl.style.height = cssHeight;
      }
    },
    []
  );

  const updateHistoryState = useCallback(() => {
    setHistoryState({
      canUndo: undoStackRef.current.length > 1,
      canRedo: redoStackRef.current.length > 0,
    });
  }, [setHistoryState]);

  const getCanvasSize = useMemo(() => {
    const width = Number(activePreset.width || 1600) + Number(settings.margin || 0) * 2;
    const height = Number(activePreset.height || 1000) + Number(settings.margin || 0) * 2;
    return {
      width: Math.max(100, width),
      height: Math.max(100, height),
    };
  }, [activePreset.height, activePreset.width, settings.margin]);

  const refreshPreview = useCallback(() => {
    if (!canvasRef.current) return;
    setPreviewDataUrl(
      canvasRef.current.toDataURL({
        format: 'png',
        multiplier: 1,
        quality: 1,
      })
    );
  }, [setPreviewDataUrl]);

  const pushHistory = useCallback(() => {
    if (!canvasRef.current) return;
    const snapshot = JSON.stringify(canvasRef.current.toJSON());
    const stack = undoStackRef.current;
    if (stack[stack.length - 1] !== snapshot) {
      stack.push(snapshot);
      if (stack.length > MAX_HISTORY) stack.shift();
      redoStackRef.current = [];
      updateHistoryState();
    }
  }, [updateHistoryState]);

  const applyFilters = useCallback(() => {
    if (!imageRef.current || !canvasRef.current) return;
    const brightness = Number(settings.brightness || 0) / 100;
    const contrast = Number(settings.contrast || 0) / 100;

    const nextFilters = [];
    if (brightness !== 0) nextFilters.push(new filters.Brightness({ brightness }));
    if (contrast !== 0) nextFilters.push(new filters.Contrast({ contrast }));

    imageRef.current.filters = nextFilters;
    imageRef.current.applyFilters();
    canvasRef.current.renderAll();
  }, [settings.brightness, settings.contrast]);

  const fitImageToCanvas = useCallback(() => {
    if (!imageRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const margin = Number(settings.margin || 0);
    const usableW = Math.max(40, canvas.getWidth() - margin * 2);
    const usableH = Math.max(40, canvas.getHeight() - margin * 2);
    const scale = Math.min(usableW / image.width, usableH / image.height);

    image.set({
      scaleX: scale,
      scaleY: scale,
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: 'center',
      originY: 'center',
      lockUniScaling: settings.keepAspectRatio,
    });
    image.setCoords();
    canvas.renderAll();
  }, [settings.keepAspectRatio, settings.margin]);

  const applyVisualSettings = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.backgroundColor = settings.backgroundColor || '#ffffff';
    canvas.setZoom(Number(settings.zoom || 1));

    if (imageRef.current) {
      imageRef.current.set({
        angle: Number(settings.rotation || 0),
        lockUniScaling: settings.keepAspectRatio,
      });
      applyFilters();
    }

    canvas.renderAll();
    refreshPreview();
  }, [applyFilters, refreshPreview, settings.backgroundColor, settings.keepAspectRatio, settings.rotation, settings.zoom]);

  const initializeCanvas = useCallback(() => {
    if (!canvasElementRef.current || canvasRef.current) return;
    const canvas = new Canvas(canvasElementRef.current, {
      backgroundColor: settings.backgroundColor,
      preserveObjectStacking: true,
      selection: true,
    });
    canvasRef.current = canvas;

    canvas.on('object:modified', () => {
      pushHistory();
      refreshPreview();
    });

    applyCanvasDimensions(getCanvasSize.width, getCanvasSize.height);
    pushHistory();
    refreshPreview();
  }, [applyCanvasDimensions, canvasElementRef, getCanvasSize.height, getCanvasSize.width, pushHistory, refreshPreview, settings.backgroundColor]);

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  useEffect(() => {
    return () => {
      canvasRef.current?.dispose();
      canvasRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    applyCanvasDimensions(getCanvasSize.width, getCanvasSize.height);
    fitImageToCanvas();
    applyVisualSettings();
    refreshPreview();
  }, [applyCanvasDimensions, applyVisualSettings, fitImageToCanvas, getCanvasSize.height, getCanvasSize.width, refreshPreview]);

  const loadImageElement = useCallback((dataUrl) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = dataUrl;
    });
  }, []);

  const loadFromDataUrl = useCallback(
    async (dataUrl, name = 'uploaded-image') => {
      if (!canvasRef.current) return;
      try {
        const imageElement = await loadImageElement(dataUrl);
        const image = new FabricImage(imageElement, {
          cornerColor: '#2563eb',
          borderColor: '#2563eb',
          transparentCorners: false,
          lockUniScaling: settings.keepAspectRatio,
          originX: 'center',
          originY: 'center',
        });

        const canvas = canvasRef.current;
        canvas.clear();
        canvas.backgroundColor = settings.backgroundColor || '#ffffff';
        canvas.add(image);
        imageRef.current = image;
        sourceDataUrlRef.current = dataUrl;

        fitImageToCanvas();
        canvas.setActiveObject(image);
        applyVisualSettings();
        pushHistory();
        refreshPreview();

        addRecentUpload({
          id: `${Date.now()}`,
          name,
          dataUrl,
          createdAt: new Date().toISOString(),
        });

        toast.success('Image loaded successfully');
      } catch {
        toast.error('Unable to load image');
      }
    },
    [
      addRecentUpload,
      applyVisualSettings,
      fitImageToCanvas,
      loadImageElement,
      pushHistory,
      refreshPreview,
      settings.backgroundColor,
      settings.keepAspectRatio,
    ]
  );

  const loadFromFile = useCallback(
    async (file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        await loadFromDataUrl(String(reader.result), file.name);
      };
      reader.readAsDataURL(file);
    },
    [loadFromDataUrl]
  );

  const applyCrop = useCallback(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) {
      toast.error('Load an image first');
      return;
    }

    const x = Math.max(0, Number(settings.cropX || 0));
    const y = Math.max(0, Number(settings.cropY || 0));
    const width = Math.max(1, Number(settings.cropWidth || image.width));
    const height = Math.max(1, Number(settings.cropHeight || image.height));

    image.set({ cropX: x, cropY: y, width, height });
    fitImageToCanvas();
    canvas.renderAll();
    pushHistory();
    refreshPreview();
    toast.success('Crop applied');
  }, [fitImageToCanvas, pushHistory, refreshPreview, settings.cropHeight, settings.cropWidth, settings.cropX, settings.cropY]);

  const resizeImage = useCallback(
    (targetWidth, targetHeight) => {
      const image = imageRef.current;
      const canvas = canvasRef.current;
      if (!image || !canvas) {
        toast.error('Load an image first');
        return;
      }

      const w = Math.max(1, Number(targetWidth || image.getScaledWidth()));
      let h = Math.max(1, Number(targetHeight || image.getScaledHeight()));
      if (settings.keepAspectRatio) {
        const ratio = image.height / image.width;
        h = Math.round(w * ratio);
      }

      image.set({
        scaleX: w / image.width,
        scaleY: h / image.height,
      });
      image.setCoords();
      canvas.renderAll();
      pushHistory();
      refreshPreview();
      toast.success('Resize applied');
    },
    [pushHistory, refreshPreview, settings.keepAspectRatio]
  );

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || undoStackRef.current.length <= 1) return;

    const current = undoStackRef.current.pop();
    redoStackRef.current.push(current);
    const previous = undoStackRef.current[undoStackRef.current.length - 1];

    canvas.loadFromJSON(previous).then(() => {
      canvas.renderAll();
      imageRef.current = canvas.getObjects().find((obj) => obj.type === 'image') || null;
      updateHistoryState();
      refreshPreview();
    });
  }, [refreshPreview, updateHistoryState]);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || redoStackRef.current.length === 0) return;

    const next = redoStackRef.current.pop();
    undoStackRef.current.push(next);

    canvas.loadFromJSON(next).then(() => {
      canvas.renderAll();
      imageRef.current = canvas.getObjects().find((obj) => obj.type === 'image') || null;
      updateHistoryState();
      refreshPreview();
    });
  }, [refreshPreview, updateHistoryState]);

  const resetAll = useCallback(
    async (resetSettingsFn) => {
      if (!sourceDataUrlRef.current) return;
      resetSettingsFn();
      await loadFromDataUrl(sourceDataUrlRef.current, 'reset-image');
      toast.success('All changes reset');
    },
    [loadFromDataUrl]
  );

  const exportImage = useCallback(
    (format = 'png') => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const targetFormat = format === 'jpg' ? 'jpeg' : 'png';
      const dataUrl = canvas.toDataURL({
        format: targetFormat,
        quality: 1,
        multiplier: 2,
      });
      const fileName = buildExportName(filename, format === 'jpg' ? 'jpg' : 'png');
      downloadDataUrl(dataUrl, fileName);
      addDownloadHistory({
        id: `${Date.now()}`,
        fileName,
        format: format.toUpperCase(),
        downloadedAt: new Date().toISOString(),
      });
      toast.success(`${format.toUpperCase()} downloaded`);
    },
    [addDownloadHistory, filename]
  );

  return {
    hasImage: Boolean(imageRef.current),
    loadFromFile,
    loadFromDataUrl,
    applyCrop,
    resizeImage,
    undo,
    redo,
    resetAll,
    exportImage,
  };
}
