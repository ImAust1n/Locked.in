
import { Link } from 'react-router-dom';
import { CheckCircle, Target, ArrowRight } from 'lucide-react';

export const Goals = () => {
  const goals = [
    {
      id: 1,
      title: 'Complete 5 workouts',
      progress: 60,
      deadline: '3 days left',
      reward: '+80 XP'
    },
    {
      id: 2,
      title: 'Track all meals for a week',
      progress: 40,
      deadline: '4 days left',
      reward: '+100 XP'
    },
    {
      id: 3,
      title: 'Reach 8k steps daily',
      progress: 75,
      deadline: '2 days left',
      reward: '+60 XP'
    },
    {
      id: 4,
      title: 'Meditate for 10 minutes',
      progress: 100,
      deadline: 'Completed',
      reward: '+40 XP'
    }
  ];

  return (
    <div className="glass-card rounded-xl border border-glow-green/20 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Target size={20} className="text-glow-green mr-2" />
          <h3 className="text-xl font-bold">Goals</h3>
        </div>
        
        <Link to="/dashboard/goals" className="text-sm text-glow-green hover:underline">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {goals.map(goal => (
          <div 
            key={goal.id} 
            className={`p-3 rounded-lg ${
              goal.progress === 100 ? 'bg-glow-green/10 border border-glow-green/30' : 'bg-black/20'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start">
                {goal.progress === 100 ? (
                  <CheckCircle size={18} className="text-glow-green mt-0.5 mr-2" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-gray-500 mt-0.5 mr-2"></div>
                )}
                <div>
                  <h4 className="font-medium">{goal.title}</h4>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <span>{goal.deadline}</span>
                    <span className="mx-2">•</span>
                    <span className="text-glow-green">{goal.reward}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {goal.progress !== 100 && (
              <div className="pl-7">
                <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-glow-green rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <Link to="/dashboard/goals/new" className="btn-glow w-full mt-4 flex items-center justify-center gap-2">
        <span>Set New Goal</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};
