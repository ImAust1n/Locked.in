
import { useState, useEffect } from 'react';
import { Bell, Settings } from 'lucide-react';

export const DashboardHero = () => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const hour = currentTime.getHours();
    
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black relative overflow-hidden border-b border-glow-green/20">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-glow-green/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-glow-red/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-6 md:py-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold">
                <span>{greeting},</span>{' '}
                <span className="text-glow-green">Arjun</span>
              </h1>
            </div>
            <p className="text-gray-400 mt-1">
              {currentTime.toLocaleDateString('en-IN', { 
                weekday: 'long', 
                day: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="p-2 rounded-full bg-background/30 border border-glow-green/20 hover:border-glow-green/60 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-glow-red rounded-full"></span>
            </button>
            <button className="p-2 rounded-full bg-background/30 border border-glow-green/20 hover:border-glow-green/60 transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-9 h-9 rounded-full bg-glow-green/20 flex items-center justify-center text-glow-green border border-glow-green/50">
              AP
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Streak</div>
            <div className="flex items-end">
              <span className="text-glow-green text-2xl font-bold">21</span>
              <span className="text-gray-400 ml-1">days</span>
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Today's Goal</div>
            <div className="flex items-end">
              <span className="text-glow-green text-2xl font-bold">65</span>
              <span className="text-gray-400 ml-1">% complete</span>
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Upcoming</div>
            <div className="flex items-end">
              <span className="text-white text-lg font-bold">HIIT Session</span>
              <span className="text-gray-400 ml-1 text-sm">16:30</span>
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Weekly XP</div>
            <div className="flex items-end">
              <span className="text-glow-green text-2xl font-bold">750</span>
              <span className="text-gray-400 ml-1">/ 1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
