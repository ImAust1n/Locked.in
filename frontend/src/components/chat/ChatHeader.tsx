
import { Bot } from 'lucide-react';

interface ChatHeaderProps {
  activeBot: 'fitness' | 'nutrition' | 'wellness';
}

export const ChatHeader = ({ activeBot }: ChatHeaderProps) => {
  const getBotTitle = () => {
    switch (activeBot) {
      case 'fitness':
        return 'AI Fitness Trainer';
      case 'nutrition':
        return 'Nutrition Coach';
      case 'wellness':
        return 'Wellness Assistant';
      default:
        return 'AI Assistant';
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full bg-glow-green/20 flex items-center justify-center border border-glow-green/50`}>
          <Bot className="text-glow-green" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold">{getBotTitle()}</h1>
          <p className="text-sm text-gray-400">
            {activeBot === 'fitness' 
              ? 'Ask me about workouts, form, and training plans' 
              : activeBot === 'nutrition'
              ? 'Get personalized Indian meal plans and nutrition advice'
              : 'Learn about meditation, sleep, and stress management'}
          </p>
        </div>
      </div>
    </div>
  );
};
