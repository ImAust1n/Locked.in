import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

// Define types directly to avoid import issues
type MoodType = 'neutral' | 'happy' | 'sad' | 'angry' | 'sleepy' | 'love';

interface EmojiFood {
  emoji: string;
  resultMood: MoodType;
}

// Map of emoji to resulting mood
const emojiEffects: Record<string, EmojiFood> = {
  '🍩': { emoji: '🍩', resultMood: 'happy' },
  '🍦': { emoji: '🍦', resultMood: 'happy' },
  '🍪': { emoji: '🍪', resultMood: 'happy' },
  '🌶️': { emoji: '🌶️', resultMood: 'angry' },
  '💢': { emoji: '💢', resultMood: 'angry' },
  '⚡': { emoji: '⚡', resultMood: 'angry' },
  '💤': { emoji: '💤', resultMood: 'sleepy' },
  '🛏️': { emoji: '🛏️', resultMood: 'sleepy' },
  '📚': { emoji: '📚', resultMood: 'sleepy' },
  '💌': { emoji: '💌', resultMood: 'love' },
  '❤️': { emoji: '❤️', resultMood: 'love' },
  '🌹': { emoji: '🌹', resultMood: 'love' },
  '🧅': { emoji: '🧅', resultMood: 'sad' },
  '☔': { emoji: '☔', resultMood: 'sad' },
  '😢': { emoji: '😢', resultMood: 'sad' },
};

// Available emojis for the game
const availableEmojis = Object.keys(emojiEffects);

// Trigger confetti
const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

export const useGameLogic = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [mood, setMood] = useState<MoodType>('neutral');
  const [moodHistory, setMoodHistory] = useState<MoodType[]>([]);
  const [fallingEmojis, setFallingEmojis] = useState<Array<{ id: number; emoji: string; speed: number; position: { x: number, y: number } }>>([]);
  const [draggedEmoji, setDraggedEmoji] = useState<string | null>(null);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('moodmunch-high-score') || '0', 10);
  });
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(1);
  
  // Start the game
  const startGame = useCallback(() => {
    setIsGameActive(true);
    setScore(0);
    setLives(3);
    setLevel(1);
    setPreviousLevel(1);
    setMood('neutral');
    setMoodHistory([]);
    setFallingEmojis([]);
    setIsNewHighScore(false);
    setIsLevelUp(false);
    toast.success("Game started! Feed Munchi!");
  }, []);

  // End the game
  const endGame = useCallback(() => {
    setIsGameActive(false);
    
    // Check if we have a new high score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('moodmunch-high-score', score.toString());
      setIsNewHighScore(true);
      triggerConfetti();
      toast.success(`New High Score: ${score}!`, {
        duration: 5000,
        style: { backgroundColor: '#000', border: '1px solid #39FF14', color: '#39FF14' }
      });
    } else {
      toast.error(`Game over! Final score: ${score}`);
    }
  }, [score, highScore]);

  // Handle feeding Munchi with an emoji
  const feedMunchi = useCallback((emoji: string) => {
    const food = emojiEffects[emoji];
    
    if (food) {
      setMood(food.resultMood);
      setScore(prevScore => prevScore + 10);
      setMoodHistory(prev => [...prev, food.resultMood]);
      
      // Show feedback
      toast.success(`Munchi reacts: ${food.resultMood}!`, { 
        duration: 1500,
        style: { backgroundColor: '#000', border: '1px solid #39FF14', color: '#fff' },
        position: 'top-center'
      });
      
      // Level up every 50 points
      if ((score + 10) % 50 === 0) {
        const newLevel = Math.floor((score + 10) / 50) + 1;
        setLevel(newLevel);
        setPreviousLevel(level);
        setIsLevelUp(true);
        
        // Trigger level up confetti
        triggerConfetti();
        
        toast.info(`Level up! ${newLevel}`, {
          duration: 2000,
          style: { backgroundColor: '#000', border: '1px solid #39FF14', color: '#39FF14' }
        });
        
        // Reset level up flag after 3 seconds
        setTimeout(() => {
          setIsLevelUp(false);
        }, 3000);
      }
      
      // Check for new high score
      if ((score + 10) > highScore && !isNewHighScore) {
        setIsNewHighScore(true);
        
        // Reset high score flag after 3 seconds
        setTimeout(() => {
          setIsNewHighScore(false);
        }, 3000);
      }
    }
  }, [score, level, highScore, isNewHighScore]);
  
  // Spawn a new falling emoji
  const spawnEmoji = useCallback(() => {
    if (!isGameActive) return;
    
    // Random emoji
    const randomEmoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
    // Random x position (5-95% of screen width)
    const randomX = 5 + Math.random() * 90;
    // Speed decreases with level (faster animation)
    // Level 1: 5-7 seconds, Level 10: 1-3 seconds
    const speed = Math.max(5 - (level * 0.4) + (Math.random() * 2), 1);
    
    // Create new emoji with unique ID
    const newEmoji = {
      id: Date.now() + Math.floor(Math.random() * 1000), // Ensure unique ID
      emoji: randomEmoji,
      speed: speed, // Animation duration in seconds
      position: { x: randomX, y: 0 } // Start at top with random x position
    };
    
    // Add to falling emojis array
    setFallingEmojis(prev => [...prev, newEmoji]);
    
    // Debug log
    console.log(`Spawned emoji ${randomEmoji} with speed ${speed}s at position ${randomX}%`);
  }, [isGameActive, level]);

  // Game tick - spawn emojis at intervals
  useEffect(() => {
    if (!isGameActive) return;

    // Spawn rate gets faster with level
    const spawnRate = Math.max(2000 - (level * 150), 500);
    const intervalId = setInterval(spawnEmoji, spawnRate);
    
    return () => clearInterval(intervalId);
  }, [isGameActive, level, spawnEmoji]);

  // Handle emoji miss
  const missEmoji = useCallback(() => {
    setLives(prev => prev - 1);
    toast.error("Missed an emoji!", { duration: 1000 });
    
    if (lives <= 1) {
      endGame();
    }
  }, [lives, endGame]);

  // Handle drag start
  const handleDragStart = useCallback((emoji: string) => {
    setDraggedEmoji(emoji);
  }, []);

  // Handle drop on Munchi
  const handleDrop = useCallback((emoji: string) => {
    setDraggedEmoji(null);
    feedMunchi(emoji);
    
    // Remove the dropped emoji from falling emojis
    setFallingEmojis(prev => 
      prev.filter(e => !(e.emoji === emoji))
    );
  }, [feedMunchi]);
  
  // Remove emoji when it falls off screen - update this to accept a string parameter
  const removeEmoji = useCallback((emoji: string) => {
    setFallingEmojis(prev => prev.filter(e => e.emoji !== emoji));
    missEmoji();
  }, [missEmoji]);
  
  return {
    isGameActive,
    score,
    lives,
    level,
    mood,
    moodHistory,
    fallingEmojis,
    draggedEmoji,
    highScore,
    isNewHighScore,
    isLevelUp,
    startGame,
    endGame,
    feedMunchi,
    handleDragStart,
    handleDrop,
    removeEmoji
  };
};
