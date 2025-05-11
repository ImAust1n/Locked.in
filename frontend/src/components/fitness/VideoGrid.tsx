
import React from "react";
import { fitnessService } from "@/services/fitnessService";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface VideoGridProps {
  activeCategory: string;
  filters: {
    time: string;
    intensity: string;
    equipment: string;
  };
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ 
  activeCategory, 
  filters,
  favorites = [],
  onToggleFavorite = () => {}
}) => {
  const navigate = useNavigate();
  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos', activeCategory, filters],
    queryFn: () => fitnessService.getVideos(activeCategory, filters),
  });

  const handleStartWorkout = (videoId: string) => {
    navigate(`/start-workout/${videoId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-400">Loading workout videos...</p>
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-bold mb-2">No Videos Found</h3>
          <p className="text-gray-400">
            Try adjusting your filters or category to find more workouts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="glass-card overflow-hidden border border-white/10 group hover:shadow-[0_0_15px_#39FF14] hover:border-glow-green/30 transition-all duration-300">
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Play 
                  size={48} 
                  className="text-glow-green cursor-pointer"
                  onClick={() => handleStartWorkout(video.id)}
                />
              </div>
              <div className="absolute top-2 right-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(video.id);
                  }}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    favorites.includes(video.id) 
                      ? "bg-glow-red/20 text-glow-red" 
                      : "bg-black/50 text-gray-400 hover:text-white"
                  }`}
                >
                  <Heart size={16} className={favorites.includes(video.id) ? "fill-current" : ""} />
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="bg-glow-green/80 text-black text-xs px-2 py-1 rounded-full">
                  {video.duration}
                </span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold mb-1">{video.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{video.instructor}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-black/30 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {video.level}
                </span>
                <span className="bg-black/30 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {video.category}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-glow-green text-glow-green hover:bg-glow-green hover:text-black transition-all"
                onClick={() => handleStartWorkout(video.id)}
              >
                Start Training
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
