// localStorage persistence utility for PadhLeKonu
// All user data is stored locally — no backend needed.

const STORAGE_PREFIX = 'padhlekonu_';

export function getStore<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function setStore<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function removeStore(key: string): void {
  localStorage.removeItem(STORAGE_PREFIX + key);
}

export function clearAllData(): void {
  const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX));
  keys.forEach(k => localStorage.removeItem(k));
}

export function exportAllData(): string {
  const data: Record<string, unknown> = {};
  Object.keys(localStorage)
    .filter(k => k.startsWith(STORAGE_PREFIX))
    .forEach(k => {
      try {
        data[k.replace(STORAGE_PREFIX, '')] = JSON.parse(localStorage.getItem(k)!);
      } catch {
        data[k.replace(STORAGE_PREFIX, '')] = localStorage.getItem(k);
      }
    });
  return JSON.stringify(data, null, 2);
}

export function importAllData(json: string): boolean {
  try {
    const data = JSON.parse(json) as Record<string, unknown>;
    Object.entries(data).forEach(([key, value]) => {
      setStore(key, value);
    });
    return true;
  } catch {
    return false;
  }
}
