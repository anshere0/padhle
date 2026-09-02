import { usePersistedState } from '../hooks/usePersistedState';
import type { PYQStats } from '../types';
import { FileQuestion, Save } from 'lucide-react';
import { useState } from 'react';

const defaultPYQs: PYQStats[] = [
  { exam: 'GATE', attempted: 0, correct: 0, wrong: 0 },
  { exam: 'CUET-PG', attempted: 0, correct: 0, wrong: 0 },
  { exam: 'GAT-B', attempted: 0, correct: 0, wrong: 0 },
];

export default function PYQs() {
  const [pyqs, setPyqs] = usePersistedState<PYQStats[]>('pyqs', defaultPYQs);
  const [editExam, setEditExam] = useState<string | null>(null);
  const [form, setForm] = useState({ attempted: 0, correct: 0 });

  const updatePYQ = (exam: string) => {
    setPyqs(prev => prev.map(p => {
      if (p.exam !== exam) return p;
      return {
        ...p,
        attempted: p.attempted + form.attempted,
        correct: p.correct + form.correct,
        wrong: p.wrong + (form.attempted - form.correct),
      };
    }));
    setForm({ attempted: 0, correct: 0 });
    setEditExam(null);
  };

  const totalAttempted = pyqs.reduce((s, p) => s + p.attempted, 0);
  const totalCorrect = pyqs.reduce((s, p) => s + p.correct, 0);

  const examColors: Record<string, string> = { 'GATE': '#6366f1', 'CUET-PG': '#10b981', 'GAT-B': '#f59e0b' };

  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <FileQuestion size={24} /> PYQ Tracker
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          {totalAttempted} attempted · {totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0}% accuracy
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {pyqs.map(p => {
          const accuracy = p.attempted > 0 ? Math.round((p.correct / p.attempted) * 100) : 0;
          return (
            <div key={p.exam} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold" style={{ color: examColors[p.exam] }}>{p.exam}</h3>
                <button onClick={() => { setEditExam(p.exam); setForm({ attempted: 0, correct: 0 }); }} className="btn btn-secondary btn-sm">+ Add</button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">{p.attempted}</p>
                  <p className="text-[0.65rem] text-[var(--color-text-muted)]">Attempted</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--color-success)]">{p.correct}</p>
                  <p className="text-[0.65rem] text-[var(--color-text-muted)]">Correct</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: accuracy >= 70 ? 'var(--color-success)' : accuracy >= 50 ? 'var(--color-warning)' : 'var(--color-danger)' }}>{accuracy}%</p>
                  <p className="text-[0.65rem] text-[var(--color-text-muted)]">Accuracy</p>
                </div>
              </div>
              <div className="progress-bar mt-3">
                <div className="progress-bar-fill" style={{ width: `${accuracy}%`, background: examColors[p.exam] }} />
              </div>

              {editExam === p.exam && (
                <div className="mt-4 pt-4 border-t border-[var(--color-border)] space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[0.65rem] text-[var(--color-text-muted)]">Questions Done</label>
                      <input type="number" min="0" value={form.attempted || ''} onChange={e => setForm(f => ({ ...f, attempted: parseInt(e.target.value) || 0 }))} />
                    </div>
                    <div className="flex-1">
                      <label className="text-[0.65rem] text-[var(--color-text-muted)]">Correct</label>
                      <input type="number" min="0" max={form.attempted} value={form.correct || ''} onChange={e => setForm(f => ({ ...f, correct: parseInt(e.target.value) || 0 }))} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updatePYQ(p.exam)} className="btn btn-primary btn-sm flex-1"><Save size={14} /> Save</button>
                    <button onClick={() => setEditExam(null)} className="btn btn-secondary btn-sm">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
