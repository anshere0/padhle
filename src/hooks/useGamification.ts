import { usePersistedState } from './usePersistedState';
import type { UserSettings } from '../types';

export const XP_PER_LEVEL = 100;

export const REWARDS_POOL = [
  "Movie date night 🍿",
  "Game night 🎮",
  "I will order your favourite food 🍕",
  "30-min Virtual Date 💻",
  "You pick the show tonight 📺",
  "Sleep call tonight 🌙",
  "A sweet hand-written letter 💌",
  "Coffee/Tea treat from me ☕"
];

export function useGamification() {
  // We use a custom local storage event or just read from persisted state
  const [settings, setSettings] = usePersistedState<UserSettings>('settings', null as any);
  
  // Note: we can't easily trigger modals from a hook globally unless we put it in context.
  // Instead, we will handle the level up trigger directly inside the AppLayout or a provider.
  // For simplicity, we just provide the addXP function.
  
  const addXP = (amount: number) => {
    setSettings((prev) => {
      // If settings don't exist yet, initialize a basic object with gamification defaults
      const currentState = prev || { 
        name: '', goal: 'M.Sc. Biotechnology 2027', targetDegree: 'M.Sc. Biotechnology',
        dailyStudyHoursTarget: 5, theme: 'system', startDate: new Date().toISOString().split('T')[0],
        targetGraduationYear: 2027, onboardingComplete: false,
        gateTarget: 70, cuetTarget: 250, gatbTarget: 210,
        weakSubjectIds: [],
        xp: 0, level: 1, unlockedRewards: []
      };

      const currentXp = currentState.xp || 0;
      const currentLevel = currentState.level || 1;
      
      const newXp = Math.max(0, currentXp + amount);
      const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
      
      if (newLevel > currentLevel) {
        localStorage.setItem('pendingLevelUp', 'true');
        window.dispatchEvent(new Event('gamification_update'));
      }
      
      return { ...currentState, xp: newXp, level: newLevel };
    });
  };

  const unlockReward = (rewardText: string) => {
    setSettings(prev => {
      const currentState = prev || { 
        name: '', goal: 'M.Sc. Biotechnology 2027', targetDegree: 'M.Sc. Biotechnology',
        dailyStudyHoursTarget: 5, theme: 'system', startDate: new Date().toISOString().split('T')[0],
        targetGraduationYear: 2027, onboardingComplete: false,
        gateTarget: 70, cuetTarget: 250, gatbTarget: 210,
        weakSubjectIds: [],
        xp: 0, level: 1, unlockedRewards: []
      };
      return {
        ...currentState,
        unlockedRewards: [
          ...(currentState.unlockedRewards || []),
          { id: Date.now().toString(), reward: rewardText, date: new Date().toISOString() }
        ]
      };
    });
  };

  return {
    xp: settings?.xp || 0,
    level: settings?.level || 1,
    unlockedRewards: settings?.unlockedRewards || [],
    addXP,
    unlockReward
  };
}
