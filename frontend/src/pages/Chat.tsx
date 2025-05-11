
import { useState, useEffect } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatMessages } from "../components/chat/ChatMessages";
import { ChatInput } from "../components/chat/ChatInput";
import { chatService, ChatBotType, Message } from "@/services/chatService";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Utensils, HeartPulse } from "lucide-react";
import { toast } from "sonner";

const Chat = () => {
  const [activeBot, setActiveBot] = useState<ChatBotType>('fitness');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Load chat history when component mounts or active bot changes
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await chatService.getChatHistory(activeBot);
        setMessages(history);
      } catch (error) {
        console.error('Failed to load chat history:', error);
        toast.error('Failed to load chat history');
      }
    };
    
    loadChatHistory();
  }, [activeBot]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    try {
      setLoading(true);
      
      // Update UI immediately with the user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: message,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Get bot response
      const response = await chatService.sendMessage(activeBot, message);
      
      // Update UI with bot response
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      await chatService.clearChatHistory(activeBot);
      setMessages([]);
      toast.success('Chat cleared');
    } catch (error) {
      console.error('Failed to clear chat:', error);
      toast.error('Failed to clear chat');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl flex flex-col">
        <div className="glass-card border border-glow-green/20 rounded-xl p-6 flex flex-col flex-1">
          <Tabs defaultValue="fitness" onValueChange={(value) => setActiveBot(value as ChatBotType)}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="fitness" className="flex items-center gap-2">
                <Dumbbell size={16} />
                <span>Fitness Trainer</span>
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="flex items-center gap-2">
                <Utensils size={16} />
                <span>Nutrition Coach</span>
              </TabsTrigger>
              <TabsTrigger value="wellness" className="flex items-center gap-2">
                <HeartPulse size={16} />
                <span>Wellness Assistant</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <ChatHeader activeBot={activeBot} />
          
          {/* Fixed height container with overflow handling */}
          <div className="flex-1 mb-4 border border-glow-green/10 rounded-lg overflow-hidden bg-black/20">
            <div className="h-full overflow-hidden">
              <ChatMessages messages={messages} loading={loading} onClearChat={handleClearChat} />
            </div>
          </div>
          
          <ChatInput onSendMessage={handleSendMessage} loading={loading} />
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Chat;
