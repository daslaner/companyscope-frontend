import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

export type ExplorerView = 'table' | 'cards';
export type Density = 'comfortable' | 'compact';

type WorkspacePreferences = {
  view: ExplorerView;
  density: Density;
  setView(view: ExplorerView): void;
  setDensity(density: Density): void;
};

const storageKey = 'companyscope.frontend.preferences.v1';
const PreferencesContext = createContext<WorkspacePreferences | null>(null);

function readPreferences(): Pick<WorkspacePreferences, 'view' | 'density'> {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? '{}') as Partial<WorkspacePreferences>;
    return {
      view: parsed.view === 'cards' ? 'cards' : 'table',
      density: parsed.density === 'compact' ? 'compact' : 'comfortable',
    };
  } catch {
    return { view: 'table', density: 'comfortable' };
  }
}

export function WorkspacePreferencesProvider({ children }: PropsWithChildren) {
  const initial = useMemo(readPreferences, []);
  const [view, setView] = useState<ExplorerView>(initial.view);
  const [density, setDensity] = useState<Density>(initial.density);

  useEffect(() => {
    document.documentElement.dataset.density = density;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ view, density }));
    } catch {
      // Preferences remain usable in-memory when storage is unavailable.
    }
  }, [density, view]);

  return (
    <PreferencesContext.Provider value={{ view, density, setView, setDensity }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function useWorkspacePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error('useWorkspacePreferences must be used inside WorkspacePreferencesProvider');
  return value;
}
