import { useEditorContext } from '../context/EditorContext';

function DownloadHistory() {
  const { downloadHistory } = useEditorContext();

  return (
    <section className="card">
      <h3 className="text-sm font-semibold">Download History</h3>
      <div className="mt-3 space-y-2">
        {downloadHistory.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">No downloads yet.</p>
        ) : (
          downloadHistory.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 p-2 dark:border-slate-700">
              <p className="truncate text-xs font-medium">{item.fileName}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {item.format} • {new Date(item.downloadedAt).toLocaleString()}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default DownloadHistory;
