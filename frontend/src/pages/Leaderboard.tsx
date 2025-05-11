
import { useState } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { Award, Star, Users, MapPin, Trophy, Calendar } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";

const Leaderboard = () => {
  const [viewMode, setViewMode] = useState<'all' | 'friends' | 'region'>('all');
  
  // Mock user data for the leaderboard
  const users = [
    { 
      id: 1, 
      rank: 1, 
      name: "Alex Fitness", 
      avatar: "AF",
      xp: 12450, 
      streak: 42, 
      challenges: 18,
      level: 24,
      badges: ["marathon", "lifter", "nutrition"]
    },
    { 
      id: 2, 
      rank: 2, 
      name: "Taylor Swift", 
      avatar: "TS",
      xp: 11200, 
      streak: 30, 
      challenges: 15,
      level: 22,
      badges: ["sprint", "plank", "challenge"]
    },
    { 
      id: 3, 
      rank: 3, 
      name: "Chris Power", 
      avatar: "CP",
      xp: 10800, 
      streak: 35, 
      challenges: 22,
      level: 21,
      badges: ["weight", "cardio", "streak"]
    },
    { 
      id: 4, 
      rank: 4, 
      name: "Sam Strong", 
      avatar: "SS",
      xp: 9500, 
      streak: 20, 
      challenges: 12,
      level: 19,
      badges: ["running", "nutrition"]
    },
    { 
      id: 5, 
      rank: 5, 
      name: "Jamie Flex", 
      avatar: "JF",
      xp: 8900, 
      streak: 25, 
      challenges: 10,
      level: 18,
      badges: ["cardio", "challenge"]
    },
    { 
      id: 6, 
      rank: 6, 
      name: "Pat Lift", 
      avatar: "PL",
      xp: 8200, 
      streak: 18, 
      challenges: 8,
      level: 17,
      badges: ["weight"]
    },
    { 
      id: 7, 
      rank: 7, 
      name: "Jordan Run", 
      avatar: "JR",
      xp: 7600, 
      streak: 15, 
      challenges: 9,
      level: 15,
      badges: ["running", "streak"]
    },
  ];

  const renderBadgeIcon = (badge: string) => {
    switch(badge) {
      case 'marathon':
        return <Trophy size={14} className="text-yellow-500" />;
      case 'lifter':
        return <Award size={14} className="text-blue-400" />;
      case 'nutrition':
        return <Star size={14} className="text-purple-400" />;
      case 'sprint':
        return <Star size={14} className="text-orange-400" />;
      case 'plank':
        return <Star size={14} className="text-green-400" />;
      case 'challenge':
        return <Trophy size={14} className="text-red-400" />;
      case 'weight':
        return <Award size={14} className="text-cyan-400" />;
      case 'cardio':
        return <Star size={14} className="text-pink-400" />;
      case 'streak':
        return <Calendar size={14} className="text-amber-400" />;
      case 'running':
        return <Star size={14} className="text-lime-400" />;
      default:
        return <Star size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        {/* Hero section */}
        <div className="relative py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #39FF14 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="p-3 bg-black/50 border border-glow-green/30 rounded-full mb-6 animate-float">
                <Trophy size={32} className="text-glow-green" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">
                Top Locked In Warriors
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                The most dedicated athletes pushing their limits. Will you join the elite ranks?
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Leaderboard</h2>
            
            <div className="flex gap-2 bg-black border border-glow-green/20 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  viewMode === 'all' ? 'bg-glow-green text-black' : 'text-white hover:text-glow-green'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Trophy size={14} /> All
                </span>
              </button>
              <button 
                onClick={() => setViewMode('friends')}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  viewMode === 'friends' ? 'bg-glow-green text-black' : 'text-white hover:text-glow-green'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Users size={14} /> Friends
                </span>
              </button>
              <button 
                onClick={() => setViewMode('region')}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  viewMode === 'region' ? 'bg-glow-green text-black' : 'text-white hover:text-glow-green'
                }`}
              >
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> Region
                </span>
              </button>
            </div>
          </div>

          {/* User ranking cards */}
          <div className="mt-8 space-y-4">
            {users.map((user, index) => (
              <div 
                key={user.id}
                className={`p-4 rounded-lg border ${
                  index < 3 
                    ? 'border-glow-green shadow-[0_0_10px_rgba(57,255,20,0.3)] animate-pulse' 
                    : 'border-gray-800'
                } bg-black/50 backdrop-blur-sm transition-all hover:bg-black/70`}
              >
                <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                  {/* Rank */}
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center font-bold text-xl border-2 border-glow-green">
                    #{user.rank}
                  </div>
                  
                  {/* Avatar */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${
                    index === 0 ? 'bg-yellow-500/30 text-yellow-400 border-2 border-yellow-400' : 
                    index === 1 ? 'bg-gray-400/30 text-gray-300 border-2 border-gray-400' :
                    index === 2 ? 'bg-amber-600/30 text-amber-500 border-2 border-amber-600' :
                    'bg-gray-800 text-white'
                  }`}>
                    {user.avatar}
                  </div>
                  
                  {/* User info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {user.name}
                      <span className="text-sm text-gray-400">Lvl {user.level}</span>
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-glow-green" /> {user.xp.toLocaleString()} XP
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-glow-red" /> {user.streak} day streak
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy size={14} className="text-yellow-400" /> {user.challenges} challenges
                      </span>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {user.badges.map((badge, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full bg-black/80 border border-gray-700 flex items-center justify-center"
                        title={badge.charAt(0).toUpperCase() + badge.slice(1)}
                      >
                        {renderBadgeIcon(badge)}
                      </div>
                    ))}
                  </div>
                  
                  {/* Challenge button */}
                  <button className="px-4 py-2 rounded bg-glow-red/10 border border-glow-red/30 text-white text-sm hover:bg-glow-red/20 transition-colors">
                    Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Your rank */}
          <div className="mt-10 p-6 rounded-lg border border-glow-green bg-black/70 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-3">Your Current Position</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center font-bold text-xl border-2 border-glow-green">
                #42
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Your Profile
                  <span className="text-sm text-gray-400">Lvl 12</span>
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-glow-green" /> 5,240 XP
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-glow-red" /> 8 day streak
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy size={14} className="text-yellow-400" /> 4 challenges
                  </span>
                </div>
              </div>
            </div>
            
            {/* Progress to next level */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Level 12</span>
                <span>Level 13</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-glow-green w-7/12 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">760 XP to next level</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Leaderboard;
