import { useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/services/chatService";

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  onClearChat: () => Promise<void>;
}

export const ChatMessages = ({ messages, loading, onClearChat }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use scrollIntoView with a specific configuration to prevent page scrolling
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "nearest" // This prevents the page from scrolling beyond the container
      });
    }
  }, [messages]);

  const formatBotMessage = (message: string) => {
    return message
      .replace(/---/g, '<hr/>')
      .replace(/###(.*?) /g, '<h4>$1</h4><br/>')
      .replace(/```([\s\S]*?)```/g, (_match, code) => {
        return `<pre><code>${code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')}</code></pre>`;
      })
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      // Convert bullet points to proper HTML line breaks
      .replace(/\*\s(.*?)(?=(?:\*|\n|$))/g, '• $1<br/>')
      .replace(/(\d+\.)\s(.*?)(?=(?:\d+\.|\n|$))/g, '$1 $2<br/>')
      // Handle asterisks within numbered list items
      .replace(/(\d+\.\s.*?)\*([^*]+)\*/g, '$1<b>$2</b>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.length > 0 && (
          <div className="flex justify-end mb-4">
            <button 
              onClick={onClearChat}
              className="text-xs px-2 py-1 bg-black/30 border border-gray-700 rounded hover:bg-black/50 transition-colors"
            >
              Clear Chat
            </button>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === "user"
                  ? "bg-glow-green/20 border border-glow-green/40"
                  : "bg-black/30 border border-gray-700"
              }`}
            >
              {message.sender === "bot" && (
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center mr-2">
                    <Bot className="text-glow-green" size={12} />
                  </div>
                  <span className="text-xs text-gray-400">AI Assistant</span>
                </div>
              )}
              
              <div className="text-sm whitespace-pre-wrap">
                {message.sender === "bot" ? (
                  <div dangerouslySetInnerHTML={{ __html: formatBotMessage(message.content) }} />
                ) : (
                  message.content
                )}
              </div>
              
              <div className="text-xs text-gray-500 mt-1 text-right">
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl p-3 bg-black/30 border border-gray-700">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center mr-2">
                  <Bot className="text-glow-green" size={12} />
                </div>
                <span className="text-xs text-gray-400">AI Assistant</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-glow-green animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-glow-green animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-glow-green animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
