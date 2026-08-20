import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { CompanyCardGrid } from './CompanyCardGrid';
import { WorkspacePreferencesProvider } from './preferences';

describe('CompanyCardGrid', () => {
  it('filters the visual explorer while retaining semantic company links', () => {
    render(<WorkspacePreferencesProvider><MemoryRouter><CompanyCardGrid /></MemoryRouter></WorkspacePreferencesProvider>);
    expect(screen.getByText('100 results')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Company, city or tag'), { target: { value: 'Northstar Berlin' } });
    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Northstar Berlin Security' })).toHaveAttribute('href', '/companies/northstar-berlin-security/overview');
  });
});
