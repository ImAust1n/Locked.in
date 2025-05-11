
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';

export const AIChatPreview = () => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to the AI
    setInputValue('');
  };

  return (
    <div className="glass-card rounded-xl border border-glow-green/20 p-4">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-glow-green/20 border border-glow-green/50 flex items-center justify-center mr-2">
          <MessageCircle size={16} className="text-glow-green" />
        </div>
        <h3 className="font-bold">AI Fitness Buddy</h3>
      </div>
      
      <div className="bg-black/30 rounded-lg p-3 mb-4">
        <p className="text-sm">
          Ask me anything about your workouts, nutrition or wellness goals. I'm here to help you stay on track!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Quick question..."
          className="flex-1 bg-background/80 border border-glow-green/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-glow-green/50"
        />
        <button 
          type="submit" 
          className="bg-glow-green/20 border border-glow-green/50 text-glow-green rounded-lg w-9 h-9 flex items-center justify-center"
        >
          <ArrowRight size={16} />
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <Link to="/chat" className="text-sm text-glow-green hover:underline">
          Open full AI chat
        </Link>
      </div>
    </div>
  );
};
