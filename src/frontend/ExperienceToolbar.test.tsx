import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { analytics } from '../product/analytics';
import { ExperienceToolbar } from './ExperienceToolbar';
import { WorkspacePreferencesProvider } from './preferences';

vi.mock('../product/analytics', () => ({ analytics: { track: vi.fn() } }));

describe('ExperienceToolbar', () => {
  it('exposes pressed state for view and density preferences', () => {
    render(<WorkspacePreferencesProvider><ExperienceToolbar /></WorkspacePreferencesProvider>);
    const cards = screen.getByRole('button', { name: 'Cards' });
    const compact = screen.getByRole('button', { name: 'Compact' });
    expect(screen.getByRole('button', { name: 'Table' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(cards);
    fireEvent.click(compact);
    expect(cards).toHaveAttribute('aria-pressed', 'true');
    expect(compact).toHaveAttribute('aria-pressed', 'true');
    expect(analytics.track).toHaveBeenCalledTimes(2);
  });
});
