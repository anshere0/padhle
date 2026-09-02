import { Link } from 'react-router-dom';
import { usePersistedState } from '../hooks/usePersistedState';
import { defaultSubjects } from '../data/subjects';
import type { Subject } from '../types';
import { BookOpen, ChevronRight } from 'lucide-react';

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star text-xs ${i < value ? 'filled' : ''}`}>★</span>
      ))}
    </span>
  );
}

export default function Subjects() {
  const [subjects] = usePersistedState<Subject[]>('subjects', defaultSubjects);

  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <BookOpen size={24} /> Subjects
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">17 subjects · {subjects.reduce((s, sub) => s + sub.topics.length, 0)} topics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map(subject => {
          const total = subject.topics.length;
          const completedFull = subject.topics.filter(t => t.status === 'COMPLETED').length;
          const completedHalf = subject.topics.filter(t => t.status === 'IN_PROGRESS').length;
          const progressScore = completedFull + (completedHalf * 0.5);
          const percent = total > 0 ? Math.round((progressScore / total) * 100) : 0;
          
          const displayCovered = completedFull + completedHalf;
          const avgConfidence = subject.topics.length > 0
            ? (subject.topics.reduce((s, t) => s + t.confidence, 0) / total).toFixed(1)
            : '0';
          const totalQ = subject.topics.reduce((s, t) => s + t.questionsAttempted, 0);
          const correctQ = subject.topics.reduce((s, t) => s + t.questionsCorrect, 0);
          const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;

          return (
            <Link
              to={`/subjects/${subject.id}`}
              key={subject.id}
              className="card p-5 group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{subject.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-primary-500 transition-colors">
                      {subject.name}
                    </h3>
                    <span className={`badge text-[0.6rem] ${
                      subject.priority === 'CRITICAL' ? 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400' :
                      subject.priority === 'HIGH' ? 'badge-gatb' :
                      'badge-tba'
                    }`}>
                      {subject.priority}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[var(--color-text-muted)] group-hover:text-primary-500 transition-colors" />
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--color-text-muted)]">{displayCovered}/{total} covered</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">{percent}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${percent}%`,
                      background: percent === 100 ? 'var(--color-success)' : percent > 50 ? 'var(--color-info)' : 'var(--color-primary-500)',
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-[0.65rem]">
                <div>
                  <p className="font-bold text-sm text-[var(--color-text-primary)]">{avgConfidence}</p>
                  <p className="text-[var(--color-text-muted)]">Confidence</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-[var(--color-text-primary)]">{totalQ}</p>
                  <p className="text-[var(--color-text-muted)]">Questions</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-[var(--color-text-primary)]">{totalQ > 0 ? `${accuracy}%` : '—'}</p>
                  <p className="text-[var(--color-text-muted)]">Accuracy</p>
                </div>
              </div>

              {/* Exam relevance */}
              <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex gap-4 text-[0.65rem]">
                <span className="text-[var(--color-text-muted)]">GATE <StarRating value={subject.examRelevance.gate} /></span>
                <span className="text-[var(--color-text-muted)]">CUET <StarRating value={subject.examRelevance.cuet} /></span>
                <span className="text-[var(--color-text-muted)]">GAT-B <StarRating value={subject.examRelevance.gatb} /></span>
              </div>

              {completedHalf > 0 && (
                <p className="text-[0.65rem] text-[var(--color-info)] mt-2">{completedHalf} topic{completedHalf > 1 ? 's' : ''} in progress</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
