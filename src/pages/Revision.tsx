import { usePersistedState } from '../hooks/usePersistedState';
import { defaultSubjects } from '../data/subjects';
import type { Subject } from '../types';
import { RotateCcw } from 'lucide-react';

export default function Revision() {
  const [subjects, setSubjects] = usePersistedState<Subject[]>('subjects', defaultSubjects);

  const allTopics = subjects.flatMap(s => s.topics.map(t => ({ ...t, subjectName: s.name, subjectIcon: s.icon })));
  const completedTopics = allTopics.filter(t => t.status === 'COMPLETED');

  const needsRevision = completedTopics.filter(t => !t.revision1 || !t.revision2 || !t.revision3);
  const fullyRevised = completedTopics.filter(t => t.revision1 && t.revision2 && t.revision3);

  const toggleRevision = (topicId: string, subjectId: string, rev: 'revision1' | 'revision2' | 'revision3') => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      return { ...s, topics: s.topics.map(t => t.id === topicId ? { ...t, [rev]: !t[rev], [`${rev}Date`]: !t[rev] ? new Date().toISOString().split('T')[0] : null } : t) };
    }));
  };

  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <RotateCcw size={24} /> Revision Tracker
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          {needsRevision.length} topics need revision · {fullyRevised.length} fully revised
        </p>
      </div>

      {/* Needs revision */}
      {needsRevision.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Needs Revision</h2>
          <div className="space-y-2">
            {needsRevision.map(topic => (
              <div key={topic.id} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-[var(--color-text-primary)]">{topic.subjectIcon} {topic.title}</h4>
                    <p className="text-[0.65rem] text-[var(--color-text-muted)]">{topic.subjectName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[0.65rem]">
                  {(['revision1', 'revision2', 'revision3'] as const).map((rev, i) => (
                    <label key={rev} className="flex items-center gap-1.5 cursor-pointer text-[var(--color-text-muted)]">
                      <input
                        type="checkbox"
                        className="custom-checkbox w-4 h-4"
                        checked={topic[rev]}
                        onChange={() => toggleRevision(topic.id, topic.subjectId, rev)}
                      />
                      <span>Rev {i + 1}</span>
                      {topic[`${rev}Date` as keyof typeof topic] && (
                        <span className="text-[var(--color-success)]">
                          {new Date(topic[`${rev}Date` as keyof typeof topic] as string).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fully revised */}
      {fullyRevised.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Fully Revised ✅</h2>
          <div className="space-y-2">
            {fullyRevised.map(topic => (
              <div key={topic.id} className="card-flat p-3 flex items-center gap-3 opacity-60">
                <span className="text-[var(--color-success)]">✓</span>
                <span className="text-sm text-[var(--color-text-primary)]">{topic.subjectIcon} {topic.title}</span>
                <span className="text-xs text-[var(--color-text-muted)] ml-auto">{topic.subjectName}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedTopics.length === 0 && (
        <div className="card p-8 text-center">
          <RotateCcw size={32} className="mx-auto text-[var(--color-text-muted)] mb-3" />
          <p className="text-sm text-[var(--color-text-muted)]">Complete topics first to start revisions.</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Mark topics as completed in Subjects to see them here.</p>
        </div>
      )}
    </div>
  );
}
