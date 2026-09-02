import { exams, daysRemaining } from '../data/exams';
import { GraduationCap, ExternalLink, Info } from 'lucide-react';

export default function Exams() {
  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <GraduationCap size={24} /> Exam Information
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Official exam details, patterns, and dates</p>
      </div>

      {exams.map(exam => (
        <div key={exam.id} className="card p-6">
          <div style={{ height: '3px', background: exam.accentColor, borderRadius: '14px 14px 0 0', margin: '-24px -24px 20px -24px' }} />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{exam.name}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">{exam.organizingBody} · Paper: {exam.paperCode}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`badge ${exam.status === 'OFFICIAL' ? 'badge-official' : 'badge-historical'}`}>
                {exam.status === 'HISTORICAL_REFERENCE' ? '2026 Reference Pattern' : exam.status}
              </span>
              <span className={`badge ${exam.priority === 'PRIMARY' ? 'badge-cuet' : 'badge-tba'}`}>
                {exam.priority}
              </span>
            </div>
          </div>

          <p className="text-sm text-[var(--color-text-secondary)] mb-4">{exam.purpose}</p>

          {/* Key info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="card-flat p-3 text-center">
              <p className="text-lg font-bold text-[var(--color-text-primary)]">{exam.totalMarks}</p>
              <p className="text-[0.65rem] text-[var(--color-text-muted)]">Total Marks</p>
            </div>
            <div className="card-flat p-3 text-center">
              <p className="text-lg font-bold text-[var(--color-text-primary)]">{exam.questionCount}</p>
              <p className="text-[0.65rem] text-[var(--color-text-muted)]">Questions</p>
            </div>
            <div className="card-flat p-3 text-center">
              <p className="text-lg font-bold text-[var(--color-text-primary)]">{exam.duration}</p>
              <p className="text-[0.65rem] text-[var(--color-text-muted)]">Duration</p>
            </div>
            <div className="card-flat p-3 text-center">
              <p className="text-lg font-bold text-[var(--color-text-primary)]">{exam.mode.split(' ')[0]}</p>
              <p className="text-[0.65rem] text-[var(--color-text-muted)]">Mode</p>
            </div>
          </div>

          {/* Sections */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Exam Sections</h3>
            <div className="space-y-2">
              {exam.sections.map((section, i) => (
                <div key={i} className="card-flat p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">{section.name}</span>
                    <span className="text-sm font-bold" style={{ color: exam.accentColor }}>{section.marks} marks</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{section.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Marking */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Marking Scheme</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{exam.markingScheme}</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1"><strong>Negative marking:</strong> {exam.negativeMarking}</p>
          </div>

          {/* Dates */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Important Dates</h3>
            <div className="space-y-2">
              {Object.entries(exam.dates).map(([key, dateInfo]) => {
                const days = dateInfo.date ? daysRemaining(dateInfo.date) : null;
                const isPast = days !== null && days < 0;
                return (
                  <div key={key} className="flex items-center justify-between py-1.5 border-b border-[var(--color-border)] last:border-0">
                    <span className="text-sm text-[var(--color-text-primary)]">{dateInfo.label}</span>
                    <div className="flex items-center gap-2">
                      {dateInfo.date ? (
                        <>
                          <span className={`text-sm ${isPast ? 'text-[var(--color-text-muted)]' : 'font-medium text-[var(--color-text-primary)]'}`}>
                            {new Date(dateInfo.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          {days !== null && days >= 0 && (
                            <span className="badge badge-gate text-[0.6rem]">{days}d</span>
                          )}
                          {isPast && <span className="badge badge-tba text-[0.6rem]">Past</span>}
                        </>
                      ) : (
                        <span className="badge badge-tba">TBA</span>
                      )}
                      <span className={`badge text-[0.55rem] ${dateInfo.status === 'OFFICIAL' ? 'badge-official' : 'badge-tba'}`}>
                        {dateInfo.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eligibility */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Eligibility</h3>
            <div className="card-flat p-3 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
              <p className="text-sm text-[var(--color-text-secondary)]">{exam.eligibilitySummary}</p>
            </div>
          </div>

          {/* Notes */}
          {exam.notes && (
            <div className="mb-4 card-flat p-3 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--color-text-secondary)]">{exam.notes}</p>
              </div>
            </div>
          )}

          {/* Source */}
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] pt-3 border-t border-[var(--color-border)]">
            <span>Last verified: {new Date(exam.lastVerified).toLocaleDateString('en-IN')}</span>
            <a href={exam.officialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary-500 hover:underline">
              Official Website <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
