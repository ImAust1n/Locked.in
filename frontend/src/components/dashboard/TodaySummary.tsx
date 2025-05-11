
import { useState } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TodaySummary = () => {
  const [activeTab, setActiveTab] = useState<'workout' | 'nutrition'>('workout');
  
  return (
    <div className="glass-card rounded-xl border border-glow-green/20 overflow-hidden">
      <div className="flex">
        <button 
          className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
            activeTab === 'workout' 
              ? 'border-glow-green text-glow-green' 
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('workout')}
        >
          Today's Workout
        </button>
        <button 
          className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
            activeTab === 'nutrition' 
              ? 'border-glow-green text-glow-green' 
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('nutrition')}
        >
          Today's Nutrition
        </button>
      </div>
      
      <div className="p-4 md:p-6">
        {activeTab === 'workout' ? (
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Upper Body Strength</h3>
                <p className="text-gray-400">45 minutes • Intermediate</p>
              </div>
              <span className="bg-glow-green/20 text-glow-green py-1 px-3 rounded-full text-xs border border-glow-green/50">
                AI Generated
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Exercises</div>
                <div className="text-xl font-bold">6</div>
                <div className="text-xs text-gray-500">Focus on chest and back</div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Estimated Calories</div>
                <div className="text-xl font-bold">320</div>
                <div className="text-xs text-gray-500">Based on your profile</div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-glow-green/20 border border-glow-green/50 flex items-center justify-center mr-3">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Push-ups (Surya Push-ups)</div>
                    <div className="text-gray-400">3 sets x 12 reps</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-glow-green/20 border border-glow-green/50 flex items-center justify-center mr-3">
                  2
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Dumbbell Rows</div>
                    <div className="text-gray-400">3 sets x 10 reps</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-glow-green/20 border border-glow-green/50 flex items-center justify-center mr-3">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Incline Bench Press</div>
                    <div className="text-gray-400">3 sets x 8 reps</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mr-3 text-gray-400">
                  ...
                </div>
                <div className="flex-1 text-gray-400">
                  3 more exercises
                </div>
              </div>
            </div>
            
            <Link to="/fitness" className="btn-glow w-full flex items-center justify-center gap-2">
              <span>Start Workout</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Tuesday Meal Plan</h3>
                <p className="text-gray-400">High Protein • Indian Focus</p>
              </div>
              <span className="bg-glow-green/20 text-glow-green py-1 px-3 rounded-full text-xs border border-glow-green/50">
                AI Optimized
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Protein</div>
                <div className="text-xl font-bold">120g</div>
                <div className="text-xs text-gray-500">Goal: 135g</div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Carbs</div>
                <div className="text-xl font-bold">210g</div>
                <div className="text-xs text-gray-500">Goal: 225g</div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Calories</div>
                <div className="text-xl font-bold">2150</div>
                <div className="text-xs text-gray-500">Goal: 2300</div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Breakfast</div>
                <div className="font-medium">Paneer & Vegetable Paratha with Curd</div>
                <div className="text-xs text-gray-400 mt-1">450 calories • 22g protein</div>
              </div>
              
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Lunch</div>
                <div className="font-medium">Brown Rice, Dal Tadka & Grilled Tandoori Chicken</div>
                <div className="text-xs text-gray-400 mt-1">650 calories • 38g protein</div>
              </div>
              
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Snack</div>
                <div className="font-medium">Homemade Masala Chana Chaat</div>
                <div className="text-xs text-gray-400 mt-1">280 calories • 14g protein</div>
              </div>
              
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Dinner</div>
                <div className="font-medium">Ragi Dosa with Sambar & Avocado</div>
                <div className="text-xs text-gray-400 mt-1">580 calories • 24g protein</div>
              </div>
            </div>
            
            <Link to="/nutrition" className="btn-glow w-full flex items-center justify-center gap-2">
              <span>View Full Meal Plan</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
