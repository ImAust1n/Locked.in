
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Dumbbell, HeartPulse, Newspaper, Trophy, Utensils } from 'lucide-react';
import { toast } from 'sonner';

type QuickAccessTile = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
  requiresAuth?: boolean;
};

export const QuickAccess = () => {
  const navigate = useNavigate();
  
  const tiles: QuickAccessTile[] = [
    {
      id: 'fitness',
      title: 'Fitness Videos',
      description: 'Find workouts for your level',
      icon: Dumbbell,
      path: '/fitness',
      color: 'from-glow-green/20 to-black/20 hover:from-glow-green/30',
    },
    {
      id: 'nutrition',
      title: 'Nutrition Plans',
      description: 'Meal plans & recipes',
      icon: Utensils,
      path: '/nutrition',
      color: 'from-blue-500/20 to-black/20 hover:from-blue-500/30',
    },
    {
      id: 'events',
      title: 'Live Events',
      description: 'Join camps & sessions',
      icon: Calendar,
      path: '/events',
      color: 'from-purple-500/20 to-black/20 hover:from-purple-500/30',
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      description: 'See top performers',
      icon: Trophy,
      path: '/leaderboard',
      color: 'from-yellow-500/20 to-black/20 hover:from-yellow-500/30',
      requiresAuth: true,
    },
    {
      id: 'wellness',
      title: 'Health Stats',
      description: 'Track vital metrics',
      icon: HeartPulse,
      path: '/wellness',
      color: 'from-glow-red/20 to-black/20 hover:from-glow-red/30',
    },
    {
      id: 'blog',
      title: 'Blog & Articles',
      description: 'Fitness tips & news',
      icon: Newspaper,
      path: '/blog',
      color: 'from-cyan-500/20 to-black/20 hover:from-cyan-500/30',
    },
  ];

  const handleTileClick = (tile: QuickAccessTile) => {
    // Handle authentication for pages that require it
    if (tile.requiresAuth) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      
      if (!isAuthenticated) {
        toast.error('You need to log in first');
        navigate('/login');
        return;
      }
    }
    
    navigate(tile.path);
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Quick Access</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              className={`glass-card bg-gradient-to-br ${tile.color} p-6 rounded-lg border border-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                  <tile.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-orbitron text-white text-lg font-bold">{tile.title}</h3>
                  <p className="text-gray-400 text-sm">{tile.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
