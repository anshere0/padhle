import { useState } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import type { DailyTask } from '../types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, X, Check } from 'lucide-react';

export default function Calendar() {
  const [tasks, setTasks] = usePersistedState<DailyTask[]>('tasks', []);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [newTask, setNewTask] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: DailyTask = {
      id: Date.now().toString(),
      date: selectedDate,
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

  // Generate calendar grid
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-transparent" />);
  }
  
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayTasks = tasks.filter(t => t.date === dateStr);
    const isToday = dateStr === todayStr;
    const isSelected = dateStr === selectedDate;
    
    days.push(
      <div 
        key={d} 
        onClick={() => setSelectedDate(dateStr)}
        className={`h-24 p-2 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
          isSelected 
            ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-400/20 shadow-sm' 
            : 'border-[var(--color-border)] bg-[var(--color-surface-0)] hover:border-primary-300'
        }`}
      >
        <div className="flex justify-between items-center">
          <span className={`text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
            isToday ? 'bg-primary-500 text-white' : 'text-[var(--color-text-primary)]'
          }`}>
            {d}
          </span>
          {dayTasks.length > 0 && (
            <span className="text-[0.6rem] badge badge-primary px-1.5 py-0.5">
              {dayTasks.filter(t=>t.completed).length}/{dayTasks.length}
            </span>
          )}
        </div>
        <div className="flex-1 overflow-hidden mt-1 space-y-1">
          {dayTasks.slice(0, 3).map(t => (
            <div key={t.id} className={`text-[0.65rem] truncate px-1 rounded ${t.completed ? 'line-through text-[var(--color-text-muted)] bg-[var(--color-surface-2)]' : 'text-[var(--color-text-secondary)] bg-primary-100/50 dark:bg-primary-900/30'}`}>
              {t.text}
            </div>
          ))}
          {dayTasks.length > 3 && <div className="text-[0.6rem] text-[var(--color-text-muted)] pl-1">+{dayTasks.length - 3} more</div>}
        </div>
      </div>
    );
  }

  const selectedTasks = tasks.filter(t => t.date === selectedDate);
  const selectedDateObj = new Date(selectedDate);

  return (
    <div className="animate-in grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
      
      {/* Calendar Grid */}
      <div className="xl:col-span-3 card p-6 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <CalendarIcon className="text-primary-500" /> Study Planner
          </h1>
          <div className="flex items-center gap-4 bg-[var(--color-surface-2)] rounded-full px-4 py-1">
            <button onClick={prevMonth} className="p-1 hover:text-primary-500 transition-colors text-[var(--color-text-secondary)]"><ChevronLeft size={20} /></button>
            <span className="font-semibold text-sm min-w-[120px] text-center text-[var(--color-text-primary)]">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={nextMonth} className="p-1 hover:text-primary-500 transition-colors text-[var(--color-text-secondary)]"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-[var(--color-text-muted)]">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2 flex-1 overflow-y-auto pr-2 pb-4">
          {days}
        </div>
      </div>

      {/* Side Panel for Selected Date */}
      <div className="card-flat p-5 flex flex-col">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
          {selectedDateObj.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}
        </h2>
        <p className="text-xs text-[var(--color-text-muted)] mb-6">
          {selectedDate === todayStr ? 'Today' : 'Scheduled Tasks'}
        </p>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="input text-sm flex-1"
            placeholder="Add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} className="btn btn-primary px-3 rounded-xl"><Plus size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {selectedTasks.length === 0 ? (
            <div className="text-center py-10 text-[var(--color-text-muted)] text-sm">
              <CalendarIcon size={32} className="mx-auto mb-2 opacity-20" />
              <p>No tasks scheduled.</p>
              <p className="text-xs mt-1">Free day! 🌸</p>
            </div>
          ) : (
            selectedTasks.map(t => (
              <div key={t.id} className="card p-3 flex items-start gap-3 group">
                <button
                  onClick={() => toggleTask(t.id)}
                  className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    t.completed ? 'bg-primary-500 border-primary-500 text-white' : 'border-[var(--color-border-hover)] text-transparent hover:border-primary-300'
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </button>
                <span className={`text-sm flex-1 ${t.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>
                  {t.text}
                </span>
                <button onClick={() => deleteTask(t.id)} className="text-[var(--color-text-muted)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
