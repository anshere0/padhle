import { usePersistedState } from '../hooks/usePersistedState';
import { exams, daysRemaining } from '../data/exams';
import type { DocumentItem, Deadline } from '../types';
import { Calendar, FileCheck, Plus, X } from 'lucide-react';
import { useState } from 'react';

const defaultDocuments: DocumentItem[] = [
  { id: 'd1', label: 'Photograph (passport size)', checked: false },
  { id: 'd2', label: 'Signature scan', checked: false },
  { id: 'd3', label: 'Government ID proof', checked: false },
  { id: 'd4', label: '10th Marksheet', checked: false },
  { id: 'd5', label: '12th Marksheet', checked: false },
  { id: 'd6', label: 'Semester Marksheets (all)', checked: false },
  { id: 'd7', label: 'Degree / Provisional Certificate', checked: false },
  { id: 'd8', label: 'Category Certificate (if applicable)', checked: false },
  { id: 'd9', label: 'Application Fee receipts', checked: false },
  { id: 'd10', label: 'Admit Card(s)', checked: false },
  { id: 'd11', label: 'Scorecard(s)', checked: false },
];

export default function Deadlines() {
  const [documents, setDocuments] = usePersistedState<DocumentItem[]>('documents', defaultDocuments);
  const [customDeadlines, setCustomDeadlines] = usePersistedState<Deadline[]>('customDeadlines', []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', exam: '', date: '', type: '', notes: '' });

  const toggleDoc = (id: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, checked: !d.checked } : d));
  };

  const addDeadline = () => {
    if (!form.title) return;
    const dl: Deadline = {
      id: Date.now().toString(),
      title: form.title,
      exam: form.exam,
      date: form.date || null,
      type: form.type,
      status: form.date ? 'UPCOMING' : 'TBA',
      source: 'User added',
      notes: form.notes,
      isCustom: true,
    };
    setCustomDeadlines(prev => [...prev, dl]);
    setForm({ title: '', exam: '', date: '', type: '', notes: '' });
    setShowForm(false);
  };

  const deleteDeadline = (id: string) => {
    setCustomDeadlines(prev => prev.filter(d => d.id !== id));
  };

  // Combine exam dates + custom deadlines
  const allDeadlines: { label: string; date: string | null; exam: string; status: string; isCustom: boolean; id: string }[] = [
    ...exams.flatMap(exam =>
      Object.entries(exam.dates).map(([key, d]) => ({
        label: d.label,
        date: d.date,
        exam: exam.shortName,
        status: d.status,
        isCustom: false,
        id: `${exam.id}-${key}`,
      }))
    ),
    ...customDeadlines.map(d => ({
      label: d.title,
      date: d.date,
      exam: d.exam,
      status: d.status,
      isCustom: d.isCustom,
      id: d.id,
    })),
  ].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const docsReady = documents.filter(d => d.checked).length;

  const examColors: Record<string, string> = { 'GATE': '#6366f1', 'CUET-PG': '#10b981', 'GAT-B': '#f59e0b' };

  return (
    <div className="animate-in space-y-6">
      {/* Deadlines */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Calendar size={24} /> Deadlines
          </h1>
          <button onClick={() => setShowForm(true)} className="btn btn-primary btn-sm"><Plus size={14} /> Add</button>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Exam and application deadlines</p>
      </div>

      {showForm && (
        <div className="card p-4">
          <div className="flex justify-between mb-3">
            <h3 className="text-sm font-bold">Add Custom Deadline</h3>
            <button onClick={() => setShowForm(false)} className="btn-ghost p-1"><X size={14} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Deadline title" />
            <select value={form.exam} onChange={e => setForm(f => ({ ...f, exam: e.target.value }))}>
              <option value="">Select exam</option>
              <option value="GATE">GATE</option>
              <option value="CUET-PG">CUET-PG</option>
              <option value="GAT-B">GAT-B</option>
              <option value="University">University Application</option>
            </select>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            <input type="text" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} placeholder="Type (e.g. Registration)" />
          </div>
          <button onClick={addDeadline} className="btn btn-primary btn-sm mt-3">Save</button>
        </div>
      )}

      <div className="space-y-2">
        {allDeadlines.map(d => {
          const days = d.date ? daysRemaining(d.date) : null;
          const isPast = days !== null && days < 0;
          const isToday = days === 0;
          const isSoon = days !== null && days > 0 && days <= 7;

          return (
            <div key={d.id} className={`card p-4 flex items-center justify-between ${isPast ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-1 h-8 rounded-full" style={{ background: examColors[d.exam] || 'var(--color-text-muted)' }} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{d.label}</p>
                  <div className="flex items-center gap-2 text-[0.65rem] text-[var(--color-text-muted)]">
                    <span>{d.exam}</span>
                    {d.date && <span>{new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {d.date ? (
                  <span className={`badge text-[0.6rem] ${
                    isPast ? 'badge-tba' :
                    isToday ? 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400' :
                    isSoon ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' :
                    'badge-gate'
                  }`}>
                    {isPast ? 'Past' : isToday ? 'TODAY' : `${days}d`}
                  </span>
                ) : (
                  <span className="badge badge-tba">TBA</span>
                )}
                {d.isCustom && (
                  <button onClick={() => deleteDeadline(d.id)} className="btn-ghost p-1 rounded"><X size={12} /></button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Document checklist */}
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2 mb-1">
          <FileCheck size={20} /> Document Checklist
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">{docsReady}/{documents.length} ready</p>

        <div className="progress-bar h-2 mb-4">
          <div className="progress-bar-fill bg-[var(--color-success)]" style={{ width: `${(docsReady / documents.length) * 100}%` }} />
        </div>

        <div className="space-y-2">
          {documents.map(doc => (
            <div key={doc.id} className="card p-3 flex items-center gap-3">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={doc.checked}
                onChange={() => toggleDoc(doc.id)}
                aria-label={doc.label}
              />
              <span className={`text-sm ${doc.checked ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>
                {doc.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
