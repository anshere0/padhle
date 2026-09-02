import { useParams, Link } from 'react-router-dom';
import { usePersistedState } from '../hooks/usePersistedState';
import { defaultSubjects } from '../data/subjects';
import type { Subject, TopicStatus } from '../types';
import { ArrowLeft, BookOpen, Save } from 'lucide-react';
import { useState } from 'react';

function StarRating({ value, max = 5, onChange }: { value: number; max?: number; onChange?: (v: number) => void }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange?.(i + 1)}
          className={`star text-sm cursor-pointer hover:text-amber-400 transition-colors ${i < value ? 'filled' : ''}`}
          aria-label={`Set confidence to ${i + 1}`}
        >
          ★
        </button>
      ))}
    </span>
  );
}

function ExamStars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star text-[0.6rem] ${i < value ? 'filled' : ''}`}>★</span>
      ))}
    </span>
  );
}

export default function SubjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [subjects, setSubjects] = usePersistedState<Subject[]>('subjects', defaultSubjects);
  const [notesOpen, setNotesOpen] = useState<string | null>(null);

  const subject = subjects.find(s => s.id === id);

  if (!subject) {
    return (
      <div className="animate-in text-center py-12">
        <p className="text-[var(--color-text-muted)]">Subject not found.</p>
        <Link to="/subjects" className="btn btn-primary btn-sm mt-4">Back to Subjects</Link>
      </div>
    );
  }

  const total = subject.topics.length;
  const completed = subject.topics.filter(t => t.status === 'COMPLETED').length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const updateTopic = (topicId: string, updates: Record<string, unknown>) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        topics: s.topics.map(t => t.id === topicId ? { ...t, ...updates } : t),
      };
    }));
  };

  const cycleStatus = (topicId: string, current: TopicStatus) => {
    const next: TopicStatus = current === 'NOT_STARTED' ? 'IN_PROGRESS' : current === 'IN_PROGRESS' ? 'COMPLETED' : 'NOT_STARTED';
    updateTopic(topicId, { status: next });
  };

  return (
    <div className="animate-in space-y-6">
      {/* Header */}
      <div>
        <Link to="/subjects" className="text-sm text-primary-500 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft size={14} /> Back to Subjects
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{subject.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{subject.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className={`badge text-[0.6rem] ${
                subject.priority === 'CRITICAL' ? 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400' :
                subject.priority === 'HIGH' ? 'badge-gatb' : 'badge-tba'
              }`}>{subject.priority}</span>
              <span className="text-xs text-[var(--color-text-muted)]">{total} topics · {percent}% complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="card p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[var(--color-text-secondary)]">Overall Progress</span>
          <span className="font-bold text-[var(--color-text-primary)]">{completed}/{total} · {percent}%</span>
        </div>
        <div className="progress-bar h-2">
          <div className="progress-bar-fill bg-primary-500" style={{ width: `${percent}%` }} />
        </div>
        <div className="flex gap-6 mt-3 text-xs text-[var(--color-text-muted)]">
          <span>GATE <ExamStars value={subject.examRelevance.gate} /></span>
          <span>CUET <ExamStars value={subject.examRelevance.cuet} /></span>
          <span>GAT-B <ExamStars value={subject.examRelevance.gatb} /></span>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-2">
        {subject.topics.map((topic) => {
          const statusLabel = topic.status === 'NOT_STARTED' ? 'Not Started' : topic.status === 'IN_PROGRESS' ? 'In Progress' : 'Completed';
          const statusColor = topic.status === 'COMPLETED' ? 'text-[var(--color-success)]' : topic.status === 'IN_PROGRESS' ? 'text-[var(--color-info)]' : 'text-[var(--color-text-muted)]';

          return (
            <div key={topic.id} className="card p-4">
              <div className="flex items-start gap-3">
                {/* Status toggle */}
                <button
                  onClick={() => cycleStatus(topic.id, topic.status)}
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    topic.status === 'COMPLETED' ? 'bg-[var(--color-success)] border-[var(--color-success)]' :
                    topic.status === 'IN_PROGRESS' ? 'bg-[var(--color-info)] border-[var(--color-info)]' :
                    'border-[var(--color-border-hover)]'
                  }`}
                  aria-label={`Toggle ${topic.title} status`}
                >
                  {topic.status === 'COMPLETED' && <span className="text-white text-xs">✓</span>}
                  {topic.status === 'IN_PROGRESS' && <span className="text-white text-[0.5rem]">●</span>}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-medium ${topic.status === 'COMPLETED' ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>
                      {topic.title}
                    </h4>
                    <span className={`text-[0.65rem] font-medium ${statusColor}`}>{statusLabel}</span>
                  </div>

                  {/* Confidence */}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-[0.65rem] text-[var(--color-text-muted)]">Confidence:</span>
                      <StarRating value={topic.confidence} onChange={(v) => updateTopic(topic.id, { confidence: v })} />
                    </div>
                  </div>

                  {/* Exam relevance */}
                  <div className="flex gap-3 mt-1 text-[0.6rem] text-[var(--color-text-muted)]">
                    <span>GATE <ExamStars value={topic.examRelevance.gate} /></span>
                    <span>CUET <ExamStars value={topic.examRelevance.cuet} /></span>
                    <span>GAT-B <ExamStars value={topic.examRelevance.gatb} /></span>
                  </div>

                  {/* Revision checkboxes */}
                  <div className="flex items-center gap-4 mt-2 text-[0.65rem]">
                    {(['revision1', 'revision2', 'revision3'] as const).map((rev, i) => (
                      <label key={rev} className="flex items-center gap-1 cursor-pointer text-[var(--color-text-muted)]">
                        <input
                          type="checkbox"
                          className="custom-checkbox w-4 h-4"
                          checked={topic[rev]}
                          onChange={() => updateTopic(topic.id, { [rev]: !topic[rev], [`${rev}Date`]: !topic[rev] ? new Date().toISOString().split('T')[0] : null })}
                        />
                        Rev {i + 1}
                      </label>
                    ))}
                  </div>

                  {/* Questions */}
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min="0"
                      value={topic.questionsAttempted || ''}
                      onChange={e => updateTopic(topic.id, { questionsAttempted: parseInt(e.target.value) || 0 })}
                      placeholder="Qs attempted"
                      className="w-28 text-xs py-1"
                    />
                    <input
                      type="number"
                      min="0"
                      value={topic.questionsCorrect || ''}
                      onChange={e => updateTopic(topic.id, { questionsCorrect: parseInt(e.target.value) || 0 })}
                      placeholder="Correct"
                      className="w-28 text-xs py-1"
                    />
                    {topic.questionsAttempted > 0 && (
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {Math.round((topic.questionsCorrect / topic.questionsAttempted) * 100)}% accuracy
                      </span>
                    )}
                  </div>

                  {/* Notes toggle */}
                  <button
                    onClick={() => setNotesOpen(notesOpen === topic.id ? null : topic.id)}
                    className="text-[0.65rem] text-primary-500 hover:underline mt-2"
                  >
                    {notesOpen === topic.id ? 'Hide notes' : topic.notes ? 'View notes' : 'Add notes'}
                  </button>
                  {notesOpen === topic.id && (
                    <textarea
                      value={topic.notes}
                      onChange={e => updateTopic(topic.id, { notes: e.target.value })}
                      placeholder="Your notes for this topic..."
                      className="mt-2 text-xs min-h-[60px]"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
