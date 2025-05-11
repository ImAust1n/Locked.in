
import { useState } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { PageBackground } from "../components/ui/PageBackground";
import { FitnessHero } from "../components/fitness/FitnessHero";
import { VideoGrid } from "../components/fitness/VideoGrid";
import { FitnessFilters } from "../components/fitness/FitnessFilters";
import { AiAssistant } from "../components/ui/AiAssistant";
import { AIWorkoutTracker } from "../components/fitness/AIWorkoutTracker";
import { WeeklyPlannerModal } from "../components/fitness/WeeklyPlannerModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Play, Calendar, Heart, Repeat } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Fitness = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filters, setFilters] = useState({
    time: "all",
    intensity: "all",
    equipment: "all",
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteWorkouts');
    return saved ? JSON.parse(saved) : [];
  });
  const [showPlannerModal, setShowPlannerModal] = useState(false);
  
  // Save favorites to localStorage when they change
  const saveFavorites = (newFavorites: string[]) => {
    localStorage.setItem('favoriteWorkouts', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const handleStartTraining = () => {
    navigate('/start-workout');
    toast.success("Starting today's workout");
  };
  
  const handleSaveToFavorites = (workoutId: string) => {
    if (favorites.includes(workoutId)) {
      saveFavorites(favorites.filter(id => id !== workoutId));
      toast.info("Removed from favorites");
    } else {
      saveFavorites([...favorites, workoutId]);
      toast.success("Added to favorites");
    }
  };
  
  const handleGenerateWorkout = () => {
    toast.success("Workout generated!", {
      description: "A new workout has been created for you",
      action: {
        label: "View",
        onClick: () => navigate('/start-workout'),
      },
    });
  };

  const handleSaveWeeklyPlan = () => {
    toast.success("Weekly plan saved!", {
      description: "Your weekly workout plan has been saved",
    });
  };

  return (
    <PageBackground>
      <Navbar />
      <main>
        <FitnessHero />
        
        {/* AI Feature Tabs */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-orbitron mb-8 text-center">
            <span className="dark:text-white text-gray-900">AI-POWERED </span>
            <span className="text-glow-green">FITNESS</span>
          </h2>
          
          <Tabs defaultValue="tracker" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="tracker" className="flex items-center gap-2">
                <Dumbbell size={16} />
                <span className="hidden sm:inline">Workout Tracker</span>
                <span className="inline sm:hidden">Track</span>
              </TabsTrigger>
              <TabsTrigger value="generator" className="flex items-center gap-2">
                <Play size={16} />
                <span className="hidden sm:inline">Workout Generator</span>
                <span className="inline sm:hidden">Generate</span>
              </TabsTrigger>
              <TabsTrigger value="planner" className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="hidden sm:inline">Weekly Planner</span>
                <span className="inline sm:hidden">Plan</span>
              </TabsTrigger>
            </TabsList>
            
            {/* <TabsContent value="tracker" className="space-y-4">
              <AIWorkoutTracker />
            </TabsContent> */}
            
            <TabsContent value="generator" className="space-y-4">
              <div className="glass-card p-8 text-center">
                <h3 className="text-xl font-bold mb-4">AI Workout Generator</h3>
                <p className="text-gray-400 mb-6">Tell the AI what you want to focus on, how much time you have, and what equipment you have access to.</p>
                <div className="max-w-lg mx-auto">
                  <textarea 
                    className="w-full bg-black/30 border border-border rounded-md px-4 py-3 mb-4"
                    rows={3}
                    placeholder="Example: Create a 20-minute HIIT workout focused on core strength that I can do at home with no equipment"
                  ></textarea>
                  <Button 
                    onClick={handleGenerateWorkout}
                    className="bg-glow-green text-black hover:bg-glow-green/80"
                  >
                    <Repeat size={18} className="mr-2" />
                    Generate Workout
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="planner" className="space-y-4">
              <div className="glass-card p-8 text-center">
                <h3 className="text-xl font-bold mb-4">AI Weekly Planner</h3>
                <p className="text-gray-400 mb-6">Let the AI create a personalized weekly workout schedule based on your goals and availability.</p>
                <div className="max-w-lg mx-auto">
                  <div className="mb-4 flex flex-wrap gap-3 justify-center">
                    <button className="px-4 py-2 rounded-full border border-glow-green bg-glow-green/10 text-sm">Gain Muscle</button>
                    <button className="px-4 py-2 rounded-full border border-border bg-black/10 text-sm">Lose Weight</button>
                    <button className="px-4 py-2 rounded-full border border-border bg-black/10 text-sm">Improve Endurance</button>
                    <button className="px-4 py-2 rounded-full border border-border bg-black/10 text-sm">Increase Flexibility</button>
                  </div>
                  <Button 
                    onClick={() => setShowPlannerModal(true)}
                    className="bg-glow-green text-black hover:bg-glow-green/80"
                  >
                    <Calendar size={18} className="mr-2" />
                    Create Weekly Plan
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Action Buttons */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={handleStartTraining}
              className="bg-glow-green text-black hover:bg-glow-green/80 hover:shadow-[0_0_10px_#39FF14] transition-all px-8"
            >
              <Play className="mr-2 h-5 w-5" /> Start Training
            </Button>
            <Button 
              onClick={handleGenerateWorkout}
              variant="outline"
              className="border-glow-green text-glow-green hover:bg-glow-green/10 hover:shadow-[0_0_10px_#39FF14] transition-all"
            >
              <Repeat className="mr-2 h-5 w-5" /> Generate Workout
            </Button>
            <Button 
              onClick={() => setShowPlannerModal(true)}
              variant="outline"
              className="border-white/40 hover:border-glow-green/60 hover:bg-black/40 transition-all"
            >
              <Calendar className="mr-2 h-5 w-5" /> Weekly Planner
            </Button>
          </div>
        </div>
        
        <FitnessFilters 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filters={filters}
          setFilters={setFilters}
        />
        <VideoGrid 
          activeCategory={activeCategory} 
          filters={filters}
          favorites={favorites}
          onToggleFavorite={(id: string) => {
            handleSaveToFavorites(id);
          }}
        />
        
        {/* Favorites Section (if any exist) */}
        {favorites.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-orbitron mb-6 flex items-center">
              <Heart className="mr-2 text-glow-red" size={24} />
              <span>MY FAVORITES</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((id) => (
                <div key={id} className="glass-card border-glow-red/30 hover:shadow-[0_0_15px_rgba(255,59,59,0.5)] overflow-hidden group">
                  <div className="relative h-40">
                    <img 
                      src={`https://placehold.co/600x400/0a0a0a/39FF14?text=Workout+${id}`}
                      alt={`Favorite Workout ${id}`}
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => handleSaveToFavorites(id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-glow-red/20 text-glow-red"
                    >
                      <Heart size={18} className="fill-current" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">Favorite Workout {id}</h3>
                    <p className="text-gray-400 text-sm mb-3">Saved workout program</p>
                    <Button 
                      onClick={() => navigate(`/start-workout/${id}`)}
                      className="w-full bg-glow-red/90 text-white hover:bg-glow-red"
                    >
                      <Play size={16} className="mr-2" /> Start Workout
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <AiAssistant />
      
      <WeeklyPlannerModal 
        open={showPlannerModal}
        onClose={() => setShowPlannerModal(false)}
        onSave={handleSaveWeeklyPlan}
      />
    </PageBackground>
  );
};

export default Fitness;
