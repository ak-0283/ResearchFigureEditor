import EditorSidebar from '../components/EditorSidebar';
import CanvasWorkspace from '../components/CanvasWorkspace';
import RecentUploads from '../components/RecentUploads';
import DownloadHistory from '../components/DownloadHistory';

function EditorPage() {
  return (
    <section className="container-page py-6">
      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <EditorSidebar />
          <RecentUploads />
          <DownloadHistory />
        </div>
        <CanvasWorkspace />
      </div>
    </section>
  );
}

export default EditorPage;
