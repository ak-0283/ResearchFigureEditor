import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container-page py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">The page you requested does not exist.</p>
      <Link className="btn-primary mt-6" to="/">
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
