import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useOptionalAuth } from '../auth/AuthProvider';
import { CommandPalette } from '../frontend/CommandPalette';
import { replaceDocument } from '../lib/browserNavigation';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-3 py-2 text-sm font-bold transition ${
    isActive
      ? 'bg-violet-100 text-violet-950 dark:bg-violet-950 dark:text-violet-100'
      : 'text-slate-600 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
  }`;

export function AppHeader() {
  const auth = useOptionalAuth();
  const [logoutError, setLogoutError] = useState('');

  const signOut = async () => {
    if (!auth || auth.status !== 'authenticated') return;
    setLogoutError('');
    try {
      await auth.logout();
      replaceDocument('/');
    } catch (cause) {
      setLogoutError(cause instanceof Error ? `Sign out could not be confirmed: ${cause.message}` : 'Sign out could not be confirmed. Please retry.');
    }
  };

  return (
    <header className="sticky top-0 z-[1000] border-b border-violet-100/80 bg-[#f7f5ff]/88 backdrop-blur-2xl dark:border-violet-950 dark:bg-slate-950/88">
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 lg:px-8">
        <Link to="/" className="mr-auto flex items-center gap-2.5 font-black tracking-tight text-slate-950 dark:text-white">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-[14px] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-xs font-black text-white shadow-lg shadow-violet-500/20">CS</span>
          <span>CompanyScope <span className="hidden text-[10px] uppercase tracking-[.18em] text-violet-500 lg:inline">Frontend Lab</span></span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <NavLink to="/dashboard" className={navClass}>Explorer</NavLink>
          <NavLink to="/companies/northstar-berlin-security/overview" className={navClass}>Sample company</NavLink>
        </div>

        <CommandPalette />
        <ThemeToggle />

        <div className="flex min-w-fit items-center gap-2">
          {auth?.status === 'authenticated' ? (
            <>
              <Link to="/dashboard" className="hidden rounded-xl border border-violet-200 bg-white/70 px-3 py-2 text-sm font-bold text-slate-800 hover:bg-white sm:inline-flex dark:border-violet-900 dark:bg-slate-900 dark:text-slate-100">Workspace</Link>
              <Button variant="secondary" className="min-w-[6.75rem]" onClick={() => void signOut()} disabled={auth.busy}>{auth.busy ? 'Signing out…' : 'Sign out'}</Button>
            </>
          ) : auth?.status === 'checking' ? (
            <span className="min-w-[6.75rem] px-3 py-2 text-center text-sm text-slate-500" aria-live="polite">Checking…</span>
          ) : auth?.status === 'error' ? (
            <span className="min-w-[6.75rem] px-3 py-2 text-center text-sm font-semibold text-amber-700 dark:text-amber-300" title="Session status could not be verified">Session unavailable</span>
          ) : (
            <Link to="/login" className="inline-flex min-h-11 min-w-[6.75rem] items-center justify-center rounded-xl bg-slate-950 px-3 py-2 text-sm font-bold text-white shadow-sm dark:bg-white dark:text-slate-950">Sign in</Link>
          )}
        </div>
      </nav>
      {logoutError && <div role="alert" className="mx-auto max-w-7xl px-5 pb-3 text-right text-xs font-medium text-amber-700 lg:px-8 dark:text-amber-300">{logoutError}</div>}
    </header>
  );
}
