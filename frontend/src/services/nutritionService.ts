
interface NutritionMeal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  imageUrl?: string;
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  type: 'weight-loss' | 'muscle-gain' | 'athletic-performance' | 'general';
  meals: NutritionMeal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

// Mock data for meal plans
const mealPlans: Record<string, MealPlan[]> = {
  'weight-loss': [
    {
      id: 'wl1',
      name: 'Low Calorie Indian Plan',
      description: 'A balanced meal plan featuring nutritious Indian foods with reduced calories',
      type: 'weight-loss',
      meals: [
        { name: 'Masala Oats with Low-Fat Curd', calories: 320, protein: 25, carbs: 15, fats: 12, imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3' },
        { name: 'Cucumber Mint Chaas', calories: 180, protein: 5, carbs: 20, fats: 5, imageUrl: 'https://images.unsplash.com/photo-1600718374662-0483e3a45c2b?ixlib=rb-4.0.3' },
        { name: 'Tandoori Chicken Salad', calories: 350, protein: 30, carbs: 12, fats: 10, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3' },
        { name: 'Roasted Channa', calories: 220, protein: 15, carbs: 22, fats: 8, imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3' },
        { name: 'Baked Fish with Methi', calories: 420, protein: 32, carbs: 25, fats: 15, imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3' }
      ],
      totalCalories: 1490,
      totalProtein: 107,
      totalCarbs: 94,
      totalFats: 50
    }
  ],
  'muscle-gain': [
    {
      id: 'mg1',
      name: 'High Protein Indian Plan',
      description: 'Protein-packed meals inspired by Indian cuisine for muscle building',
      type: 'muscle-gain',
      meals: [
        { name: 'Paneer Bhurji with Whole Wheat Roti', calories: 520, protein: 35, carbs: 60, fats: 12, imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3' },
        { name: 'Greek Yogurt with Berries and Honey', calories: 280, protein: 20, carbs: 30, fats: 8, imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3' },
        { name: 'Chicken Biryani with Raita', calories: 650, protein: 45, carbs: 70, fats: 15, imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3' },
        { name: 'Protein Lassi', calories: 320, protein: 30, carbs: 25, fats: 5, imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3' },
        { name: 'Tandoori Lamb with Sweet Potato', calories: 720, protein: 50, carbs: 65, fats: 25, imageUrl: 'https://images.unsplash.com/photo-1514516816566-de580c621376?ixlib=rb-4.0.3' }
      ],
      totalCalories: 2490,
      totalProtein: 180,
      totalCarbs: 250,
      totalFats: 65
    }
  ],
  'athletic-performance': [
    {
      id: 'ap1',
      name: 'Balanced Energy Indian Plan',
      description: 'A blend of carbs and proteins for sustained energy throughout workouts',
      type: 'athletic-performance',
      meals: [
        { name: 'Multigrain Dosa with Avocado', calories: 420, protein: 22, carbs: 35, fats: 18, imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dad5e?ixlib=rb-4.0.3' },
        { name: 'Mixed Dry Fruits and Seeds', calories: 240, protein: 8, carbs: 26, fats: 12, imageUrl: 'https://images.unsplash.com/photo-1596591868231-05e284d7719a?ixlib=rb-4.0.3' },
        { name: 'Rajma Chawal Bowl', calories: 580, protein: 28, carbs: 65, fats: 20, imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3' },
        { name: 'Banana with Peanut Butter', calories: 250, protein: 8, carbs: 30, fats: 12, imageUrl: 'https://images.unsplash.com/photo-1552443780-5d14bd19102d?ixlib=rb-4.0.3' },
        { name: 'Fish Tikka Wraps', calories: 480, protein: 32, carbs: 45, fats: 15, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3' }
      ],
      totalCalories: 1970,
      totalProtein: 98,
      totalCarbs: 201,
      totalFats: 77
    }
  ]
};

// User's current nutrition stats
const userNutritionStats = {
  caloriesConsumed: 1650,
  waterIntake: 1.8, // in liters
  mealsLogged: 3,
  carbsPercentage: 45,
  proteinPercentage: 30,
  fatsPercentage: 25,
};

export const nutritionService = {
  // Get meal plans by type
  getMealPlans: async (type: 'weight-loss' | 'muscle-gain' | 'athletic-performance'): Promise<MealPlan[]> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 700));
    return mealPlans[type] || [];
  },

  // Get user's nutrition stats
  getNutritionStats: async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    return userNutritionStats;
  },

  // Generate meal plan based on user preferences
  generateMealPlan: async (
    type: 'weight-loss' | 'muscle-gain' | 'athletic-performance',
    calorieTarget: number,
    preferences: string[]
  ): Promise<MealPlan> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return the first meal plan of the requested type
    return mealPlans[type][0];
  },

  // Log food intake
  logFood: async (foodName: string, calories: number, protein: number, carbs: number, fats: number): Promise<boolean> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Update nutrition stats (in a real app, this would be server-side)
    userNutritionStats.caloriesConsumed += calories;
    userNutritionStats.mealsLogged += 1;
    
    return true;
  },

  // Update water intake
  updateWaterIntake: async (amount: number): Promise<number> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Update water intake (in a real app, this would be server-side)
    userNutritionStats.waterIntake = amount;
    
    return amount;
  }
};
