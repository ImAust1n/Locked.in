
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { authService } from '@/services/authService';

export const CTASection = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };
  
  const handleExploreFeatures = () => {
    toast.info("Exploring all features");
    navigate('/fitness');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-glow-green/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-glow-red/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-glow-green/30 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Ready to Get </span>
              <span className="text-glow-green">Locked In?</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join our community today and transform your fitness journey with AI-powered workouts, 
              personalized nutrition plans, and a supportive community.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted} 
              className="btn-glow text-center py-3 px-8 text-lg"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
            </button>
            <button 
              onClick={handleExploreFeatures}
              className="btn-red text-center py-3 px-8 text-lg"
            >
              Explore Features
            </button>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>No credit card required. 14-day free trial. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
