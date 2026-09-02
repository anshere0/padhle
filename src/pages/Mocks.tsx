import { usePersistedState } from '../hooks/usePersistedState';
import type { MockTest } from '../types';
import { ClipboardList, Plus, TrendingUp, X } from 'lucide-react';
import { useState } from 'react';

export default function Mocks() {
  const [mocks, setMocks] = usePersistedState<MockTest[]>('mocks', []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<MockTest>>({ exam: 'GATE', name: '', date: new Date().toISOString().split('T')[0], score: 0, maxMarks: 100, attempted: 0, correct: 0, wrong: 0, duration: '', notes: '' });

  const addMock = () => {
    if (!form.name || !form.date) return;
    const mock: MockTest = {
      id: Date.now().toString(),
      exam: form.exam || 'GATE',
      name: form.name || '',
      date: form.date || '',
      score: form.score || 0,
      maxMarks: form.maxMarks || 100,
      attempted: form.attempted || 0,
      correct: form.correct || 0,
      wrong: form.wrong || 0,
      duration: form.duration || '',
      notes: form.notes || '',
    };
    setMocks(prev => [...prev, mock]);
    setForm({ exam: 'GATE', name: '', date: new Date().toISOString().split('T')[0], score: 0, maxMarks: 100, attempted: 0, correct: 0, wrong: 0, duration: '', notes: '' });
    setShowForm(false);
  };

  const deleteMock = (id: string) => {
    setMocks(prev => prev.filter(m => m.id !== id));
  };

  const avgScore = mocks.length > 0 ? Math.round(mocks.reduce((s, m) => s + m.score, 0) / mocks.length) : 0;
  const bestScore = mocks.length > 0 ? Math.max(...mocks.map(m => m.score)) : 0;
  const avgAccuracy = mocks.length > 0 ? Math.round(mocks.filter(m => m.attempted > 0).reduce((s, m) => s + (m.correct / m.attempted * 100), 0) / Math.max(mocks.filter(m => m.attempted > 0).length, 1)) : 0;

  return (
    <div className="animate-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <ClipboardList size={24} /> Mock Tests
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{mocks.length} mocks recorded</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-primary btn-sm"><Plus size={14} /> Add Mock</button>
      </div>

      {/* Stats */}
      {mocks.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="card-flat p-4 text-center">
            <p className="text-2xl font-bold text-primary-500">{avgScore}</p>
            <p className="text-[0.65rem] text-[var(--color-text-muted)]">Average Score</p>
          </div>
          <div className="card-flat p-4 text-center">
            <p className="text-2xl font-bold text-[var(--color-success)]">{bestScore}</p>
            <p className="text-[0.65rem] text-[var(--color-text-muted)]">Best Score</p>
          </div>
          <div className="card-flat p-4 text-center">
            <p className="text-2xl font-bold text-[var(--color-warning)]">{avgAccuracy}%</p>
            <p className="text-[0.65rem] text-[var(--color-text-muted)]">Avg Accuracy</p>
          </div>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">New Mock Test</h3>
            <button onClick={() => setShowForm(false)} className="btn-ghost p-1 rounded-md"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[var(--color-text-muted)]">Exam</label>
              <select value={form.exam} onChange={e => setForm(f => ({ ...f, exam: e.target.value }))}>
                <option value="GATE">GATE</option>
                <option value="CUET-PG">CUET-PG</option>
                <option value="GAT-B">GAT-B</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)]">Test Name</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. GATE Mock 1" />
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)]">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)]">Score</label>
              <input type="number" min="0" value={form.score || ''} onChange={e => setForm(f => ({ ...f, score: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)]">Max Marks</label>
              <input type="number" min="1" value={form.maxMarks || ''} onChange={e => setForm(f => ({ ...f, maxMarks: parseInt(e.target.value) || 100 }))} />
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)]">Attempted</label>
              <input type="number" min="0" value={form.attempted || ''} onChange={e => setForm(f => ({ ...f, attempted: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)]">Correct</label>
              <input type="number" min="0" value={form.correct || ''} onChange={e => setForm(f => ({ ...f, correct: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)]">Wrong</label>
              <input type="number" min="0" value={form.wrong || ''} onChange={e => setForm(f => ({ ...f, wrong: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)]">Duration</label>
              <input type="text" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 2h 30m" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-[var(--color-text-muted)]">Notes</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="What went well? What needs work?" className="min-h-[60px]" />
            </div>
          </div>
          <button onClick={addMock} className="btn btn-primary mt-4 w-full">Save Mock</button>
        </div>
      )}

      {/* Mock list */}
      {mocks.length === 0 && !showForm ? (
        <div className="card p-8 text-center">
          <TrendingUp size={32} className="mx-auto text-[var(--color-text-muted)] mb-3" />
          <p className="text-sm text-[var(--color-text-muted)]">No mocks yet.</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Your first mock will appear here. Take one when you're ready.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...mocks].reverse().map(mock => {
            const accuracy = mock.attempted > 0 ? Math.round((mock.correct / mock.attempted) * 100) : 0;
            const examColors: Record<string, string> = { 'GATE': '#6366f1', 'CUET-PG': '#10b981', 'GAT-B': '#f59e0b' };
            return (
              <div key={mock.id} className="card p-4 group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="badge" style={{ background: `${examColors[mock.exam] || '#6366f1'}20`, color: examColors[mock.exam] || '#6366f1' }}>{mock.exam}</span>
                    <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">{mock.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--color-text-muted)]">{new Date(mock.date).toLocaleDateString('en-IN')}</span>
                    <button onClick={() => deleteMock(mock.id)} className="btn-ghost p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div><p className="text-lg font-bold text-primary-500">{mock.score}<span className="text-[var(--color-text-muted)] text-xs">/{mock.maxMarks}</span></p><p className="text-[var(--color-text-muted)]">Score</p></div>
                  <div><p className="text-lg font-bold text-[var(--color-text-primary)]">{mock.attempted}</p><p className="text-[var(--color-text-muted)]">Attempted</p></div>
                  <div><p className="text-lg font-bold text-[var(--color-success)]">{mock.correct}</p><p className="text-[var(--color-text-muted)]">Correct</p></div>
                  <div><p className="text-lg font-bold" style={{ color: accuracy >= 70 ? 'var(--color-success)' : accuracy >= 50 ? 'var(--color-warning)' : 'var(--color-danger)' }}>{accuracy}%</p><p className="text-[var(--color-text-muted)]">Accuracy</p></div>
                </div>
                {mock.notes && <p className="text-xs text-[var(--color-text-muted)] mt-2 border-t border-[var(--color-border)] pt-2">{mock.notes}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
