
import { useEffect, useRef } from 'react';

interface FallingEmojiProps {
  id: number;
  emoji: string;
  speed: number;
  position: { x: number, y: number };
  onDragStart: (emoji: string) => void;
  onDrop: (emoji: string) => void;
}

const FallingEmoji = ({ id, emoji, speed, position, onDragStart, onDrop }: FallingEmojiProps) => {
  const emojiRef = useRef<HTMLDivElement>(null);
  
  // Handle drag start of emoji
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('emoji', emoji);
    onDragStart(emoji);
  };
  
  // Check if emoji has fallen off screen
  useEffect(() => {
    const checkPosition = () => {
      const element = emojiRef.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        onDrop(emoji); // Now passing emoji string instead of id
      }
    };
    
    // Set up animation end listener
    const handleAnimationEnd = () => {
      onDrop(emoji);
    };
    
    const emojiElement = emojiRef.current;
    if (emojiElement) {
      emojiElement.addEventListener('animationend', handleAnimationEnd);
    }
    
    // Also set a backup timer in case animation end doesn't fire
    const timer = setTimeout(checkPosition, speed * 1000 + 500);
    
    return () => {
      if (emojiElement) {
        emojiElement.removeEventListener('animationend', handleAnimationEnd);
      }
      clearTimeout(timer);
    };
  }, [emoji, speed, onDrop]);

  return (
    <div
      ref={emojiRef}
      className="absolute emoji select-none" 
      style={{ 
        left: `${position.x}%`,
        top: `${position.y}%`,
        fontSize: '2.5rem',
        animation: `emoji-fall ${speed}s linear forwards`,
        zIndex: '10'
      }}
      draggable
      onDragStart={handleDragStart}
    >
      {emoji}
    </div>
  );
};

export default FallingEmoji;
