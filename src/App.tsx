import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from './hooks/usePersistedState';
import {
  LayoutDashboard, CalendarCheck, Map, BookOpen, FileQuestion,
  ClipboardList, AlertTriangle, RotateCcw, GraduationCap,
  Building2, Calendar, Settings, Menu, X,
  ChevronRight, Sun, Moon, Monitor
} from 'lucide-react';

// Lazy page imports will be replaced with real pages
import Dashboard from './pages/Dashboard';
import Today from './pages/Today';
import CalendarPage from './pages/Calendar';
import Roadmap from './pages/Roadmap';
import Subjects from './pages/Subjects';
import SubjectDetail from './pages/SubjectDetail';
import PYQs from './pages/PYQs';
import Mocks from './pages/Mocks';
import Mistakes from './pages/Mistakes';
import Revision from './pages/Revision';
import Exams from './pages/Exams';
import Colleges from './pages/Colleges';
import Deadlines from './pages/Deadlines';
import SettingsPage from './pages/Settings';
import RewardModal from './components/RewardModal';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/today', label: 'Today', icon: CalendarCheck },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/subjects', label: 'Subjects', icon: BookOpen },
  { path: '/pyqs', label: 'PYQs', icon: FileQuestion },
  { path: '/mocks', label: 'Mocks', icon: ClipboardList },
  { path: '/mistakes', label: 'Mistakes', icon: AlertTriangle },
  { path: '/revision', label: 'Revision', icon: RotateCcw },
  { path: '/exams', label: 'Exams', icon: GraduationCap },
  { path: '/colleges', label: 'Colleges', icon: Building2 },
  { path: '/deadlines', label: 'Deadlines', icon: Calendar },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const mobileNavItems = [
  { path: '/', label: 'Home', icon: LayoutDashboard },
  { path: '/today', label: 'Today', icon: CalendarCheck },
  { path: '/subjects', label: 'Subjects', icon: BookOpen },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
  return (
    <button
      onClick={() => setTheme(next)}
      className="btn-ghost btn-sm rounded-full p-2"
      title={`Theme: ${theme}`}
      aria-label={`Switch theme (current: ${theme})`}
    >
      <Icon size={18} />
    </button>
  );
}

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50
          w-[var(--sidebar-width)] bg-[var(--color-surface-0)]
          border-r border-[var(--color-border)]
          flex flex-col
          transition-transform duration-200
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="p-5 flex items-center justify-between border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <div>
              <h1 className="text-base font-bold text-[var(--color-text-primary)]">PadhLeKonu</h1>
              <p className="text-[0.65rem] text-[var(--color-text-muted)]">M.Sc. Biotechnology 2027</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden btn-ghost p-1 rounded-md" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {location.pathname === item.path && (
                <ChevronRight size={14} className="ml-auto opacity-50" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-[var(--color-border)] flex items-center justify-between">
          <ThemeToggle />
          <span className="text-[0.65rem] text-[var(--color-text-muted)]">v1.0</span>
        </div>
      </aside>
    </>
  );
}

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--color-surface-0)] border-t border-[var(--color-border)] z-40 lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `bottom-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `bottom-nav-link ${isActive ? 'active' : ''}`
          }
        >
          <Menu size={20} />
          <span>More</span>
        </NavLink>
      </div>
    </nav>
  );
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-surface-1)]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[var(--color-surface-0)] border-b border-[var(--color-border)] px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="btn-ghost p-1 rounded-md" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xs">
            P
          </div>
          <span className="font-bold text-sm text-[var(--color-text-primary)]">PadhLeKonu</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main content */}
      <main className="lg:ml-[var(--sidebar-width)] pt-14 lg:pt-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:id" element={<SubjectDetail />} />
            <Route path="/pyqs" element={<PYQs />} />
            <Route path="/mocks" element={<Mocks />} />
            <Route path="/mistakes" element={<Mistakes />} />
            <Route path="/revision" element={<Revision />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/deadlines" element={<Deadlines />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>

      <MobileBottomNav />
      <RewardModal />
    </div>
  );
}

export default function App() {
  // Initialize theme on mount
  useTheme();

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
