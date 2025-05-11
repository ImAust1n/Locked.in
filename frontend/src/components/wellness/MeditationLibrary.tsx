
import { useEffect, useState } from 'react';
import { Play, Pause, Clock, Tag } from 'lucide-react';
import { wellnessService, Meditation } from '@/services/wellnessService';
import { toast } from 'sonner';

interface MeditationLibraryProps {
  onMeditationSelect: (id: string) => void;
}

export const MeditationLibrary = ({ onMeditationSelect }: MeditationLibraryProps) => {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  useEffect(() => {
    const loadMeditations = async () => {
      try {
        const data = await wellnessService.getMeditations();
        setMeditations(data);
      } catch (error) {
        console.error('Failed to load meditations:', error);
        toast.error('Failed to load meditations');
      } finally {
        setLoading(false);
      }
    };
    
    loadMeditations();
  }, []);
  
  const handlePlayPause = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
      toast.info('Meditation paused');
    } else {
      setPlayingId(id);
      onMeditationSelect(id);
    }
  };
  
  const categories = ['All', ...Array.from(new Set(meditations.map(m => m.category)))];
  
  const filteredMeditations = activeCategory && activeCategory !== 'All'
    ? meditations.filter(m => m.category === activeCategory.toLowerCase())
    : meditations;
    
  if (loading) {
    return (
      <div className="glass-card rounded-xl border border-glow-green/20 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-glow-green">Loading meditations...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="glass-card rounded-xl border border-glow-green/20 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Meditation Library</h2>
        <p className="text-gray-400">Discover guided meditations for mind and body</p>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category === 'All' ? null : category)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              (category === 'All' && activeCategory === null) || category === activeCategory
                ? 'bg-glow-green/20 border border-glow-green/50 text-glow-green'
                : 'bg-black/30 border border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMeditations.map((meditation) => (
          <div key={meditation.id} className="bg-black/30 rounded-lg overflow-hidden border border-gray-700 hover:border-glow-green/30 transition-all">
            <div 
              className="h-40 bg-cover bg-center" 
              style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${meditation.imageUrl || '/placeholder.svg'})` 
              }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="bg-black/50 text-glow-green px-2 py-1 rounded-md text-xs flex items-center">
                    <Tag size={12} className="mr-1" />
                    {meditation.category.charAt(0).toUpperCase() + meditation.category.slice(1)}
                  </span>
                  <span className="bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center">
                    <Clock size={12} className="mr-1" />
                    {meditation.duration} min
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{meditation.title}</h3>
                </div>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{meditation.description}</p>
              <button
                onClick={() => handlePlayPause(meditation.id)}
                className={`w-full py-2 rounded-md flex items-center justify-center gap-2 transition-colors ${
                  playingId === meditation.id
                    ? 'bg-glow-green/30 text-glow-green'
                    : 'bg-black/40 text-gray-300 hover:bg-black/60'
                }`}
              >
                {playingId === meditation.id ? (
                  <>
                    <Pause size={16} />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>Play</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
