import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';

function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-[2rem] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 p-8 text-white shadow-xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-violet-100">CompanyScope Frontend</p>
          <h1 className="mt-2 text-3xl font-black">Adaptive interface primitives</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">High-contrast focus states, semantic status colors, resilient surfaces and 44px minimum interaction targets.</p>
        </header>
        <section className="space-y-3"><h2 className="text-lg font-black text-slate-950 dark:text-white">Actions</h2><div className="flex flex-wrap gap-2"><Button>Primary action</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Destructive</Button><Button disabled>Disabled</Button></div></section>
        <section className="space-y-3"><h2 className="text-lg font-black text-slate-950 dark:text-white">Status semantics</h2><div className="flex flex-wrap gap-2"><Badge>Neutral</Badge><Badge tone="accent">Accent</Badge><Badge tone="positive">Positive</Badge><Badge tone="warning">Warning</Badge><Badge tone="danger">Danger</Badge></div></section>
        <section className="grid gap-3 md:grid-cols-2"><Card><h2 className="font-black text-slate-950 dark:text-white">Data surface</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Shared surfaces keep analytics-heavy layouts visually predictable.</p></Card><Card className="border-violet-200 bg-violet-50/60 dark:border-violet-900 dark:bg-violet-950/30"><h2 className="font-black text-slate-950 dark:text-white">Interaction surface</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Accent hierarchy is used for active controls, not decorative noise.</p></Card></section>
      </div>
    </div>
  );
}

const meta = { title: 'Design System/Frontend Foundations', component: DesignSystemShowcase, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof DesignSystemShowcase>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};
