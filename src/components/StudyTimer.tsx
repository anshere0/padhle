import { useState, useEffect, useRef } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { defaultSubjects } from '../data/subjects';
import { useGamification } from '../hooks/useGamification';
import type { StudySession, Subject, StreakData } from '../types';
import { X, Play, Pause, RotateCcw, Check } from 'lucide-react';

const presets = [
  { label: '25 min', minutes: 25 },
  { label: '50 min', minutes: 50 },
  { label: '60 min', minutes: 60 },
  { label: '90 min', minutes: 90 },
];

interface Props {
  onClose: () => void;
  initialSubject?: string;
}

export default function StudyTimer({ onClose, initialSubject = '' }: Props) {
  const [sessions, setSessions] = usePersistedState<StudySession[]>('sessions', []);
  const [subjects] = usePersistedState<Subject[]>('subjects', defaultSubjects);
  const [streak, setStreak] = usePersistedState<StreakData>('streak', { currentStreak: 0, bestStreak: 0, lastStudyDate: null, studyDays: [] });
  const { addXP } = useGamification();

  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [remaining, setRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [customMin, setCustomMin] = useState('');

  // Session tagging
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<string>('');

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remaining]);

  const handleStart = () => {
    if (!isRunning && remaining > 0) {
      if (!startTimeRef.current) {
        startTimeRef.current = new Date().toISOString();
      }
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setRemaining(totalSeconds);
    startTimeRef.current = '';
  };

  const selectPreset = (minutes: number) => {
    setTotalSeconds(minutes * 60);
    setRemaining(minutes * 60);
    setIsRunning(false);
    setIsComplete(false);
    startTimeRef.current = '';
  };

  const handleCustom = () => {
    const m = parseInt(customMin);
    if (m > 0 && m <= 240) {
      selectPreset(m);
      setCustomMin('');
    }
  };

  const saveSession = () => {
    const duration = Math.round((totalSeconds - remaining) / 60);
    if (duration < 1) { onClose(); return; }

    const session: StudySession = {
      id: Date.now().toString(),
      startTime: startTimeRef.current || new Date().toISOString(),
      endTime: new Date().toISOString(),
      durationMinutes: duration,
      exam: selectedExam,
      subject: selectedSubject,
      topic: selectedTopic,
      completed: isComplete,
    };
    setSessions(prev => [...prev, session]);

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    
    // Add XP based on duration (approx 5 XP per 10 minutes = 0.5 * min)
    if (duration >= 5) {
      addXP(Math.max(5, Math.round(duration * 0.5)));
    }

    setStreak(prev => {
      const days = new Set(prev.studyDays);
      days.add(today);
      const sortedDays = Array.from(days).sort();

      // Calculate streak
      let currentStreak = 1;
      for (let i = sortedDays.length - 1; i > 0; i--) {
        const curr = new Date(sortedDays[i]);
        const prev2 = new Date(sortedDays[i - 1]);
        const diff = (curr.getTime() - prev2.getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) currentStreak++;
        else break;
      }

      return {
        currentStreak,
        bestStreak: Math.max(prev.bestStreak, currentStreak),
        lastStudyDate: today,
        studyDays: sortedDays,
      };
    });

    onClose();
  };

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0;

  // Circle progress
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  const subjectTopics = subjects.find(s => s.name === selectedSubject)?.topics || [];

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="card bg-[var(--color-surface-0)] w-full max-w-md mx-4 p-6 relative animate-in">
        <button onClick={onClose} className="absolute top-4 right-4 btn-ghost p-1 rounded-full" aria-label="Close">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Study Timer</h2>

        {/* Timer display */}
        <div className="flex justify-center my-6">
          <div className="relative w-52 h-52 flex items-center justify-center">
            <svg className="timer-ring absolute inset-0" width="208" height="208" viewBox="0 0 208 208">
              <circle cx="104" cy="104" r={radius} fill="none" stroke="var(--color-surface-3)" strokeWidth="6" />
              <circle
                cx="104" cy="104" r={radius} fill="none"
                stroke="var(--color-primary-500)"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10">
              <p className="text-5xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                {isComplete ? 'Complete! 🎉' : isRunning ? 'Studying...' : 'Ready'}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-4">
          {!isComplete ? (
            <>
              {isRunning ? (
                <button onClick={handlePause} className="btn btn-secondary"><Pause size={16} /> Pause</button>
              ) : (
                <button onClick={handleStart} className="btn btn-primary"><Play size={16} /> {startTimeRef.current ? 'Resume' : 'Start'}</button>
              )}
              <button onClick={handleReset} className="btn btn-ghost"><RotateCcw size={16} /></button>
            </>
          ) : (
            <button onClick={saveSession} className="btn btn-primary"><Check size={16} /> Save Session</button>
          )}
        </div>

        {/* Presets */}
        {!isRunning && !isComplete && (
          <div className="mb-4">
            <div className="flex gap-2 justify-center flex-wrap">
              {presets.map(p => (
                <button
                  key={p.minutes}
                  onClick={() => selectPreset(p.minutes)}
                  className={`btn btn-sm ${totalSeconds === p.minutes * 60 ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 justify-center mt-2">
              <input
                type="number"
                placeholder="Custom min"
                value={customMin}
                onChange={e => setCustomMin(e.target.value)}
                className="w-28 text-center"
                min="1"
                max="240"
              />
              <button onClick={handleCustom} className="btn btn-secondary btn-sm">Set</button>
            </div>
          </div>
        )}

        {/* Session tagging */}
        {(isComplete || isRunning) && (
          <div className="space-y-3 border-t border-[var(--color-border)] pt-4">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)]">What did you study?</p>
            <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)}>
              <option value="">Select exam</option>
              <option value="GATE">GATE</option>
              <option value="CUET-PG">CUET-PG</option>
              <option value="GAT-B">GAT-B</option>
              <option value="General">General</option>
            </select>
            <select value={selectedSubject} onChange={e => { setSelectedSubject(e.target.value); setSelectedTopic(''); }}>
              <option value="">Select subject</option>
              {subjects.map(s => <option key={s.id} value={s.name}>{s.icon} {s.name}</option>)}
            </select>
            {selectedSubject && (
              <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
                <option value="">Select topic (optional)</option>
                {subjectTopics.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}
              </select>
            )}
          </div>
        )}

        {/* Today's total */}
        <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            Today: {(() => {
              const today = new Date().toISOString().split('T')[0];
              const todayMin = sessions.filter(s => s.startTime.startsWith(today)).reduce((sum, s) => sum + s.durationMinutes, 0);
              const h = Math.floor(todayMin / 60);
              const m = todayMin % 60;
              return `${h}h ${m}m`;
            })()}
          </p>
        </div>
      </div>
    </div>
  );
}
