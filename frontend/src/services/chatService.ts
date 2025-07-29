
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'image' | 'workout' | 'meal' | 'meditation';
  metadata?: Record<string, unknown>;
}

export type ChatBotType = 'fitness' | 'nutrition' | 'wellness';

// API route mapping for different bot types
const apiRoutes: Record<ChatBotType, string> = {
  fitness: '/api/trainer',     // General fitness advice
  nutrition: '/api/dietian', // Nutrition/diet advice
  wellness: '/api/wellness'  // Stress management, sleep, and meditation
};

// Chat history for each bot type
const chatHistory: Record<ChatBotType, Message[]> = {
  fitness: [],
  nutrition: [],
  wellness: []
};

// Base URL for the API
const API_BASE_URL = 'http://localhost:5000'; // Update this if your Flask server runs on a different port

export const chatService = {
  // Get chat history for a specific bot type
  getChatHistory: async (botType: ChatBotType): Promise<Message[]> => {
    // This is still local since we're not storing chat history on the server
    return chatHistory[botType];
  },

  // Send a message and get a response
  sendMessage: async (botType: ChatBotType, content: string): Promise<Message> => {
    // Note: We don't add the user message to chat history here anymore
    // since it's already added in the Chat component
    
    try {
      // Get the appropriate API route for the bot type
      const apiRoute = apiRoutes[botType];
      
      // Make API request to myGPT
      const response = await fetch(`${API_BASE_URL}${apiRoute}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: content,
          botType: botType // Include the bot type in the request
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Create bot message from API response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      // Add to chat history
      chatHistory[botType].push(botMessage);
      
      return botMessage;
    } catch (error) {
      console.error('Error sending message to API:', error);
      
      // Create error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your request. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      // Add to chat history
      chatHistory[botType].push(errorMessage);
      
      return errorMessage;
    }
  },

  // Clear chat history
  clearChatHistory: async (botType: ChatBotType): Promise<boolean> => {
    // Clear chat history (local only)
    chatHistory[botType] = [];
    
    return true;
  }
};
