import { usePersistedState } from '../hooks/usePersistedState';
import { defaultSubjects } from '../data/subjects';
import type { Mistake, MistakeType, Subject } from '../types';
import { AlertTriangle, Plus, X, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const mistakeTypes: { value: MistakeType; label: string }[] = [
  { value: 'CONCEPT', label: 'Concept Gap' },
  { value: 'MEMORY', label: 'Memory Gap' },
  { value: 'CALCULATION', label: 'Calculation Error' },
  { value: 'SILLY_MISTAKE', label: 'Silly Mistake' },
  { value: 'TIME_PRESSURE', label: 'Time Pressure' },
  { value: 'MISREAD', label: 'Misread Question' },
];

export default function Mistakes() {
  const [mistakes, setMistakes] = usePersistedState<Mistake[]>('mistakes', []);
  const [subjects] = usePersistedState<Subject[]>('subjects', defaultSubjects);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');
  const [form, setForm] = useState<Partial<Mistake>>({ exam: 'GATE', subject: '', topic: '', description: '', correctConcept: '', mistakeType: 'CONCEPT', notes: '' });

  const addMistake = () => {
    if (!form.description) return;
    const mistake: Mistake = {
      id: Date.now().toString(),
      exam: form.exam || 'GATE',
      subject: form.subject || '',
      topic: form.topic || '',
      description: form.description || '',
      correctConcept: form.correctConcept || '',
      mistakeType: (form.mistakeType || 'CONCEPT') as MistakeType,
      resolved: false,
      createdAt: new Date().toISOString(),
      notes: form.notes || '',
    };
    setMistakes(prev => [...prev, mistake]);
    setForm({ exam: 'GATE', subject: '', topic: '', description: '', correctConcept: '', mistakeType: 'CONCEPT', notes: '' });
    setShowForm(false);
  };

  const toggleResolved = (id: string) => {
    setMistakes(prev => prev.map(m => m.id === id ? { ...m, resolved: !m.resolved } : m));
  };

  const deleteMistake = (id: string) => {
    setMistakes(prev => prev.filter(m => m.id !== id));
  };

  const filtered = mistakes.filter(m => filter === 'all' || (filter === 'unresolved' && !m.resolved) || (filter === 'resolved' && m.resolved));
  const unresolved = mistakes.filter(m => !m.resolved).length;

  return (
    <div className="animate-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <AlertTriangle size={24} /> Mistake Log
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{unresolved} unresolved · {mistakes.length} total</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary btn-sm"><Plus size={14} /> Log Mistake</button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'unresolved', 'resolved'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}>
            {f === 'all' ? 'All' : f === 'unresolved' ? `Unresolved (${unresolved})` : 'Resolved'}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Log a Mistake</h3>
            <button onClick={() => setShowForm(false)} className="btn-ghost p-1 rounded-md"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={form.exam} onChange={e => setForm(f => ({ ...f, exam: e.target.value }))}>
              <option value="GATE">GATE</option>
              <option value="CUET-PG">CUET-PG</option>
              <option value="GAT-B">GAT-B</option>
            </select>
            <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
              <option value="">Select subject</option>
              {subjects.map(s => <option key={s.id} value={s.name}>{s.icon} {s.name}</option>)}
            </select>
            <input type="text" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} placeholder="Topic" />
            <select value={form.mistakeType} onChange={e => setForm(f => ({ ...f, mistakeType: e.target.value as MistakeType }))}>
              {mistakeTypes.map(mt => <option key={mt.value} value={mt.value}>{mt.label}</option>)}
            </select>
            <div className="sm:col-span-2">
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What did you get wrong?" className="min-h-[60px]" />
            </div>
            <div className="sm:col-span-2">
              <textarea value={form.correctConcept} onChange={e => setForm(f => ({ ...f, correctConcept: e.target.value }))} placeholder="Correct concept / explanation" className="min-h-[60px]" />
            </div>
          </div>
          <button onClick={addMistake} className="btn btn-primary mt-4 w-full">Save Mistake</button>
        </div>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="card p-8 text-center">
          <CheckCircle2 size={32} className="mx-auto text-[var(--color-success)] mb-3" />
          <p className="text-sm text-[var(--color-text-muted)]">
            {filter === 'unresolved' ? 'No unresolved mistakes! Great work.' : filter === 'resolved' ? 'No resolved mistakes yet.' : 'No mistakes logged yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...filtered].reverse().map(m => (
            <div key={m.id} className={`card p-4 group ${m.resolved ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-3">
                <button onClick={() => toggleResolved(m.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${m.resolved ? 'bg-[var(--color-success)] border-[var(--color-success)]' : 'border-[var(--color-danger)]'}`} aria-label="Toggle resolved">
                  {m.resolved && <span className="text-white text-xs">✓</span>}
                </button>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="badge badge-gate text-[0.6rem]">{m.exam}</span>
                    <span className="badge badge-gatb text-[0.6rem]">{mistakeTypes.find(mt => mt.value === m.mistakeType)?.label}</span>
                    {m.subject && <span className="text-xs text-[var(--color-text-muted)]">{m.subject}</span>}
                    {m.topic && <span className="text-xs text-[var(--color-text-muted)]">· {m.topic}</span>}
                  </div>
                  <p className={`text-sm ${m.resolved ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>{m.description}</p>
                  {m.correctConcept && <p className="text-xs text-[var(--color-success)] mt-1">✓ {m.correctConcept}</p>}
                  <p className="text-[0.6rem] text-[var(--color-text-muted)] mt-1">{new Date(m.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <button onClick={() => deleteMistake(m.id)} className="btn-ghost p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
