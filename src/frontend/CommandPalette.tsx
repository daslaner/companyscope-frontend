import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companies } from '../data/companies';
import { analytics } from '../product/analytics';

const commands = [
  { label: 'Open workspace', path: '/dashboard', hint: 'Workspace' },
  { label: 'Open sample company', path: '/companies/northstar-berlin-security/overview', hint: 'Company' },
  { label: 'Create account', path: '/register', hint: 'Account' },
] as const;

export function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return companies.slice(0, 5);
    return companies
      .filter((company) => `${company.name} ${company.industry} ${company.city}`.toLowerCase().includes(normalized))
      .slice(0, 7);
  }, [query]);

  const go = (path: string, source: 'command' | 'company', companyId?: string) => {
    analytics.track({
      name: 'command_palette_used',
      properties: { source, companyId: companyId ?? null },
    });
    setOpen(false);
    setQuery('');
    navigate(path);
  };

  return (
    <>
      <button
        type="button"
        className="hidden min-h-10 items-center gap-2 rounded-xl border border-violet-200/80 bg-white/70 px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-white sm:inline-flex dark:border-violet-900 dark:bg-slate-900/80 dark:text-slate-200"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <span aria-hidden="true">⌕</span>
        Quick find
        <kbd className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[3000] grid place-items-start px-4 pt-[12vh]">
          <button
            type="button"
            aria-label="Close command palette"
            className="absolute inset-0 cursor-default bg-slate-950/45 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-title"
            className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/60 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950"
          >
            <div className="border-b border-slate-200 p-4 dark:border-slate-800">
              <p id="command-title" className="text-xs font-black uppercase tracking-[.18em] text-violet-600 dark:text-violet-300">Command palette</p>
              <label className="mt-2 block">
                <span className="sr-only">Search commands and companies</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full border-0 bg-transparent text-xl font-bold text-slate-950 outline-none placeholder:text-slate-400 dark:text-white"
                  placeholder="Search companies, routes or markets…"
                />
              </label>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-3">
              {!query && (
                <div className="mb-3">
                  <p className="px-2 py-1 text-[11px] font-black uppercase tracking-[.16em] text-slate-400">Shortcuts</p>
                  {commands.map((command) => (
                    <button
                      key={command.path}
                      type="button"
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-violet-50 dark:hover:bg-violet-950/30"
                      onClick={() => go(command.path, 'command')}
                    >
                      <span className="font-semibold text-slate-900 dark:text-white">{command.label}</span>
                      <span className="text-xs text-slate-400">{command.hint}</span>
                    </button>
                  ))}
                </div>
              )}

              <p className="px-2 py-1 text-[11px] font-black uppercase tracking-[.16em] text-slate-400">Companies</p>
              {results.map((company) => (
                <button
                  key={company.id}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
                  onClick={() => go(`/companies/${company.id}/overview`, 'company', company.id)}
                >
                  <span>
                    <span className="block font-semibold text-slate-950 dark:text-white">{company.name}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{company.industry} · {company.city}</span>
                  </span>
                  <span className="text-xs tabular-nums text-slate-400">{company.riskScore}/100 risk</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
