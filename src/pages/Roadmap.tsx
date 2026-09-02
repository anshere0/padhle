import { roadmapPhases, getCurrentPhase } from '../data/roadmap';
import { Map, CheckCircle2, Circle, Clock } from 'lucide-react';

export default function Roadmap() {
  const currentPhase = getCurrentPhase(roadmapPhases);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <Map size={24} /> Preparation Roadmap
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">September 2026 → Post-GATE 2027</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

        <div className="space-y-6">
          {roadmapPhases.map((phase, index) => {
            const start = new Date(phase.startDate);
            const end = new Date(phase.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            const isPast = now > end;
            const isCurrent = currentPhase?.id === phase.id;
            const isFuture = now < start;

            return (
              <div key={phase.id} className="relative pl-14">
                {/* Dot */}
                <div className={`absolute left-4 top-5 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10
                  ${isPast ? 'bg-[var(--color-success)] border-[var(--color-success)]' :
                    isCurrent ? 'bg-primary-500 border-primary-500 animate-pulse-subtle' :
                    'bg-[var(--color-surface-0)] border-[var(--color-border)]'}`}>
                  {isPast && <CheckCircle2 size={12} className="text-white" />}
                  {isCurrent && <Clock size={10} className="text-white" />}
                  {isFuture && <Circle size={8} className="text-[var(--color-text-muted)]" />}
                </div>

                <div className={`card p-5 ${isCurrent ? 'border-primary-400 shadow-md ring-1 ring-primary-200' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`badge ${isPast ? 'badge-official' : isCurrent ? 'badge-gate' : 'badge-tba'}`}>
                      {isPast ? 'COMPLETED' : isCurrent ? 'CURRENT' : 'UPCOMING'}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      Phase {index}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{phase.month}</h3>
                  <p className="text-sm font-semibold text-primary-500 mt-0.5">{phase.title}</p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-2">{phase.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {phase.subjects.map((s, i) => (
                      <span key={i} className="badge badge-gate text-[0.65rem]">{s}</span>
                    ))}
                  </div>

                  <p className="text-[0.65rem] text-[var(--color-text-muted)] mt-3">
                    {new Date(phase.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} — {new Date(phase.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
