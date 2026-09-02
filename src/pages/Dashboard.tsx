import { Link } from 'react-router-dom';
import { useGreeting, useLiveDate, usePersistedState } from '../hooks/usePersistedState';
import { exams, getExamCountdownDate, daysRemaining } from '../data/exams';
import { defaultSubjects } from '../data/subjects';
import { roadmapPhases, getCurrentPhase } from '../data/roadmap';
import type { Subject, DailyTask, StudySession, MockTest, StreakData, UserSettings } from '../types';
import {
  Timer, Plus, TrendingUp, BookOpen, Target, Calendar, CalendarCheck, Map,
  Heart, Flame, ChevronRight, Play, ClipboardList, AlertTriangle, Sparkles, CheckCircle, Clock, Crosshair, Star
} from 'lucide-react';
import { useState } from 'react';
import { useGamification, XP_PER_LEVEL } from '../hooks/useGamification';
import StudyTimer from '../components/StudyTimer';

const defaultSettings: UserSettings = {
  name: '', goal: 'M.Sc. Biotechnology 2027', targetDegree: 'M.Sc. Biotechnology',
  dailyStudyHoursTarget: 5, theme: 'system', startDate: '2026-09-02',
  targetGraduationYear: 2027, onboardingComplete: false,
  gateTarget: 70, cuetTarget: 250, gatbTarget: 210,
  weakSubjectIds: [],
  xp: 0, level: 1, unlockedRewards: [],
};

export default function Dashboard() {
  const greeting = useGreeting();
  const now = useLiveDate();
  const [settings] = usePersistedState<UserSettings>('settings', defaultSettings);
  const { xp, level } = useGamification();
  const [subjects] = usePersistedState<Subject[]>('subjects', defaultSubjects);
  const [sessions] = usePersistedState<StudySession[]>('sessions', []);
  const [mocks] = usePersistedState<MockTest[]>('mocks', []);
  const [streak] = usePersistedState<StreakData>('streak', { currentStreak: 0, bestStreak: 0, lastStudyDate: null, studyDays: [] });
  const [tasks] = usePersistedState<DailyTask[]>('tasks', []);
  const [showTimer, setShowTimer] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);

  // Calculate stats
  const todayStr = now.toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === todayStr);
  const todayCompleted = todayTasks.filter(t => t.completed).length;

  // Study hours today
  const todaySessions = sessions.filter(s => s.startTime.startsWith(todayStr));
  const todayMinutes = todaySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
  const todayHours = (todayMinutes / 60).toFixed(1);

  // Total study hours
  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Syllabus progress
  const totalTopics = subjects.reduce((sum, s) => sum + s.topics.length, 0);
  const completedFullTopics = subjects.reduce((sum, s) => sum + s.topics.filter(t => t.status === 'COMPLETED').length, 0);
  const completedHalfTopics = subjects.reduce((sum, s) => sum + s.topics.filter(t => t.status === 'IN_PROGRESS').length, 0);
  const progressScore = completedFullTopics + (completedHalfTopics * 0.5);
  const syllabusPercent = totalTopics > 0 ? Math.round((progressScore / totalTopics) * 100) : 0;

  // Total questions
  const totalQuestions = subjects.reduce((sum, s) => sum + s.topics.reduce((ts, t) => ts + t.questionsAttempted, 0), 0);
  const totalCorrect = subjects.reduce((sum, s) => sum + s.topics.reduce((ts, t) => ts + t.questionsCorrect, 0), 0);
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Weakest subjects (lowest completion or user selected)
  const subjectProgress = subjects.map(s => {
    const total = s.topics.length;
    const doneFull = s.topics.filter(t => t.status === 'COMPLETED').length;
    const doneHalf = s.topics.filter(t => t.status === 'IN_PROGRESS').length;
    const sScore = doneFull + (doneHalf * 0.5);
    return { id: s.id, name: s.name, icon: s.icon, percent: total > 0 ? Math.round((sScore / total) * 100) : 0, total, done: doneFull };
  });

  const weakest = settings.weakSubjectIds && settings.weakSubjectIds.length > 0
    ? subjectProgress.filter(s => settings.weakSubjectIds.includes(s.id))
    : subjectProgress.sort((a, b) => a.percent - b.percent).filter(s => s.percent < 100).slice(0, 4);

  // Current phase
  const currentPhase = getCurrentPhase(roadmapPhases);

  // Latest mock
  const latestMock = mocks.length > 0 ? mocks[mocks.length - 1] : null;

  // Motivation messages
  const motivationMessages = [
    "okay take a 5 minutes break ❤️",
    "i lovee you baby, keep going ✨",
    "krle oyee 💕",
    "kya re shani, padh chup chapp 😤",
    "imagine if i was with you----ye sb badme abhi padhai 🫣",
    "raipur se jana hai na baby krlo ✈️",
    "you are doing great 🌸"
  ];
  const randomMotivation = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];

  return (
    <div className="animate-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {greeting}{settings.name ? `, ${settings.name}` : ''} 👋
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {settings.goal || 'Your M.Sc. Journey'}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowTimer(true)} className="btn btn-primary btn-sm">
            <Play size={14} /> Start Timer
          </button>
          <Link to="/mocks" className="btn btn-secondary btn-sm">
            <ClipboardList size={14} /> Add Mock
          </Link>
          <Link to="/mistakes" className="btn btn-secondary btn-sm hidden sm:inline-flex">
            <AlertTriangle size={14} /> Log Mistake
          </Link>
        </div>
      </div>

      {/* Gamification Level Banner */}
      <div className="card-flat p-4 bg-gradient-to-r from-primary-50 to-pink-50 dark:from-primary-950/40 dark:to-pink-950/40 border-primary-100 dark:border-primary-900/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 p-1.5 rounded-full">
              <Star size={16} fill="currentColor" />
            </div>
            <span className="font-bold text-sm text-[var(--color-text-primary)]">Level {level}</span>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] font-medium">
            {xp % XP_PER_LEVEL} / {XP_PER_LEVEL} XP to next level
          </span>
        </div>
        <div className="progress-bar h-2 bg-white/50 dark:bg-black/20">
          <div 
            className="progress-bar-fill bg-gradient-to-r from-primary-400 to-pink-400" 
            style={{ width: `${((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100}%` }} 
          />
        </div>
      </div>

      {/* Exam Countdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {exams.map(exam => {
          const countdownDate = getExamCountdownDate(exam);
          const days = daysRemaining(countdownDate);
          const isExamTBA = !countdownDate;
          const isBTDateTBA = exam.id === 'gate-2027' && !exam.dates.btExamDate?.date;

          return (
            <Link to="/exams" key={exam.id} className="card countdown-card p-5 block" style={{ borderTopColor: exam.accentColor }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: exam.accentColor, borderRadius: '14px 14px 0 0' }} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">{exam.shortName}</span>
                <span className={`badge ${exam.status === 'OFFICIAL' ? 'badge-official' : exam.status === 'TBA' ? 'badge-tba' : 'badge-historical'}`}>
                  {exam.status === 'HISTORICAL_REFERENCE' ? 'REF' : exam.status}
                </span>
              </div>
              {isExamTBA ? (
                <div>
                  <p className="text-3xl font-bold text-[var(--color-text-muted)]">TBA</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Official date not announced</p>
                </div>
              ) : (
                <div>
                  <p className="text-4xl font-extrabold" style={{ color: exam.accentColor }}>
                    {days !== null && days >= 0 ? days : '—'}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    {days !== null && days >= 0 ? 'days remaining' : 'date passed'}
                    {isBTDateTBA && <span className="text-[var(--color-text-muted)]"> · BT date TBA</span>}
                  </p>
                  {exam.id === 'gate-2027' && (
                    <p className="text-[0.65rem] text-[var(--color-text-muted)] mt-2">
                      Exam window: 6–21 Feb 2027
                    </p>
                  )}
                </div>
              )}
              <p className="text-xs text-[var(--color-text-muted)] mt-2 truncate">{exam.name}</p>
            </Link>
          );
        })}
      </div>

      {/* Today's Plan + Current Phase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's tasks */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <CalendarCheck size={18} /> Today's Plan
            </h2>
            <Link to="/today" className="text-xs text-primary-500 font-semibold hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          {todayTasks.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-[var(--color-text-muted)]">No tasks for today yet.</p>
              <Link to="/today" className="btn btn-primary btn-sm mt-3">
                <Plus size={14} /> Plan Your Day
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {todayTasks.slice(0, 5).map(task => (
                <div key={task.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[var(--color-surface-2)] transition-colors">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={task.completed}
                    readOnly
                  />
                  <span className={`text-sm flex-1 ${task.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
              {todayTasks.length > 5 && (
                <p className="text-xs text-[var(--color-text-muted)] text-center">+{todayTasks.length - 5} more tasks</p>
              )}
              <div className="pt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span>{todayCompleted}/{todayTasks.length} completed</span>
                <div className="progress-bar w-24">
                  <div className="progress-bar-fill bg-[var(--color-success)]" style={{ width: `${todayTasks.length > 0 ? (todayCompleted / todayTasks.length) * 100 : 0}%` }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current phase */}
        <div className="card p-5">
          <h2 className="text-base font-bold text-[var(--color-text-primary)] flex items-center gap-2 mb-3">
            <Map size={18} /> Current Phase
          </h2>
          {currentPhase ? (
            <div>
              <p className="text-xs font-semibold text-primary-500 uppercase">{currentPhase.month}</p>
              <p className="text-sm font-bold text-[var(--color-text-primary)] mt-1">{currentPhase.title}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-2">{currentPhase.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {currentPhase.subjects.slice(0, 5).map((s, i) => (
                  <span key={i} className="badge badge-gate text-[0.65rem]">{s}</span>
                ))}
              </div>
              <Link to="/roadmap" className="text-xs text-primary-500 font-semibold hover:underline mt-3 flex items-center gap-1">
                View Roadmap <ChevronRight size={14} />
              </Link>
            </div>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">No active phase</p>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Syllabus', value: `${syllabusPercent}%`, icon: BookOpen, color: 'var(--color-primary-500)' },
          { label: 'Study Hours', value: totalHours, icon: Timer, color: 'var(--color-info)' },
          { label: 'Questions', value: totalQuestions.toString(), icon: Target, color: 'var(--color-gate)' },
          { label: 'Accuracy', value: totalQuestions > 0 ? `${accuracy}%` : '—', icon: TrendingUp, color: 'var(--color-success)' },
          { label: 'Streak', value: `${streak.currentStreak} days`, icon: Flame, color: 'var(--color-warning)' },
        ].map((stat, i) => (
          <div key={i} className="card-flat p-4 text-center">
            <stat.icon size={18} className="mx-auto mb-1" style={{ color: stat.color }} />
            <p className="text-xl font-bold text-[var(--color-text-primary)]">{stat.value}</p>
            <p className="text-[0.65rem] text-[var(--color-text-muted)] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weak Subjects + Deadlines + Mock */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Areas to Nurture */}
        <div className="card p-5">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
            <Heart size={16} className="text-[var(--color-danger)]" /> Areas to Nurture
          </h3>
          {weakest.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)]">All subjects are thriving! 🌸</p>
          ) : (
            <div className="space-y-3">
              {weakest.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-primary)]">{s.icon} {s.name}</span>
                    <span className="text-[var(--color-text-muted)] text-xs">{s.percent}%</span>
                  </div>
                  <div className="progress-bar mt-1">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${s.percent}%`,
                        background: s.percent < 30 ? 'var(--color-danger)' : s.percent < 60 ? 'var(--color-warning)' : 'var(--color-success)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/subjects" className="text-xs text-primary-500 font-semibold hover:underline mt-3 flex items-center gap-1">
            All Subjects <ChevronRight size={14} />
          </Link>
        </div>

        {/* Upcoming deadlines */}
        <div className="card p-5">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
            <Calendar size={16} className="text-[var(--color-danger)]" /> Upcoming Deadlines
          </h3>
          <div className="space-y-3">
            {exams.flatMap(exam =>
              Object.entries(exam.dates)
                .filter(([, d]) => d.date && daysRemaining(d.date)! > 0 && daysRemaining(d.date)! <= 60)
                .map(([key, d]) => ({ ...d, exam: exam.shortName, key, accentColor: exam.accentColor }))
            )
            .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
            .slice(0, 4)
            .map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-primary)]">{d.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{d.exam} · {new Date(d.date!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <span className="badge" style={{ background: `${d.accentColor}20`, color: d.accentColor }}>
                  {daysRemaining(d.date)} days
                </span>
              </div>
            ))}
            {exams.flatMap(e => Object.values(e.dates)).filter(d => d.date && daysRemaining(d.date)! > 0 && daysRemaining(d.date)! <= 60).length === 0 && (
              <p className="text-sm text-[var(--color-text-muted)]">No imminent deadlines</p>
            )}
          </div>
          <Link to="/deadlines" className="text-xs text-primary-500 font-semibold hover:underline mt-3 flex items-center gap-1">
            All Deadlines <ChevronRight size={14} />
          </Link>
        </div>

        {/* Latest mock */}
        <div className="card p-5">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
            <ClipboardList size={16} className="text-primary-500" /> Recent Mock
          </h3>
          {latestMock ? (
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">{latestMock.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{latestMock.exam} · {new Date(latestMock.date).toLocaleDateString('en-IN')}</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-3xl font-bold text-primary-500">{latestMock.score}</span>
                <span className="text-sm text-[var(--color-text-muted)]">/ {latestMock.maxMarks}</span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Accuracy: {latestMock.attempted > 0 ? Math.round((latestMock.correct / latestMock.attempted) * 100) : 0}%
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-[var(--color-text-muted)]">No mocks yet.</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Your first mock will appear here.</p>
              <Link to="/mocks" className="btn btn-primary btn-sm mt-3">
                <Plus size={14} /> Add Mock
              </Link>
            </div>
          )}
          <Link to="/mocks" className="text-xs text-primary-500 font-semibold hover:underline mt-3 flex items-center gap-1">
            All Mocks <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Motivation */}
      <div
        className="card p-5 cursor-pointer hover:border-pink-300 transition-colors text-center"
        onClick={() => setShowMotivation(!showMotivation)}
      >
        <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <Heart size={16} className="text-pink-400 animate-pulse-subtle" />
          <span>Message from Anshu 💕</span>
        </div>
        {showMotivation && (
          <div className="mt-4 animate-in">
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {randomMotivation}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">— Anshu</p>
          </div>
        )}
      </div>

      {/* Study Timer Modal */}
      {showTimer && <StudyTimer onClose={() => setShowTimer(false)} />}
    </div>
  );
}

