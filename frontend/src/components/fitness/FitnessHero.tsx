
import { Dumbbell } from 'lucide-react';

export const FitnessHero = () => {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
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
            <Dumbbell size={32} className="text-glow-green" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">
            Train Like You Mean It
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            Discover workouts that challenge your limits and push your boundaries.
            Select your preferred training style and get locked in on your fitness journey.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="http://localhost:8501" className="btn-glow">
              Start Training
            </a>
            <button className="btn-red">
              Save Favorites
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
