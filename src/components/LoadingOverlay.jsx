function LoadingOverlay({ show, text = 'Processing image...' }) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-slate-950/60">
      <div className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-100">
        {text}
      </div>
    </div>
  );
}

export default LoadingOverlay;
