import { useState } from 'react';
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
      if (!prev) return prev;
      const currentXp = prev.xp || 0;
      const currentLevel = prev.level || 1;
      
      const newXp = currentXp + amount;
      const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
      
      // We flag that a level up happened by saving it to local storage. 
      // The RewardModal component will listen to this.
      if (newLevel > currentLevel) {
        localStorage.setItem('pendingLevelUp', 'true');
        window.dispatchEvent(new Event('gamification_update'));
      }
      
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const unlockReward = (rewardText: string) => {
    setSettings(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        unlockedRewards: [
          ...(prev.unlockedRewards || []),
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
