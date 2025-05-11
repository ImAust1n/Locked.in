
import { useState } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { toast } from 'sonner';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
}

export const ChatInput = ({ onSendMessage, loading }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleMicClick = () => {
    toast.info("Voice input coming soon");
  };
  
  const handleAttachmentClick = () => {
    toast.info("File attachment coming soon");
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <button
        type="button"
        className="p-2 rounded-full bg-black/30 border border-glow-green/20 text-gray-400 hover:text-white transition-colors"
        onClick={handleAttachmentClick}
      >
        <Paperclip size={18} />
      </button>
      
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full py-2 px-3 bg-black/30 border border-glow-green/20 rounded-full focus:outline-none focus:border-glow-green/40"
          disabled={loading}
        />
      </div>
      
      <button
        type="button"
        className="p-2 rounded-full bg-black/30 border border-glow-green/20 text-gray-400 hover:text-white transition-colors"
        onClick={handleMicClick}
      >
        <Mic size={18} />
      </button>
      
      <button
        type="submit"
        disabled={!message.trim() || loading}
        className={`p-2 rounded-full ${
          !message.trim() || loading
            ? 'bg-black/30 border border-gray-700 text-gray-600'
            : 'bg-glow-green/20 border border-glow-green/50 text-glow-green hover:bg-glow-green/30'
        } transition-colors`}
      >
        <Send size={18} />
      </button>
    </form>
  );
};
