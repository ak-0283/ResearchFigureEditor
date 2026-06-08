import { useEditorContext } from '../context/EditorContext';

function RecentUploads() {
  const { recentUploads, editorApi } = useEditorContext();

  return (
    <section className="card">
      <h3 className="text-sm font-semibold">Recent Uploads</h3>
      <div className="mt-3 space-y-2">
        {recentUploads.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">No recent uploads yet.</p>
        ) : (
          recentUploads.map((item) => (
            <button
              key={item.id}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-2 text-left hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              onClick={() => editorApi?.loadFromDataUrl(item.dataUrl, item.name)}
            >
              <img src={item.dataUrl} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{item.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentUploads;
