import { useState } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import type { DailyTask } from '../types';
import { Plus, Trash2, CalendarCheck, Sparkles } from 'lucide-react';
import StudyTimer from '../components/StudyTimer';

export default function Today() {
  const today = new Date().toISOString().split('T')[0];
  const [tasks, setTasks] = usePersistedState<DailyTask[]>('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [showTimer, setShowTimer] = useState(false);

  const todayTasks = tasks.filter(t => t.date === today);
  const completed = todayTasks.filter(t => t.completed).length;

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: DailyTask = {
      id: Date.now().toString(),
      date: today,
      text: newTask.trim(),
      completed: false,
    };
    setTasks(prev => [...prev, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="animate-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <CalendarCheck size={24} /> Today's Plan
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button onClick={() => setShowTimer(true)} className="btn btn-primary btn-sm">
          Start Timer
        </button>
      </div>

      {/* Progress */}
      {todayTasks.length > 0 && (
        <div className="card p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[var(--color-text-secondary)]">Progress</span>
              <span className="font-semibold text-[var(--color-text-primary)]">{completed}/{todayTasks.length}</span>
            </div>
            <div className="progress-bar h-2">
              <div className="progress-bar-fill bg-[var(--color-success)]" style={{ width: `${(completed / todayTasks.length) * 100}%` }} />
            </div>
          </div>
          {completed === todayTasks.length && todayTasks.length > 0 && (
            <span className="text-2xl">🎉</span>
          )}
        </div>
      )}

      {/* Add task */}
      <div className="card p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a task for today..."
            className="flex-1"
          />
          <button onClick={addTask} className="btn btn-primary btn-sm">
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {['📖 Study Molecular Biology', '📝 40 PYQs', '🔄 Revise yesterday', '📐 GATE Mathematics', '🧪 Biochemistry'].map(suggestion => (
            <button
              key={suggestion}
              onClick={() => { setNewTask(suggestion); }}
              className="text-[0.65rem] px-2 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-3)] transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks list */}
      <div className="space-y-2">
        {todayTasks.length === 0 ? (
          <div className="card p-8 text-center">
            <Sparkles size={32} className="mx-auto text-[var(--color-text-muted)] mb-3" />
            <p className="text-sm text-[var(--color-text-muted)]">No tasks yet. Plan your study day above!</p>
          </div>
        ) : (
          todayTasks.map(task => (
            <div
              key={task.id}
              className="card p-4 flex items-center gap-3 group"
            >
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
              />
              <span className={`flex-1 text-sm ${task.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn-ghost p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text-muted)]"
                aria-label={`Delete "${task.text}"`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {showTimer && <StudyTimer onClose={() => setShowTimer(false)} />}
    </div>
  );
}
