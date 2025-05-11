
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { FitnessCards } from "../components/home/FitnessCards";
import { QuickAccess } from "../components/home/QuickAccess";
import { AiAssistant } from "../components/ui/AiAssistant";
import { Features } from "../components/home/Features";
import { Testimonials } from "../components/home/Testimonials";
import { HomeStats } from "../components/home/HomeStats";
import { CTASection } from "../components/home/CTASection";
import { PageBackground } from "../components/ui/PageBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddCardModal } from "../components/home/AddCardModal";
import { toast } from "sonner";

interface CustomCard {
  id: string;
  title: string;
  type: 'workout' | 'nutrition';
  content: string;
  createdAt: Date;
}

const Index = () => {
  const navigate = useNavigate();
  const [addCardModalOpen, setAddCardModalOpen] = useState(false);
  const [customCards, setCustomCards] = useState<CustomCard[]>(() => {
    const saved = localStorage.getItem('customCards');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Save custom cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customCards', JSON.stringify(customCards));
  }, [customCards]);
  
  // Ensure all CTAs and buttons on subcomponents are functional
  useEffect(() => {
    // Add event listeners for CTA buttons
    const handleCTAClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // If the clicked element is a button with the "Get Started" text
      if (target.tagName === "BUTTON" && target.textContent?.includes("Get Started")) {
        e.preventDefault();
        navigate("/signup");
      }
      
      // If the clicked element is a button with the "Join Now" text
      if (target.tagName === "BUTTON" && target.textContent?.includes("Join Now")) {
        e.preventDefault();
        navigate("/signup");
      }
    };
    
    document.addEventListener('click', handleCTAClick);
    
    return () => {
      document.removeEventListener('click', handleCTAClick);
    };
  }, [navigate]);

  const handleAddCard = (card: { title: string; type: 'workout' | 'nutrition'; content: string }) => {
    const newCard: CustomCard = {
      ...card,
      id: `card-${Date.now()}`,
      createdAt: new Date(),
    };
    
    setCustomCards(prev => [newCard, ...prev]);
    setAddCardModalOpen(false);
    toast.success('Card added successfully');
  };

  const handleDeleteCard = (id: string) => {
    setCustomCards(prev => prev.filter(card => card.id !== id));
    toast.info('Card removed');
  };

  return (
    <PageBackground>
      <Navbar />
      <main>
        <Hero />
        <HomeStats />
        
        {/* Explore Plans Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-orbitron mb-4 md:mb-0">
              <span className="text-white">EXPLORE </span>
              <span className="text-glow-green">FITNESS PLANS</span>
            </h2>
            <Button 
              onClick={() => navigate('/explore-plans')}
              className="bg-glow-green text-black hover:bg-glow-green/80 transition-colors"
            >
              View All Plans <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card hover:border-glow-green/30 transition-all duration-300 overflow-hidden group cursor-pointer" onClick={() => navigate('/explore-plans')}>
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/600x400/0a0a0a/39FF14?text=Strength+Training')" }}>
                <div className="w-full h-full flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                  <h3 className="text-xl font-orbitron text-white">Strength Training</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-sm mb-4">Build lean muscle and increase your overall strength with focused resistance training.</p>
                <Button 
                  variant="outline"
                  className="w-full border-glow-green text-glow-green hover:bg-glow-green hover:text-black transition-all"
                  onClick={() => navigate('/explore-plans')}
                >
                  View Plan
                </Button>
              </div>
            </div>
            
            <div className="glass-card hover:border-glow-green/30 transition-all duration-300 overflow-hidden group cursor-pointer" onClick={() => navigate('/explore-plans')}>
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/600x400/0a0a0a/39FF14?text=HIIT+Workouts')" }}>
                <div className="w-full h-full flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                  <h3 className="text-xl font-orbitron text-white">HIIT Workouts</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-sm mb-4">Burn fat and improve cardiovascular fitness with high-intensity interval training.</p>
                <Button 
                  variant="outline"
                  className="w-full border-glow-green text-glow-green hover:bg-glow-green hover:text-black transition-all"
                  onClick={() => navigate('/explore-plans')}
                >
                  View Plan
                </Button>
              </div>
            </div>
            
            <div className="glass-card hover:border-glow-green/30 transition-all duration-300 overflow-hidden group cursor-pointer" onClick={() => navigate('/explore-plans')}>
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/600x400/0a0a0a/39FF14?text=Flexibility+%26+Mobility')" }}>
                <div className="w-full h-full flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                  <h3 className="text-xl font-orbitron text-white">Flexibility & Mobility</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-sm mb-4">Improve your range of motion, posture, and recovery with targeted mobility exercises.</p>
                <Button 
                  variant="outline"
                  className="w-full border-glow-green text-glow-green hover:bg-glow-green hover:text-black transition-all"
                  onClick={() => navigate('/explore-plans')}
                >
                  View Plan
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <Features />
        <FitnessCards />
        <QuickAccess />
        
        {/* Custom Cards Section */}
        <section className="py-10 container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-orbitron">
              <span className="text-white">MY </span>
              <span className="text-glow-green">CARDS</span>
            </h2>
            <Button 
              onClick={() => setAddCardModalOpen(true)}
              className="bg-glow-green hover:bg-glow-green/80 text-black"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Card
            </Button>
          </div>
          
          {customCards.length === 0 ? (
            <div className="glass-card p-8 text-center mb-8">
              <p className="text-gray-400 mb-4">No custom cards yet. Create your first one!</p>
              <Button 
                onClick={() => setAddCardModalOpen(true)}
                variant="outline"
                className="border-glow-green text-glow-green hover:bg-glow-green hover:text-black"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Card
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {customCards.map(card => (
                <div 
                  key={card.id} 
                  className={`glass-card p-6 relative hover:shadow-[0_0_15px_#39FF14] transition-all duration-300 group ${
                    card.type === 'workout' ? 'hover:border-glow-green/30' : 'hover:border-glow-red/30'
                  }`}
                >
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-1 bg-black/50 text-gray-400 hover:text-glow-red rounded-full"
                      aria-label="Delete card"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                  <div className={`inline-block px-2 py-0.5 rounded text-xs mb-2 ${
                    card.type === 'workout' 
                      ? 'bg-glow-green/20 text-glow-green' 
                      : 'bg-glow-red/20 text-glow-red'
                  }`}>
                    {card.type === 'workout' ? 'Workout' : 'Nutrition'}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-sm">{card.content}</p>
                  <p className="text-xs text-gray-500 mt-4">
                    Added on {new Date(card.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
        
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <AiAssistant />
      
      <AddCardModal
        open={addCardModalOpen}
        onClose={() => setAddCardModalOpen(false)}
        onSave={handleAddCard}
      />
    </PageBackground>
  );
};

export default Index;
