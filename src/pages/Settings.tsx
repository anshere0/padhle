import { usePersistedState } from '../hooks/usePersistedState';
import { useTheme } from '../hooks/usePersistedState';
import { clearAllData, exportAllData, importAllData } from '../lib/store';
import type { UserSettings } from '../types';
import { defaultSubjects } from '../data/subjects';
import { Settings as SettingsIcon, Download, Upload, Trash2, Sun, Moon, Monitor, AlertTriangle } from 'lucide-react';
import { useState, useRef } from 'react';

const defaultSettings: UserSettings = {
  name: '', goal: 'M.Sc. Biotechnology 2027', targetDegree: 'M.Sc. Biotechnology',
  dailyStudyHoursTarget: 5, theme: 'system', startDate: '2026-09-02',
  targetGraduationYear: 2027, onboardingComplete: false,
  gateTarget: 70, cuetTarget: 250, gatbTarget: 210,
  weakSubjectIds: [],
};

export default function SettingsPage() {
  const [settings, setSettings] = usePersistedState<UserSettings>('settings', defaultSettings);
  const { theme, setTheme } = useTheme();
  const [showReset, setShowReset] = useState(false);
  const [importStatus, setImportStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `padhlekonu-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const json = ev.target?.result as string;
      if (importAllData(json)) {
        setImportStatus('✅ Progress imported successfully! Refresh the page to see changes.');
      } else {
        setImportStatus('❌ Import failed. Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    clearAllData();
    window.location.reload();
  };

  return (
    <div className="animate-in space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <SettingsIcon size={24} /> Settings
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Personalize your study tracker</p>
      </div>

      {/* Profile */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1">Your Name</label>
            <input type="text" value={settings.name} onChange={e => updateSetting('name', e.target.value)} placeholder="Enter your name" />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1">Goal</label>
            <input type="text" value={settings.goal} onChange={e => updateSetting('goal', e.target.value)} placeholder="e.g. M.Sc. Biotechnology 2027" />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1">Daily Study Hours Target</label>
            <input type="number" min="1" max="16" value={settings.dailyStudyHoursTarget} onChange={e => updateSetting('dailyStudyHoursTarget', parseInt(e.target.value) || 5)} />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1">Target Graduation Year</label>
            <input type="number" min="2026" max="2030" value={settings.targetGraduationYear} onChange={e => updateSetting('targetGraduationYear', parseInt(e.target.value) || 2027)} />
          </div>
        </div>
      </div>

      {/* Target Scores */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">Preparation Targets</h2>
        <p className="text-[0.65rem] text-[var(--color-text-muted)] mb-4">Personal preparation goals — NOT official cutoffs</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1">GATE Target (/ 100)</label>
            <input type="number" min="0" max="100" value={settings.gateTarget} onChange={e => updateSetting('gateTarget', parseInt(e.target.value) || 0)} />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1">CUET-PG Target (/ 300)</label>
            <input type="number" min="0" max="300" value={settings.cuetTarget} onChange={e => updateSetting('cuetTarget', parseInt(e.target.value) || 0)} />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1">GAT-B Target (/ 240)</label>
            <input type="number" min="0" max="240" value={settings.gatbTarget} onChange={e => updateSetting('gatbTarget', parseInt(e.target.value) || 0)} />
          </div>
        </div>
      </div>

      {/* Weakest Subjects Override */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] mb-1 flex items-center gap-2">
          <AlertTriangle size={16} className="text-[var(--color-warning)]" /> Weakest Subjects Focus
        </h2>
        <p className="text-[0.65rem] text-[var(--color-text-muted)] mb-4">
          Select specific subjects to always show in the Dashboard's "Weakest Areas" section. Leave empty to auto-detect based on completion %.
        </p>
        <div className="flex flex-wrap gap-2">
          {defaultSubjects.map(s => {
            const isSelected = settings.weakSubjectIds?.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => {
                  const current = settings.weakSubjectIds || [];
                  const next = isSelected ? current.filter(id => id !== s.id) : [...current, s.id];
                  updateSetting('weakSubjectIds', next);
                }}
                className={`badge cursor-pointer transition-colors ${isSelected ? 'badge-primary' : 'badge-tba'}`}
              >
                {s.icon} {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Theme */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] mb-4">Appearance</h2>
        <div className="flex gap-3">
          {[
            { value: 'light' as const, icon: Sun, label: 'Light' },
            { value: 'dark' as const, icon: Moon, label: 'Dark' },
            { value: 'system' as const, icon: Monitor, label: 'System' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={`flex-1 card-flat p-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                theme === opt.value ? 'border-primary-400 ring-1 ring-primary-200' : ''
              }`}
            >
              <opt.icon size={20} className={theme === opt.value ? 'text-primary-500' : 'text-[var(--color-text-muted)]'} />
              <span className="text-xs font-medium text-[var(--color-text-primary)]">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Data */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] mb-4">Data Management</h2>
        <div className="space-y-3">
          <button onClick={handleExport} className="btn btn-secondary w-full">
            <Download size={16} /> Export My Progress (JSON)
          </button>
          <div>
            <button onClick={() => fileInputRef.current?.click()} className="btn btn-secondary w-full">
              <Upload size={16} /> Import Progress
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          </div>
          {importStatus && <p className="text-xs text-center">{importStatus}</p>}
        </div>
      </div>

      {/* Reset */}
      <div className="card p-5 border-red-200 dark:border-red-900">
        <h2 className="text-sm font-bold text-[var(--color-danger)] mb-2">Danger Zone</h2>
        <p className="text-xs text-[var(--color-text-muted)] mb-3">This will permanently delete all your study progress, tasks, mocks, mistakes, and settings.</p>
        {!showReset ? (
          <button onClick={() => setShowReset(true)} className="btn btn-danger btn-sm">
            <Trash2 size={14} /> Reset All Progress
          </button>
        ) : (
          <div className="card-flat p-3 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
            <p className="text-sm font-bold text-[var(--color-danger)] mb-3">Are you absolutely sure?</p>
            <div className="flex gap-2">
              <button onClick={handleReset} className="btn btn-danger btn-sm">Yes, Reset Everything</button>
              <button onClick={() => setShowReset(false)} className="btn btn-secondary btn-sm">Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation links for mobile "More" */}
      <div className="card p-5 lg:hidden">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">All Pages</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { path: '/pyqs', label: 'PYQs' },
            { path: '/mocks', label: 'Mocks' },
            { path: '/mistakes', label: 'Mistakes' },
            { path: '/revision', label: 'Revision' },
            { path: '/exams', label: 'Exams' },
            { path: '/colleges', label: 'Colleges' },
            { path: '/deadlines', label: 'Deadlines' },
          ].map(item => (
            <a key={item.path} href={item.path} className="card-flat p-3 text-center text-xs font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
