import type { ReactNode } from 'react';
import { analytics } from '../product/analytics';
import { useWorkspacePreferences, type Density, type ExplorerView } from './preferences';

function ToggleButton({ active, children, onClick }: { active: boolean; children: ReactNode; onClick(): void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-10 rounded-xl px-3 text-sm font-bold transition ${active ? 'bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950' : 'text-slate-500 hover:bg-white/70 hover:text-slate-950 dark:hover:bg-slate-900 dark:hover:text-white'}`}
    >
      {children}
    </button>
  );
}

export function ExperienceToolbar() {
  const { view, density, setView, setDensity } = useWorkspacePreferences();

  const changeView = (next: ExplorerView) => {
    setView(next);
    analytics.track({ name: 'view_mode_changed', properties: { view: next } });
  };
  const changeDensity = (next: Density) => {
    setDensity(next);
    analytics.track({ name: 'density_changed', properties: { density: next } });
  };

  return (
    <section aria-label="Workspace display preferences" className="flex flex-col gap-3 rounded-[1.5rem] border border-violet-200/70 bg-gradient-to-r from-violet-50/80 via-white to-cyan-50/80 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-violet-950 dark:from-violet-950/30 dark:via-slate-950 dark:to-cyan-950/20">
      <div>
        <p className="text-xs font-black uppercase tracking-[.18em] text-violet-600 dark:text-violet-300">UI preferences</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Tune information density without losing keyboard or screen-reader equivalence.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <div role="group" aria-label="Explorer view" className="rounded-2xl border border-slate-200 bg-white/60 p-1 dark:border-slate-800 dark:bg-slate-950/60">
          <ToggleButton active={view === 'table'} onClick={() => changeView('table')}>Table</ToggleButton>
          <ToggleButton active={view === 'cards'} onClick={() => changeView('cards')}>Cards</ToggleButton>
        </div>
        <div role="group" aria-label="Information density" className="rounded-2xl border border-slate-200 bg-white/60 p-1 dark:border-slate-800 dark:bg-slate-950/60">
          <ToggleButton active={density === 'comfortable'} onClick={() => changeDensity('comfortable')}>Comfortable</ToggleButton>
          <ToggleButton active={density === 'compact'} onClick={() => changeDensity('compact')}>Compact</ToggleButton>
        </div>
      </div>
    </section>
  );
}
