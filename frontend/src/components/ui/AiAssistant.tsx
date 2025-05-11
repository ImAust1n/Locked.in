
import { useState, useEffect } from 'react';
import { MessageCircle, X, Info, Award, Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// AI Bot messages for different pages
const pageBotMessages = {
  home: [
    "Welcome back, warrior. Ready to lock in today?", 
    "Your daily challenge: Complete 25 pushups.",
    "You're on a 5-day streak. Keep going!",
    "Try to beat your personal records today.",
    "Your sleep pattern looks better than last week. Great job!"
  ],
  fitness: [
    "Finding the right workout? Try filtering by intensity.",
    "The HIIT sessions are trending among users like you.",
    "Remember to mix cardio and strength training for best results.",
    "Looking for recovery? Check out the mobility section."
  ],
  nutrition: [
    "Protein intake is crucial after strength training.",
    "Try adding more leafy greens to your diet today.",
    "Your macros need adjustment if you're bulking up.",
    "Don't forget to stay hydrated during workouts!"
  ],
  events: [
    "There's a virtual HIIT camp starting in 3 days.",
    "Join the upcoming marathon training events.",
    "Have you registered for next week's nutrition workshop?",
    "The group yoga session is getting popular!"
  ],
  leaderboard: [
    "You're currently ranked #42 in your region.",
    "Just 120 XP until you reach the next level!",
    "Challenge a friend to improve your rank.",
    "The weekly challenge resets in 2 days - push hard!"
  ],
  blog: [
    "Check out the new article on muscle recovery.",
    "The interview with Olympic athletes is trending.", 
    "Have you read about the latest nutrition research?",
    "The mindset section has tips for mental toughness."
  ],
  dashboard: [
    "Your workout consistency is up by 12% this week!",
    "Try setting a new goal for the next month.",
    "Your strength metrics are improving steadily.",
    "Would you like me to suggest a workout plan?"
  ],
  profile: [
    "Update your fitness goals for personalized recommendations.",
    "Connect your fitness tracker for automated stats.",
    "Customize your dashboard for a better experience.",
    "Add a profile picture to join community challenges."
  ],
  default: [
    "I'm Nova, your AI fitness companion. How can I help?",
    "Ask me anything about workouts, nutrition, or your progress.",
    "Need help navigating the site? I'm here to assist.",
    "Want personalized recommendations? Just ask!"
  ]
};

// Helper function to get page key from pathname
const getPageKey = (pathname: string) => {
  const path = pathname.substring(1) || 'home';
  return Object.keys(pageBotMessages).includes(path) ? path : 'default';
};

// Get contextual tips based on current route
const getContextualTips = (pathname: string) => {
  const pageKey = getPageKey(pathname);
  return pageBotMessages[pageKey as keyof typeof pageBotMessages];
};

export const AiAssistant = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botMood, setBotMood] = useState<'neutral' | 'happy' | 'sad'>('neutral');
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState<{type: 'bot' | 'user', message: string}[]>([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Update messages when route changes
  useEffect(() => {
    const pageKey = getPageKey(location.pathname);
    const messages = pageBotMessages[pageKey as keyof typeof pageBotMessages];
    
    setIsTyping(true);
    setBotMood('neutral');
    
    // Show a welcome message specific to the page
    setTimeout(() => {
      const welcomeMsg = messages[0];
      setCurrentMessage(welcomeMsg);
      
      // Add to conversation if chat is open
      if (isOpen) {
        setConversation(prev => [...prev, {type: 'bot', message: welcomeMsg}]);
      }
      
      setIsTyping(false);
      setBotMood('happy');
      
      // If chat isn't open, show the notification indicator
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, 800);
  }, [location.pathname]);

  // Change bot message periodically when chat is closed
  useEffect(() => {
    if (isOpen) return;
    
    const messageInterval = setInterval(() => {
      const tips = getContextualTips(location.pathname);
      const randomIndex = Math.floor(Math.random() * tips.length);
      
      setIsTyping(true);
      
      // Random mood for bot expressions
      const moods: Array<'neutral' | 'happy' | 'sad'> = ['neutral', 'happy', 'sad'];
      setBotMood(moods[Math.floor(Math.random() * moods.length)]);
      
      setTimeout(() => {
        setCurrentMessage(tips[randomIndex]);
        setIsTyping(false);
        setHasNewMessage(!isOpen);
      }, 1000);
    }, 20000);
    
    return () => clearInterval(messageInterval);
  }, [isOpen, location.pathname]);

  // Handle opening the chat
  const handleOpenChat = () => {
    setIsOpen(true);
    setHasNewMessage(false);
    
    // Add current message to conversation if it's not already there
    if (currentMessage && !conversation.some(msg => msg.message === currentMessage)) {
      setConversation(prev => [...prev, {type: 'bot', message: currentMessage}]);
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, {type: 'user', message: userInput}]);
    setIsTyping(true);
    
    // Clear input
    setUserInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const pageKey = getPageKey(location.pathname);
      const tips = pageBotMessages[pageKey as keyof typeof pageBotMessages];
      const randomResponse = tips[Math.floor(Math.random() * tips.length)];
      
      setConversation(prev => [...prev, {type: 'bot', message: randomResponse}]);
      setIsTyping(false);
    }, 1200);
  };

  const renderBotFace = () => {
    // Simple ASCII-style face expressions for the bot
    switch (botMood) {
      case 'happy':
        return (
          <div className="text-glow-green text-2xl font-bold">
            ^◡^
          </div>
        );
      case 'sad':
        return (
          <div className="text-glow-red text-2xl font-bold">
            ಥ_ಥ
          </div>
        );
      default:
        return (
          <div className="text-glow-green text-2xl font-bold">
            ◕_◕
          </div>
        );
    }
  };

  // Current page guidance
  const pageGuidance = () => {
    const path = location.pathname.substring(1) || 'home';
    
    switch (path) {
      case 'fitness':
        return "I can help you find the perfect workout based on your goals.";
      case 'nutrition':
        return "Looking to optimize your diet? I can suggest meal plans based on your goals.";
      case 'events':
        return "Check out upcoming events or join a live training session!";
      case 'leaderboard':
        return "See how you stack up against other warriors. Keep grinding!";
      case 'blog':
        return "Stay updated with the latest fitness tips and success stories.";
      case 'dashboard':
        return "Track your progress and see your improvements over time.";
      case 'profile':
        return "Customize your profile and set your fitness goals.";
      default:
        return "Welcome to Locked In! I'm Nova, your AI fitness guide.";
    }
  };

  return (
    <>
      {/* Fixed AI assistant button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpenChat}
          className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
            isOpen 
              ? 'bg-glow-red text-white rotate-90'
              : 'bg-black border-2 border-glow-green text-glow-green hover:shadow-[0_0_15px_#39FF14]'
          } ${hasNewMessage ? 'animate-glow-pulse' : ''}`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          {hasNewMessage && !isOpen && (
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-glow-red"></span>
          )}
        </button>
      </div>
      
      {/* AI assistant popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-black/90 backdrop-blur-md border border-glow-green/50 rounded-lg shadow-lg z-40 animate-fade-in">
          <div className="p-4 border-b border-glow-green/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black border-2 border-glow-green flex items-center justify-center overflow-hidden animate-float">
              {renderBotFace()}
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-white">NOVA</h3>
              <p className="text-xs text-gray-400">AI Fitness Assistant</p>
            </div>
            <button 
              className="ml-auto text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="p-3 bg-glow-green/5 border-b border-glow-green/20">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Info size={14} className="text-glow-green" />
              <p>{pageGuidance()}</p>
            </div>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto scrollbar-none">
            <div className="flex flex-col space-y-4">
              {conversation.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-black border-2 border-glow-green flex items-center justify-center text-xs">
                      AI
                    </div>
                  )}
                  <div className={`${
                    msg.type === 'bot' 
                      ? 'bg-glow-green/10 border border-glow-green/30' 
                      : 'bg-glow-red/10 border border-glow-red/30'
                    } rounded-lg p-3 max-w-[80%]`}
                  >
                    <p className="text-white text-sm">{msg.message}</p>
                  </div>
                  {msg.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-black border-2 border-glow-red/70 flex items-center justify-center text-xs">
                      YOU
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-glow-green flex items-center justify-center text-xs">
                    AI
                  </div>
                  <div className="bg-glow-green/10 border border-glow-green/30 rounded-lg p-3">
                    <p className="text-white text-sm">
                      <span className="inline-block w-2 h-2 rounded-full bg-glow-green mx-0.5 animate-pulse"></span>
                      <span className="inline-block w-2 h-2 rounded-full bg-glow-green mx-0.5 animate-pulse delay-100"></span>
                      <span className="inline-block w-2 h-2 rounded-full bg-glow-green mx-0.5 animate-pulse delay-200"></span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 border-t border-glow-green/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask your AI assistant..."
                className="flex-1 bg-black/50 border border-glow-green/30 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-glow-green"
              />
              <button 
                onClick={handleSendMessage}
                className="btn-glow text-sm py-2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Minimized message bubble */}
      {!isOpen && (
        <div className="fixed bottom-20 right-6 max-w-xs bg-black/90 backdrop-blur-md border border-glow-green/50 rounded-lg p-3 text-white text-sm animate-fade-in">
          <p className="text-xs">{isTyping ? "..." : currentMessage}</p>
        </div>
      )}
    </>
  );
};
