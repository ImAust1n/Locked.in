
import { useState } from 'react';
import { Medal, Award, Trophy } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

export const Achievements = () => {
  const [activeTab, setActiveTab] = useState<'recent' | 'badges'>('recent');
  
  const recentAchievements = [
    {
      id: 1,
      title: 'Workout Streak',
      description: '7 consecutive days of workouts',
      icon: <Trophy className="text-yellow-500" />,
      date: '2 days ago',
      xp: 150
    },
    {
      id: 2,
      title: 'Step Master',
      description: 'Reached 10,000 steps in one day',
      icon: <Award className="text-glow-green" />,
      date: '3 days ago',
      xp: 100
    },
    {
      id: 3,
      title: 'Nutrition Pro',
      description: 'Tracked all meals for 14 days',
      icon: <Medal className="text-blue-500" />,
      date: '1 week ago',
      xp: 200
    }
  ];
  
  const badges = [
    {
      id: 1,
      name: 'Early Riser',
      icon: '🌅',
      level: 2,
      progress: 60
    },
    {
      id: 2,
      name: 'Protein Champion',
      icon: '💪',
      level: 3,
      progress: 40
    },
    {
      id: 3,
      name: 'Meditation Guru',
      icon: '🧘',
      level: 1,
      progress: 80
    },
    {
      id: 4,
      name: 'Water Tracker',
      icon: '💧',
      level: 4,
      progress: 20
    },
    {
      id: 5,
      name: 'Step Counter',
      icon: '👣',
      level: 2,
      progress: 75
    }
  ];

  return (
    <div className="glass-card rounded-xl border border-glow-green/20 overflow-hidden">
      <div className="flex">
        <button 
          className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
            activeTab === 'recent' 
              ? 'border-glow-green text-glow-green' 
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('recent')}
        >
          Recent
        </button>
        <button 
          className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
            activeTab === 'badges' 
              ? 'border-glow-green text-glow-green' 
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('badges')}
        >
          Badges
        </button>
      </div>
      
      <ScrollArea className="h-[280px]">
        <div className="p-4">
          {activeTab === 'recent' ? (
            <div className="space-y-4">
              {recentAchievements.map(achievement => (
                <div key={achievement.id} className="flex items-start p-3 bg-black/20 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mr-3 flex-shrink-0">
                    {achievement.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="text-gray-500">{achievement.date}</span>
                      <span className="text-glow-green">+{achievement.xp} XP</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {badges.map(badge => (
                <div key={badge.id} className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-center mb-1">{badge.name}</div>
                  <div className="text-xs bg-glow-green/20 text-glow-green px-2 py-0.5 rounded-full">
                    Level {badge.level}
                  </div>
                  {badge.progress < 100 && (
                    <div className="w-full mt-2">
                      <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-glow-green rounded-full"
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
