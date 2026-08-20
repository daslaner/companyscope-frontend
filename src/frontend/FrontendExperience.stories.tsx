import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { CompanyCardGrid } from './CompanyCardGrid';
import { ExperienceToolbar } from './ExperienceToolbar';
import { WorkspacePreferencesProvider } from './preferences';

function Showcase() {
  return <MemoryRouter><WorkspacePreferencesProvider><div className="space-y-6 bg-[#f7f5ff] p-8 dark:bg-slate-950"><ExperienceToolbar /><CompanyCardGrid /></div></WorkspacePreferencesProvider></MemoryRouter>;
}

const meta = { title: 'Frontend/Adaptive Explorer', component: Showcase, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Showcase>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
