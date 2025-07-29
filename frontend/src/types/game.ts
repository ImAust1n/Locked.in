// Game mood types
export type MoodType = 'neutral' | 'happy' | 'sad' | 'angry' | 'sleepy' | 'love';

// Emoji food structure
export interface EmojiFood {
  emoji: string;
  resultMood: MoodType;
}

// Falling emoji structure
export interface FallingEmojiType {
  id: number;
  emoji: string;
  speed: number;
  position: {
    x: number;
    y: number;
  };
}
