import { Link } from 'react-router-dom';
import { CompanyMap } from '../components/CompanyMap';
import { SecurityPanel } from '../components/SecurityPanel';

const qualities = [
  ['Keyboard first', 'Command palette, skip links and visible focus states keep high-frequency paths fast without a mouse.'],
  ['Adaptive density', 'Comfortable and compact views persist locally while preserving the same semantic content.'],
  ['Accessible data viz', 'Charts pair visual encoding with human-readable summaries and non-visual equivalents.'],
  ['Responsive by design', 'Navigation, cards, tables and filters reflow instead of shrinking desktop assumptions.'],
];

export function HomePage() {
  return (
    <>
      <main id="main">
        <section className="relative overflow-hidden border-b border-violet-100 dark:border-violet-950">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_14%,rgba(124,58,237,.18),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(34,211,238,.16),transparent_28%),linear-gradient(180deg,#faf9ff,#f7f5ff_55%,#f8fafc)] dark:bg-[radial-gradient(circle_at_12%_14%,rgba(124,58,237,.26),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(34,211,238,.16),transparent_28%),linear-gradient(180deg,#020617,#08071b_55%,#020617)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
            <div>
              <div className="inline-flex rounded-full border border-violet-200 bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[.2em] text-violet-700 shadow-sm backdrop-blur dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-200">Frontend engineering showcase</div>
              <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-.055em] text-slate-950 sm:text-6xl dark:text-white">Company intelligence, designed for speed, clarity and every input mode.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">A data-heavy React workspace that demonstrates adaptive layouts, resilient UI state, accessible interaction patterns, visual analytics and a production-grade design system without sacrificing the full CompanyScope workflow.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="rounded-2xl bg-violet-600 px-5 py-3 font-bold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-700" to="/register">Open adaptive workspace</Link>
                <Link className="rounded-2xl border border-violet-200 bg-white/70 px-5 py-3 font-bold text-slate-800 shadow-sm backdrop-blur hover:bg-white dark:border-violet-900 dark:bg-slate-900/70 dark:text-white" to="/companies/northstar-berlin-security/overview">Inspect detail UX</Link>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">Tip: press <kbd className="rounded bg-white px-1.5 py-0.5 shadow-sm dark:bg-slate-900">⌘/Ctrl K</kbd> anywhere.</p>
            </div>

            <div className="relative rounded-[2rem] border border-white/80 bg-slate-950 p-4 shadow-2xl shadow-violet-500/15 dark:border-violet-950">
              <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-violet-500/20 via-slate-950 to-cyan-400/10 p-6 text-white">
                <div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.18em] text-violet-200">Interface quality signals</p><span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-bold text-emerald-200">A11y-first</span></div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[['100','companies'],['2','density modes'],['2','explorer views'],['90%','coverage gate']].map(([value,label]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-3xl font-black">{value}</p><p className="mt-1 text-xs text-slate-300">{label}</p></div>)}
                </div>
                <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4 text-sm leading-6 text-slate-200">The visual layer is deliberately different from the fullstack edition: glass surfaces, violet/cyan hierarchy, command-driven navigation and user-controlled information density.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {qualities.map(([title, detail]) => <article key={title} className="rounded-[1.5rem] border border-violet-100 bg-white/80 p-5 shadow-sm dark:border-violet-950 dark:bg-slate-950"><h2 className="font-black text-slate-950 dark:text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{detail}</p></article>)}
          </div>
          <div className="mt-14 space-y-14"><CompanyMap /><SecurityPanel /></div>
        </section>
      </main>
      <footer className="border-t border-violet-100 px-5 py-8 text-center text-sm text-slate-500 dark:border-violet-950">CompanyScope Frontend · React interaction and design-system portfolio</footer>
    </>
  );
}
