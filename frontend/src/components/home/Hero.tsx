
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-glow-green/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-glow-red/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container relative px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Level Up Your</span> 
                <br />
                <span className="text-glow-green drop-shadow-[0_0_8px_#39FF14]">Fitness Game</span>
              </h1>
              <p className="mt-6 text-gray-300 text-lg md:text-xl">
                Join the next generation fitness platform powered by AI. Track progress, earn rewards, and transform your body into the ultimate version.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="btn-glow text-center">
                Start Your Journey
              </Link>
              <Link to="/fitness-plans" className="btn-red text-center">
                Explore Fitness Plans
              </Link>
            </div>
            
            <div className="pt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-orbitron font-bold text-white">50K+</p>
                <p className="text-sm text-gray-400">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-orbitron font-bold text-white">200+</p>
                <p className="text-sm text-gray-400">Workout Plans</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-orbitron font-bold text-white">98%</p>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 glass-card p-6 rounded-2xl border border-glow-green/30 animate-float shadow-lg shadow-glow-green/10">
              <div className="absolute -top-3 -right-3 bg-black rounded-full text-glow-green border border-glow-green/50 p-2 animate-glow-pulse">
                <span className="text-xs font-bold">AI-POWERED</span>
              </div>
              
              <div className="aspect-video relative overflow-hidden rounded-lg mb-4 bg-black/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-glow-green/20 flex items-center justify-center border border-glow-green">
                    <ArrowRight className="text-glow-green" size={24} />
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80" 
                  alt="Workout Session" 
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">HIIT Cardio Blast</h3>
                  <p className="text-gray-400 text-sm">Intermediate • 30 min</p>
                </div>
                <div className="bg-glow-red/20 text-white py-1 px-3 rounded-full text-xs border border-glow-red/40">
                  TRENDING
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="glass-card p-2 text-center rounded-lg">
                  <p className="text-xs text-gray-400">Calories</p>
                  <p className="text-white font-semibold">350</p>
                </div>
                <div className="glass-card p-2 text-center rounded-lg">
                  <p className="text-xs text-gray-400">Difficulty</p>
                  <p className="text-white font-semibold">★★★☆☆</p>
                </div>
                <div className="glass-card p-2 text-center rounded-lg">
                  <p className="text-xs text-gray-400">Rating</p>
                  <p className="text-white font-semibold">4.8/5</p>
                </div>
              </div>
              
              <Link to="/fitness/hiit-cardio-blast" className="btn-glow w-full text-center">
                Start Workout
              </Link>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-glow-green/30"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-glow-green/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
