
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { PageBackground } from "../components/ui/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

type Plan = {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
};

const ExplorePlans = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const plans: Plan[] = [
    {
      id: "p1",
      title: "30-Day Strength Builder",
      category: "Strength",
      duration: "30 days",
      level: "Intermediate",
      description: "Build lean muscle and increase your strength with this comprehensive 30-day program.",
      imageUrl: "https://placehold.co/600x400/0a0a0a/39FF14?text=Strength+Plan",
      featured: true
    },
    {
      id: "p2",
      title: "Fat Loss Accelerator",
      category: "Fat Loss",
      duration: "8 weeks",
      level: "All Levels",
      description: "Burn fat and improve cardiovascular fitness with high-intensity interval training.",
      imageUrl: "https://placehold.co/600x400/0a0a0a/39FF14?text=Fat+Loss+Plan"
    },
    {
      id: "p3",
      title: "Flexibility & Mobility",
      category: "Mobility",
      duration: "4 weeks",
      level: "Beginner",
      description: "Improve your range of motion, posture, and reduce injury risk with targeted mobility work.",
      imageUrl: "https://placehold.co/600x400/0a0a0a/39FF14?text=Mobility+Plan"
    },
    {
      id: "p4",
      title: "Bodyweight Master",
      category: "Calisthenics",
      duration: "12 weeks",
      level: "Advanced",
      description: "Build impressive strength and skills using just your bodyweight.",
      imageUrl: "https://placehold.co/600x400/0a0a0a/39FF14?text=Calisthenics+Plan"
    },
    {
      id: "p5",
      title: "Endurance Builder",
      category: "Endurance",
      duration: "6 weeks",
      level: "Intermediate",
      description: "Increase your stamina and cardiovascular capacity with progressive workouts.",
      imageUrl: "https://placehold.co/600x400/0a0a0a/39FF14?text=Endurance+Plan"
    },
    {
      id: "p6",
      title: "Core Strength Focus",
      category: "Core",
      duration: "4 weeks",
      level: "All Levels",
      description: "Develop a strong, stable core with targeted exercises and progressions.",
      imageUrl: "https://placehold.co/600x400/0a0a0a/39FF14?text=Core+Plan"
    },
  ];

  const handleViewPlan = (id: string) => {
    navigate(`/start-workout/${id}`);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        toast.info("Removed from favorites");
        return prev.filter(planId => planId !== id);
      } else {
        toast.success("Added to favorites");
        return [...prev, id];
      }
    });
  };

  return (
    <PageBackground>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-3">
            <span className="text-white">TRAINING </span>
            <span className="text-glow-green">PLANS</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover professionally designed workout programs to help you reach your fitness goals.
            Each plan includes detailed workouts, progression tracking, and nutrition guidance.
          </p>
        </div>

        {/* Featured Plan */}
        {plans.filter(plan => plan.featured).map(featuredPlan => (
          <div key={featuredPlan.id} className="mb-12">
            <h2 className="text-xl font-orbitron font-bold mb-4">FEATURED PLAN</h2>
            <div className="glass-card p-0 overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_#39FF14]">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <img 
                    src={featuredPlan.imageUrl} 
                    alt={featuredPlan.title} 
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{featuredPlan.title}</h3>
                      <button 
                        onClick={() => toggleFavorite(featuredPlan.id)} 
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(featuredPlan.id) 
                            ? "bg-glow-green/20 text-glow-green" 
                            : "bg-black/30 text-gray-400 hover:text-white"
                        }`}
                        aria-label="Add to favorites"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={favorites.includes(featuredPlan.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-glow-green/20 text-glow-green px-2 py-1 rounded text-xs">
                        {featuredPlan.category}
                      </span>
                      <span className="bg-black/40 text-gray-300 px-2 py-1 rounded text-xs">
                        {featuredPlan.duration}
                      </span>
                      <span className="bg-black/40 text-gray-300 px-2 py-1 rounded text-xs">
                        {featuredPlan.level}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-6">{featuredPlan.description}</p>
                  </div>
                  <Button 
                    onClick={() => handleViewPlan(featuredPlan.id)}
                    className="bg-glow-green text-black hover:bg-glow-green/80 hover:shadow-[0_0_10px_#39FF14] transition-all duration-300"
                  >
                    View Plan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* All Plans */}
        <div className="mb-12">
          <h2 className="text-xl font-orbitron font-bold mb-4">ALL PLANS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.filter(plan => !plan.featured).map(plan => (
              <Card key={plan.id} className="glass-card overflow-hidden border border-white/10 group hover:shadow-[0_0_15px_#39FF14] hover:border-glow-green/30 transition-all duration-300">
                <div className="relative h-48">
                  <img 
                    src={plan.imageUrl}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => toggleFavorite(plan.id)} 
                    className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                      favorites.includes(plan.id) 
                        ? "bg-glow-green/20 text-glow-green" 
                        : "bg-black/30 text-gray-400 hover:text-white"
                    }`}
                    aria-label="Add to favorites"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={favorites.includes(plan.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </button>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold">{plan.title}</h3>
                    <div className="flex flex-wrap gap-2 my-2">
                      <span className="bg-glow-green/20 text-glow-green px-2 py-0.5 rounded text-xs">
                        {plan.category}
                      </span>
                      <span className="bg-black/40 text-gray-300 px-2 py-0.5 rounded text-xs">
                        {plan.duration}
                      </span>
                      <span className="bg-black/40 text-gray-300 px-2 py-0.5 rounded text-xs">
                        {plan.level}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  </div>
                  <Button 
                    onClick={() => handleViewPlan(plan.id)}
                    className="w-full bg-black border border-glow-green hover:bg-glow-green hover:text-black transition-all"
                    variant="outline"
                  >
                    View Plan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Favorites Section - Only show if has favorites */}
        {favorites.length > 0 && (
          <div className="mb-12 animate-fade-in">
            <h2 className="text-xl font-orbitron font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-glow-green">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              FAVORITES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.filter(plan => favorites.includes(plan.id)).map(plan => (
                <Card key={plan.id} className="glass-card overflow-hidden border border-glow-green/30 group hover:shadow-[0_0_15px_#39FF14] transition-all duration-300">
                  <div className="relative h-48">
                    <img 
                      src={plan.imageUrl}
                      alt={plan.title}
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => toggleFavorite(plan.id)} 
                      className="absolute top-2 right-2 p-2 rounded-full bg-glow-green/20 text-glow-green"
                      aria-label="Remove from favorites"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold">{plan.title}</h3>
                      <div className="flex flex-wrap gap-2 my-2">
                        <span className="bg-glow-green/20 text-glow-green px-2 py-0.5 rounded text-xs">
                          {plan.category}
                        </span>
                        <span className="bg-black/40 text-gray-300 px-2 py-0.5 rounded text-xs">
                          {plan.duration}
                        </span>
                        <span className="bg-black/40 text-gray-300 px-2 py-0.5 rounded text-xs">
                          {plan.level}
                        </span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleViewPlan(plan.id)}
                      className="w-full bg-glow-green text-black hover:bg-glow-green/80 transition-all"
                    >
                      View Plan <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <AiAssistant />
    </PageBackground>
  );
};

export default ExplorePlans;
