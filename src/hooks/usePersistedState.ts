import { useState, useCallback, useEffect } from 'react';
import { getStore, setStore } from '../lib/store';

/**
 * Custom hook for persisted state in localStorage.
 * Works like useState but automatically persists to localStorage.
 */
export function usePersistedState<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => getStore(key, defaultValue));

  const setPersistedState = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
        setStore(key, next);
        return next;
      });
    },
    [key]
  );

  return [state, setPersistedState];
}

/**
 * Hook for theme management
 */
export function useTheme() {
  const [theme, setTheme] = usePersistedState<'light' | 'dark' | 'system'>('theme', 'system');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Listen for system changes
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return { theme, setTheme };
}

/**
 * Hook for greeting based on time of day
 */
export function useGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

/**
 * Hook for live time (updates every minute for countdowns)
 */
export function useLiveDate(): Date {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
