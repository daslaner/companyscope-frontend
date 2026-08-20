import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WorkspacePreferencesProvider, useWorkspacePreferences } from './preferences';

function Consumer() {
  const preferences = useWorkspacePreferences();
  return (
    <div>
      <p>{preferences.view}:{preferences.density}</p>
      <button onClick={() => preferences.setView('cards')}>cards</button>
      <button onClick={() => preferences.setDensity('compact')}>compact</button>
    </div>
  );
}

describe('WorkspacePreferencesProvider', () => {
  it('persists adaptive UI choices and reflects density on the document', () => {
    localStorage.clear();
    render(<WorkspacePreferencesProvider><Consumer /></WorkspacePreferencesProvider>);
    expect(screen.getByText('table:comfortable')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'cards' }));
    fireEvent.click(screen.getByRole('button', { name: 'compact' }));
    expect(screen.getByText('cards:compact')).toBeInTheDocument();
    expect(document.documentElement.dataset.density).toBe('compact');
    expect(localStorage.getItem('companyscope.frontend.preferences.v1')).toContain('"cards"');
  });

  it('recovers from unavailable or malformed storage', () => {
    localStorage.setItem('companyscope.frontend.preferences.v1', '{broken');
    render(<WorkspacePreferencesProvider><Consumer /></WorkspacePreferencesProvider>);
    expect(screen.getByText('table:comfortable')).toBeInTheDocument();
  });
});
