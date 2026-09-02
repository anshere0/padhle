import { useState, useEffect } from 'react';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { useGamification, REWARDS_POOL } from '../hooks/useGamification';

export default function RewardModal() {
  const { unlockReward, level } = useGamification();
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Check local storage for pending level up
    const checkLevelUp = () => {
      if (localStorage.getItem('pendingLevelUp') === 'true') {
        localStorage.removeItem('pendingLevelUp');
        // Shuffle and pick 3 random rewards
        const shuffled = [...REWARDS_POOL].sort(() => 0.5 - Math.random());
        setCards(shuffled.slice(0, 3));
        setSelectedCard(null);
        setRevealed(false);
        setIsOpen(true);
      }
    };
    
    // Initial check
    checkLevelUp();
    
    // Listen for custom event
    window.addEventListener('gamification_update', checkLevelUp);
    return () => window.removeEventListener('gamification_update', checkLevelUp);
  }, []);

  if (!isOpen) return null;

  const handlePick = (index: number) => {
    if (revealed) return;
    setSelectedCard(index);
    setRevealed(true);
    
    // After revealing, wait a bit then close and save
    setTimeout(() => {
      unlockReward(cards[index]);
      setIsOpen(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in">
      <div className="bg-[var(--color-surface-0)] max-w-lg w-full rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border border-[var(--color-border)] p-8 text-center relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-4 animate-bounce">
            <Sparkles size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Level Up! (Level {level})</h2>
          <p className="text-[var(--color-text-secondary)] mt-2">
            {revealed 
              ? "You unlocked a special reward from Anshu 💕" 
              : "Pick a card to reveal your reward!"}
          </p>
        </div>

        <div className="flex gap-4 justify-center items-center">
          {cards.map((card, i) => (
            <button
              key={i}
              onClick={() => handlePick(i)}
              className={`relative w-28 h-40 rounded-xl transition-all duration-700 preserve-3d cursor-pointer shadow-md ${
                revealed && selectedCard !== i ? 'opacity-30 scale-95' : 'hover:-translate-y-2 hover:shadow-lg'
              } ${revealed && selectedCard === i ? 'rotate-y-180 scale-110 z-10' : ''}`}
              disabled={revealed}
            >
              {/* Card Back */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white border-2 border-white/20">
                <Gift size={32} />
              </div>
              
              {/* Card Front */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-surface-2 rounded-xl flex flex-col items-center justify-center p-3 text-center border-2 border-primary-400 shadow-xl">
                <Heart className="text-pink-400 mb-2" size={24} />
                <span className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                  {card}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        {revealed && (
          <p className="mt-8 text-sm text-pink-500 font-medium animate-pulse">
            Claim this reward whenever you want!
          </p>
        )}
      </div>
    </div>
  );
}
