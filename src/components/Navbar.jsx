import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${
      isActive
        ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="text-lg font-bold">Research Figure Editor</Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/editor" className={navClass}>
            Editor
          </NavLink>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="btn-secondary" onClick={() => setOpen((p) => !p)} aria-label="Toggle menu">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="container-page mb-3 grid gap-2 md:hidden">
          <NavLink to="/" className={navClass} end onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/editor" className={navClass} onClick={() => setOpen(false)}>
            Editor
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Navbar;
