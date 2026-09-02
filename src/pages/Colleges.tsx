import { useState } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { defaultColleges } from '../data/colleges';
import type { College, CollegePreference, CollegePriority } from '../types';
import { Building2, Heart, ExternalLink, Search, MapPin } from 'lucide-react';

export default function Colleges() {
  const [prefs, setPrefs] = usePersistedState<Record<string, CollegePreference>>('collegePref', {});
  const [search, setSearch] = useState('');
  const [filterExam, setFilterExam] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showFavOnly, setShowFavOnly] = useState(false);

  const getPref = (id: string): CollegePreference => prefs[id] || { collegeId: id, priority: 'NONE' as CollegePriority, isFavourite: false, notes: '' };

  const updatePref = (id: string, updates: Partial<CollegePreference>) => {
    setPrefs(prev => ({ ...prev, [id]: { ...getPref(id), ...updates } }));
  };

  const toggleFav = (id: string) => {
    const current = getPref(id);
    updatePref(id, { isFavourite: !current.isFavourite });
  };

  const setPriority = (id: string, priority: CollegePriority) => {
    updatePref(id, { priority });
  };

  // Filter
  let filtered = defaultColleges.filter((c: College) => {
    if (search && !`${c.institution} ${c.programme} ${c.city} ${c.state} ${c.specialization}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterExam && !c.examRoute.includes(filterExam)) return false;
    if (filterType && c.institutionType !== filterType) return false;
    if (filterPriority && getPref(c.id).priority !== filterPriority) return false;
    if (showFavOnly && !getPref(c.id).isFavourite) return false;
    return true;
  });

  const institutionTypes = [...new Set(defaultColleges.map((c: College) => c.institutionType))].sort();
  const priorityColors: Record<string, string> = { DREAM: '#ec4899', TARGET: '#6366f1', BACKUP: '#f59e0b', NONE: 'var(--color-text-muted)' };

  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <Building2 size={24} /> Target Colleges
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{defaultColleges.length} programmes · {Object.values(prefs).filter(p => p.isFavourite).length} favourites</p>
      </div>

      {/* Search + Filters */}
      <div className="card p-4 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search colleges, programmes, cities..." className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={filterExam} onChange={e => setFilterExam(e.target.value)} className="w-auto">
            <option value="">All Exams</option>
            <option value="GAT-B">GAT-B</option>
            <option value="CUET-PG">CUET-PG</option>
            <option value="GATE">GATE</option>
          </select>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-auto">
            <option value="">All Types</option>
            {institutionTypes.map(t => <option key={t as string} value={t as string}>{t as string}</option>)}
          </select>
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="w-auto">
            <option value="">All Priorities</option>
            <option value="DREAM">Dream</option>
            <option value="TARGET">Target</option>
            <option value="BACKUP">Backup</option>
          </select>
          <button onClick={() => setShowFavOnly(!showFavOnly)} className={`btn btn-sm ${showFavOnly ? 'btn-primary' : 'btn-secondary'}`}>
            <Heart size={14} /> Favourites
          </button>
        </div>
      </div>

      {/* College cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((college: College) => {
          const pref = getPref(college.id);
          return (
            <div key={college.id} className="card p-5 group">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[var(--color-text-primary)] leading-tight">{college.institution}</h3>
                  <p className="text-xs text-primary-500 font-medium mt-0.5">{college.programme}</p>
                </div>
                <button onClick={() => toggleFav(college.id)} className="ml-2 flex-shrink-0" aria-label="Toggle favourite">
                  <Heart size={18} className={pref.isFavourite ? 'fill-pink-500 text-pink-500' : 'text-[var(--color-text-muted)]'} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                <span className="badge badge-gate text-[0.6rem]">{college.examRoute}</span>
                <span className="badge badge-tba text-[0.6rem]">{college.institutionType}</span>
                {college.dbtSupported && <span className="badge badge-cuet text-[0.6rem]">DBT</span>}
                {college.seatCount && <span className="badge badge-historical text-[0.6rem]">{college.seatCount} seats ({college.seatYear})</span>}
              </div>

              <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] mb-3">
                <MapPin size={12} />
                <span>{college.city}, {college.state}</span>
              </div>

              {college.eligibilitySummary && (
                <p className="text-xs text-[var(--color-text-secondary)] mb-3">{college.eligibilitySummary}</p>
              )}

              {/* Priority selector */}
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[0.65rem] text-[var(--color-text-muted)]">Priority:</span>
                {(['DREAM', 'TARGET', 'BACKUP'] as CollegePriority[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setPriority(college.id, pref.priority === p ? 'NONE' : p)}
                    className={`text-[0.6rem] px-2 py-0.5 rounded-full border transition-colors ${pref.priority === p ? 'text-white' : 'border-[var(--color-border)] text-[var(--color-text-muted)]'}`}
                    style={pref.priority === p ? { background: priorityColors[p], borderColor: priorityColors[p] } : {}}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Notes */}
              <textarea
                value={pref.notes}
                onChange={e => updatePref(college.id, { notes: e.target.value })}
                placeholder="Your notes..."
                className="text-xs min-h-[40px] mb-2"
              />

              {/* Source */}
              <div className="flex items-center justify-between text-[0.6rem] text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-1">
                  <span className={`badge text-[0.55rem] ${college.sourceStatus === 'OFFICIAL' ? 'badge-official' : 'badge-historical'}`}>
                    {college.sourceStatus === 'HISTORICAL_REFERENCE' ? '2026 REF' : college.sourceStatus}
                  </span>
                  <span>Verified: {new Date(college.lastVerified).toLocaleDateString('en-IN')}</span>
                </div>
                {college.officialUrl && (
                  <a href={college.officialUrl} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline flex items-center gap-1">
                    Official <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">No colleges match your filters.</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="card-flat p-3 text-center">
        <p className="text-[0.65rem] text-[var(--color-text-muted)]">
          All programme information is reference data. Always verify the current 2027 admission bulletin before applying.
          Exam eligibility ≠ programme eligibility — check each programme individually.
        </p>
      </div>
    </div>
  );
}
