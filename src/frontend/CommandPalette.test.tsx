import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { analytics } from '../product/analytics';
import { CommandPalette } from './CommandPalette';

vi.mock('../product/analytics', () => ({ analytics: { track: vi.fn() } }));

describe('CommandPalette', () => {
  it('opens from the keyboard, filters companies and navigates without a mouse', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CommandPalette />
        <Routes><Route path="/companies/:id/overview" element={<p>company destination</p>} /></Routes>
      </MemoryRouter>,
    );
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: 'Search commands and companies' }), { target: { value: 'Northstar Berlin' } });
    fireEvent.click(screen.getByRole('button', { name: /Northstar Berlin Security/ }));
    expect(await screen.findByText('company destination')).toBeInTheDocument();
    expect(analytics.track).toHaveBeenCalledWith(expect.objectContaining({ name: 'command_palette_used' }));
  });

  it('closes with Escape', () => {
    render(<MemoryRouter><CommandPalette /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: /Quick find/ }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
