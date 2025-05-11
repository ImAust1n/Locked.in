
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const MealPlan = () => {
  const meals = [
    {
      id: 1,
      type: 'Breakfast',
      time: '7:30 AM',
      name: 'Masala Oats with Mixed Fruits',
      calories: 320,
      protein: 14,
      image: 'https://images.unsplash.com/photo-1600626333379-117a7db71cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2F0bWVhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      type: 'Mid-Morning Snack',
      time: '10:30 AM',
      name: 'Greek Yogurt with Honey & Nuts',
      calories: 180,
      protein: 12,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8eW9ndXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      type: 'Lunch',
      time: '1:00 PM',
      name: 'Brown Rice with Dal Tadka & Paneer Tikka',
      calories: 520,
      protein: 28,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      type: 'Evening Snack',
      time: '4:30 PM',
      name: 'Sprouts Chaat with Mint Chutney',
      calories: 210,
      protein: 9,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3Byb3V0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 5,
      type: 'Dinner',
      time: '8:00 PM',
      name: 'Multigrain Roti with Palak Paneer & Raita',
      calories: 440,
      protein: 22,
      image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="glass-card rounded-xl border border-glow-green/20 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">Today's Nutrition</h3>
          <p className="text-gray-400">Personalized Indian meal plan</p>
        </div>
        
        <div>
          <Link to="/nutrition" className="text-glow-green hover:underline flex items-center">
            View All
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-6 text-center text-sm">
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Calories</div>
          <div className="text-lg font-bold">1,670</div>
          <div className="text-xs text-gray-500">of 2,300 goal</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Protein</div>
          <div className="text-lg font-bold">85g</div>
          <div className="text-xs text-gray-500">of 135g goal</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Water</div>
          <div className="text-lg font-bold">1.8L</div>
          <div className="text-xs text-gray-500">of 3L goal</div>
        </div>
      </div>
      
      <div className="relative">
        <ScrollArea className="h-[340px] pr-4 -mr-4">
          <div className="space-y-4">
            {meals.map(meal => (
              <div key={meal.id} className="flex gap-4 bg-black/20 rounded-lg overflow-hidden">
                <div className="w-24 h-24">
                  <img 
                    src={meal.image} 
                    alt={meal.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="text-xs bg-glow-green/20 text-glow-green px-2 py-0.5 rounded">
                          {meal.type}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">{meal.time}</span>
                      </div>
                      <h4 className="font-medium mt-1">{meal.name}</h4>
                    </div>
                    <button className="w-6 h-6 rounded-full border border-glow-green/50 flex items-center justify-center">
                      <ChevronRight size={14} className="text-glow-green" />
                    </button>
                  </div>
                  
                  <div className="flex items-center mt-2 text-sm">
                    <div className="text-gray-400">
                      <span className="text-white">{meal.calories}</span> kcal
                    </div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full mx-2"></div>
                    <div className="text-gray-400">
                      <span className="text-white">{meal.protein}g</span> protein
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
