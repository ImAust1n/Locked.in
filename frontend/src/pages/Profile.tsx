
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { 
  User, Settings, Trophy, Target, Calendar, 
  Smartphone, BookOpen, Eye, EyeOff, Edit, 
  LogOut, Camera, Heart, Plus 
} from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  const user = {
    name: "Alex Rodriguez",
    username: "alex_fit",
    level: 28,
    xp: 12546,
    nextLevel: 15000,
    joinDate: "January 2025",
    bio: "Fitness enthusiast focused on calisthenics and functional training. Always looking to push my limits and help others do the same!",
    location: "Miami, FL",
    profileImage: "https://placehold.co/300x300/0a0a0a/39FF14?text=AR",
    badges: [
      { id: 1, name: "30-Day Streak", icon: "🔥", description: "Worked out for 30 days in a row", date: "April 2025" },
      { id: 2, name: "Progress Tracker", icon: "📊", description: "Logged stats for 60 consecutive days", date: "March 2025" },
      { id: 3, name: "Strength Master", icon: "💪", description: "Increased strength by 25% in 3 months", date: "February 2025" },
      { id: 4, name: "Community Leader", icon: "👑", description: "Helped 50 community members", date: "January 2025" },
      { id: 5, name: "Early Adopter", icon: "🚀", description: "Joined during beta phase", date: "December 2024" },
    ],
    stats: {
      workouts: 143,
      followers: 287,
      following: 92,
      achievements: 15
    },
    goals: [
      "Run a half marathon under 1:45",
      "Master 10 consecutive muscle-ups",
      "Maintain consistent 7-day workout schedule"
    ]
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-3">
            <span className="text-white">YOUR PROFILE, </span>
            <span className="text-glow-green">YOUR RULES</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Customize your experience, track your achievements, and showcase your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glow-card p-6 text-center mb-6">
              <div className="relative inline-block mb-4">
                <img 
                  src={user.profileImage} 
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-glow-green/50 object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-black p-2 rounded-full border border-glow-green">
                  <Camera size={16} className="text-glow-green" />
                </button>
              </div>
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className="text-gray-400 text-sm mb-3">@{user.username}</p>
              <div className="mb-5">
                <div className="flex items-center justify-center mb-1">
                  <Trophy size={16} className="text-glow-green mr-1" />
                  <span>Level {user.level}</span>
                </div>
                <div className="relative w-full h-2 bg-black rounded-full mb-1">
                  <div 
                    className="absolute top-0 left-0 h-2 bg-glow-green rounded-full"
                    style={{ width: `${(user.xp / user.nextLevel) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400">
                  {user.xp} / {user.nextLevel} XP to Level {user.level + 1}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-black/30 p-2 rounded-md">
                  <p className="text-xl font-bold">{user.stats.workouts}</p>
                  <p className="text-xs text-gray-400">Workouts</p>
                </div>
                <div className="bg-black/30 p-2 rounded-md">
                  <p className="text-xl font-bold">{user.stats.achievements}</p>
                  <p className="text-xs text-gray-400">Achievements</p>
                </div>
              </div>
              <button className="btn-glow w-full">
                <Edit size={16} className="mr-1 inline-block" /> Edit Profile
              </button>
            </div>
            
            <div className="glow-card overflow-hidden">
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`flex items-center w-full p-4 text-left ${
                  activeTab === 'profile' ? 'bg-glow-green/20 text-glow-green' : 'hover:bg-black/50'
                }`}
              >
                <User size={18} className="mr-3" /> Profile
              </button>
              <button 
                onClick={() => setActiveTab('goals')} 
                className={`flex items-center w-full p-4 text-left ${
                  activeTab === 'goals' ? 'bg-glow-green/20 text-glow-green' : 'hover:bg-black/50'
                }`}
              >
                <Target size={18} className="mr-3" /> Goals & Progress
              </button>
              <button 
                onClick={() => setActiveTab('badges')} 
                className={`flex items-center w-full p-4 text-left ${
                  activeTab === 'badges' ? 'bg-glow-green/20 text-glow-green' : 'hover:bg-black/50'
                }`}
              >
                <Trophy size={18} className="mr-3" /> Badges & Achievements
              </button>
              <button 
                onClick={() => setActiveTab('settings')} 
                className={`flex items-center w-full p-4 text-left ${
                  activeTab === 'settings' ? 'bg-glow-green/20 text-glow-green' : 'hover:bg-black/50'
                }`}
              >
                <Settings size={18} className="mr-3" /> Settings
              </button>
              <button className="flex items-center w-full p-4 text-left text-glow-red hover:bg-black/50">
                <LogOut size={18} className="mr-3" /> Logout
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <>
                <div className="glow-card p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <User size={20} className="mr-2 text-glow-green" />
                    About Me
                  </h2>
                  <p className="text-gray-300 mb-4">{user.bio}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p>{user.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Member Since</p>
                      <p>{user.joinDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="glow-card p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Calendar size={20} className="mr-2 text-glow-green" />
                    Activity Feed
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3 border-l-2 border-glow-green pl-4">
                      <div>
                        <p className="font-medium">Completed HIIT Workout</p>
                        <p className="text-sm text-gray-400">Today, 8:30 AM • 450 calories • 35 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 border-l-2 border-glow-green pl-4">
                      <div>
                        <p className="font-medium">Earned "Early Riser" Badge</p>
                        <p className="text-sm text-gray-400">Yesterday • Completed 10 workouts before 7 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 border-l-2 border-glow-green pl-4">
                      <div>
                        <p className="font-medium">Updated Weight Goal</p>
                        <p className="text-sm text-gray-400">2 days ago • New target: 78kg</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glow-card p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <BookOpen size={20} className="mr-2 text-glow-green" />
                    Personal Blog
                  </h2>
                  <div className="text-center py-8">
                    <Heart size={48} className="mx-auto mb-4 text-gray-600" />
                    <h3 className="text-lg font-medium mb-2">Share Your Journey</h3>
                    <p className="text-gray-400 mb-4">Start a blog to document your fitness experience and inspire others</p>
                    <button className="btn-glow px-6 py-2">Create First Post</button>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'goals' && (
              <>
                <div className="glow-card p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <Target size={20} className="mr-2 text-glow-green" />
                      My Fitness Goals
                    </h2>
                    <button className="btn-glow text-sm px-3 py-1.5">
                      <Plus size={16} className="inline-block mr-1" /> Add Goal
                    </button>
                  </div>
                  
                  <ul className="space-y-4">
                    {user.goals.map((goal, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-glow-green mr-3"></div>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="glow-card p-6">
                    <h3 className="text-lg font-bold mb-4">Body Composition</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm text-gray-400">Weight</p>
                          <p className="text-sm font-medium">80.7kg</p>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full">
                          <div className="h-1.5 bg-glow-green rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm text-gray-400">Body Fat %</p>
                          <p className="text-sm font-medium">18.2%</p>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full">
                          <div className="h-1.5 bg-glow-green rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm text-gray-400">Muscle Mass</p>
                          <p className="text-sm font-medium">45.3kg</p>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full">
                          <div className="h-1.5 bg-glow-green rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glow-card p-6">
                    <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm text-gray-400">5K Time</p>
                          <p className="text-sm font-medium">25:42</p>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full">
                          <div className="h-1.5 bg-glow-green rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm text-gray-400">Max Pull-ups</p>
                          <p className="text-sm font-medium">14 reps</p>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full">
                          <div className="h-1.5 bg-glow-green rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm text-gray-400">1RM Bench Press</p>
                          <p className="text-sm font-medium">95kg</p>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full">
                          <div className="h-1.5 bg-glow-green rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glow-card p-6">
                  <h3 className="text-lg font-bold mb-4">Habit Tracker</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 28 }, (_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                          i < 15 
                            ? 'bg-glow-green/30 border border-glow-green/50 text-white' 
                            : 'bg-gray-800/50 border border-gray-700 text-gray-500'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-gray-400">
                    <span>Current Streak: 15 days</span>
                    <span>Longest Streak: 21 days</span>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'badges' && (
              <>
                <div className="glow-card p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center">
                      <Trophy size={20} className="mr-2 text-glow-green" />
                      Badges & Achievements
                    </h2>
                    <span className="bg-glow-green/20 text-glow-green text-sm px-3 py-1 rounded-full">
                      {user.badges.length} Earned
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {user.badges.map(badge => (
                      <div key={badge.id} className="bg-black/30 border border-glow-green/30 rounded-lg p-4 transition-all hover:border-glow-green hover:shadow-[0_0_10px_rgba(57,255,20,0.3)]">
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <h3 className="font-bold mb-1">{badge.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{badge.description}</p>
                        <p className="text-xs text-glow-green">Earned: {badge.date}</p>
                      </div>
                    ))}
                    <div className="bg-black/30 border border-gray-700 rounded-lg p-4 opacity-60 flex flex-col items-center justify-center text-center">
                      <Trophy size={32} className="mb-2 text-gray-500" />
                      <h3 className="font-medium mb-1">Next Achievement</h3>
                      <p className="text-sm text-gray-500">Complete 20 workouts this month</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glow-card p-6">
                    <h3 className="text-lg font-bold mb-4">Level Progress</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">Current: Level {user.level}</p>
                          <p className="text-glow-green">Fitness Warrior</p>
                        </div>
                        <div className="w-full h-2.5 bg-gray-700 rounded-full">
                          <div className="h-2.5 bg-glow-green rounded-full" style={{ width: `${(user.xp / user.nextLevel) * 100}%` }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs">
                          <span>{user.xp} XP</span>
                          <span>{user.nextLevel} XP</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Next Rewards:</p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-glow-green mr-2"></div>
                            <span>Exclusive "Elite" badge</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-glow-green mr-2"></div>
                            <span>Access to premium workout videos</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-glow-green mr-2"></div>
                            <span>Custom profile theme</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glow-card p-6">
                    <h3 className="text-lg font-bold mb-4">XP Breakdown</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center pb-2 border-b border-white/10">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-glow-green mr-3"></span>
                          <span>Workouts Completed</span>
                        </div>
                        <span className="font-medium">7,230 XP</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b border-white/10">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-blue-500 mr-3"></span>
                          <span>Challenges Won</span>
                        </div>
                        <span className="font-medium">2,850 XP</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b border-white/10">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-purple-500 mr-3"></span>
                          <span>Badges Earned</span>
                        </div>
                        <span className="font-medium">1,750 XP</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-amber-500 mr-3"></span>
                          <span>Community Engagement</span>
                        </div>
                        <span className="font-medium">716 XP</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'settings' && (
              <>
                <div className="glow-card p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <User size={20} className="mr-2 text-glow-green" />
                    Account Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                        <input 
                          type="text"
                          value={user.name}
                          className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Username</label>
                        <input 
                          type="text"
                          value={user.username}
                          className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <input 
                        type="email"
                        value="alex.rodriguez@example.com"
                        className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          value="••••••••••••"
                          className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                        />
                        <button 
                          className="absolute right-3 top-2.5 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Bio</label>
                      <textarea 
                        rows={3}
                        value={user.bio}
                        className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Location</label>
                        <input 
                          type="text"
                          value={user.location}
                          className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
                        <input 
                          type="date"
                          value="1990-06-15"
                          className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <button className="btn-glow px-6 py-2">Save Changes</button>
                    </div>
                  </div>
                </div>
                
                <div className="glow-card p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <Smartphone size={20} className="mr-2 text-glow-green" />
                    Connected Devices
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-black/30 rounded-md border border-glow-green/30">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-glow-green/20 flex items-center justify-center mr-3">
                          <span className="text-lg">⌚</span>
                        </div>
                        <div>
                          <p className="font-medium">Apple Watch</p>
                          <p className="text-xs text-gray-400">Connected since March 2025</p>
                        </div>
                      </div>
                      <Toggle aria-label="Toggle device connection" defaultPressed />
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-black/30 rounded-md border border-white/10">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center mr-3">
                          <span className="text-lg">⚖️</span>
                        </div>
                        <div>
                          <p className="font-medium">Smart Scale</p>
                          <p className="text-xs text-gray-400">Connect your device</p>
                        </div>
                      </div>
                      <button className="text-sm text-glow-green">Connect</button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-black/30 rounded-md border border-white/10">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center mr-3">
                          <span className="text-lg">📱</span>
                        </div>
                        <div>
                          <p className="font-medium">Fitness Apps</p>
                          <p className="text-xs text-gray-400">Sync with other services</p>
                        </div>
                      </div>
                      <button className="text-sm text-glow-green">Connect</button>
                    </div>
                  </div>
                </div>
                
                <div className="glow-card p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <Settings size={20} className="mr-2 text-glow-green" />
                    Preferences
                  </h2>
                  
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-xs text-gray-400">Receive workout reminders and updates</p>
                      </div>
                      <Switch defaultChecked aria-label="Toggle email notifications" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-xs text-gray-400">Get alerts for achievements and challenges</p>
                      </div>
                      <Switch defaultChecked aria-label="Toggle push notifications" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-xs text-gray-400">Switch between light and dark themes</p>
                      </div>
                      <Switch defaultChecked aria-label="Toggle dark mode" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Privacy</p>
                        <p className="text-xs text-gray-400">Make profile visible to everyone</p>
                      </div>
                      <Switch aria-label="Toggle profile privacy" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Activity Sharing</p>
                        <p className="text-xs text-gray-400">Share workouts on social media</p>
                      </div>
                      <Switch defaultChecked aria-label="Toggle activity sharing" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Units of Measurement</p>
                        <p className="text-xs text-gray-400">Choose between metric and imperial</p>
                      </div>
                      <div className="flex">
                        <button className="px-3 py-1 rounded-l-md bg-glow-green/20 text-glow-green border border-glow-green">
                          Metric
                        </button>
                        <button className="px-3 py-1 rounded-r-md bg-black/30 border-t border-r border-b border-gray-700">
                          Imperial
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Profile;
