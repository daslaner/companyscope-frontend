import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { companies, industries } from '../data/companies';
import { riskBand } from '../lib/risk';
import { analytics } from '../product/analytics';
import { useWorkspacePreferences } from './preferences';

type SortKey = 'growth' | 'risk' | 'name';

export function CompanyCardGrid() {
  const { density } = useWorkspacePreferences();
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('all');
  const [sort, setSort] = useState<SortKey>('growth');

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return companies
      .filter((company) => !normalized || `${company.name} ${company.city} ${company.tags.join(' ')}`.toLowerCase().includes(normalized))
      .filter((company) => industry === 'all' || company.industry === industry)
      .toSorted((a, b) => sort === 'risk' ? b.riskScore - a.riskScore : sort === 'growth' ? b.growthPct - a.growthPct : a.name.localeCompare(b.name));
  }, [industry, query, sort]);

  return (
    <section aria-labelledby="card-explorer-title" className="space-y-4">
      <div className="grid gap-3 rounded-[1.5rem] border border-violet-200/70 bg-white/75 p-4 shadow-sm backdrop-blur sm:grid-cols-3 dark:border-violet-950 dark:bg-slate-950/70">
        <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
          Search
          <input className="field mt-1" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Company, city or tag" />
        </label>
        <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
          Industry
          <select className="field mt-1" value={industry} onChange={(event) => setIndustry(event.target.value)}>
            <option value="all">All industries</option>
            {industries.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
          Sort
          <select className="field mt-1" value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            <option value="growth">Highest growth</option>
            <option value="risk">Highest risk</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-600 dark:text-cyan-300">Visual explorer</p>
          <h2 id="card-explorer-title" className="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Company cards</h2>
        </div>
        <p className="text-sm font-semibold text-slate-500" aria-live="polite">{results.length} results</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {results.map((company) => (
          <article key={company.id} className={`rounded-[1.5rem] border border-slate-200/80 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 ${density === 'compact' ? 'p-4' : 'p-5'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[.16em] text-violet-500">{company.industry}</p>
                <h3 className="mt-1 text-lg font-black text-slate-950 dark:text-white">
                  <Link
                    className="outline-none"
                    to={`/companies/${company.id}/overview`}
                    onClick={() => analytics.track({ name: 'company_opened', properties: { companyId: company.id, source: 'cards' } })}
                  >
                    {company.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-slate-500">{company.city}, {company.countryCode}</p>
              </div>
              <Badge tone={company.verified ? 'positive' : 'warning'}>{company.verified ? 'Verified' : 'Review'}</Badge>
            </div>
            <dl className={`mt-5 grid grid-cols-3 gap-2 ${density === 'compact' ? 'text-xs' : 'text-sm'}`}>
              <div><dt className="text-slate-400">Growth</dt><dd className="mt-1 font-black text-slate-900 dark:text-white">{company.growthPct > 0 ? '+' : ''}{company.growthPct}%</dd></div>
              <div><dt className="text-slate-400">Risk</dt><dd className="mt-1 font-black text-slate-900 dark:text-white">{company.riskScore}/100</dd></div>
              <div><dt className="text-slate-400">Band</dt><dd className="mt-1 font-black text-slate-900 dark:text-white">{riskBand(company.riskScore)}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
