
import { Dumbbell, Utensils, Moon, Activity, Users, Trophy } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <Dumbbell className="text-glow-green" size={36} />,
      title: "AI Workout Generator",
      description: "Get personalized workouts based on your goals, available time, and equipment"
    },
    {
      icon: <Utensils className="text-glow-green" size={36} />,
      title: "Indian Nutrition Plans",
      description: "Customized meal plans featuring nutritious Indian dishes tailored to your goals"
    },
    {
      icon: <Moon className="text-glow-green" size={36} />,
      title: "Wellness & Recovery",
      description: "Track your sleep patterns and stress levels for optimal recovery and performance"
    },
    {
      icon: <Activity className="text-glow-green" size={36} />,
      title: "Form Correction",
      description: "Real-time feedback on your exercise form to prevent injuries and maximize results"
    },
    {
      icon: <Users className="text-glow-green" size={36} />,
      title: "Supportive Community",
      description: "Connect with like-minded fitness enthusiasts for motivation and accountability"
    },
    {
      icon: <Trophy className="text-glow-green" size={36} />,
      title: "Gamified Experience",
      description: "Earn rewards, badges, and track streaks to stay motivated on your fitness journey"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Features to </span>
            <span className="text-glow-green">Transform Your Fitness</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with traditional Indian wellness practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl border border-glow-green/20 hover:border-glow-green/50 transition-all duration-300"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
