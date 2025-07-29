export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  trainer: string;
  category: string;
  image: string;
}

export interface FitnessStats {
  workoutsCompleted: number;
  minutesExercised: number;
  caloriesBurned: number;
  stepsToday: number;
  weeklyActivity: {
    day: string;
    minutes: number;
  }[];
}

// Mock video data interface
export interface VideoItem {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  level: string;
  category: string;
}

// Exported service with methods
export const fitnessService = {
  // Existing methods
  getWorkoutPlans: async (): Promise<WorkoutPlan[]> => {
    // Simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: '30-Day Full Body Challenge',
            description: 'Transform your body in just 30 days with this comprehensive workout plan',
            difficulty: 'Intermediate',
            duration: '30 days',
            trainer: 'Alex Johnson',
            category: 'strength',
            image: '/f11.jpg'
          },
          {
            id: '2',
            title: 'HIIT Cardio Blast',
            description: 'Intensive cardio workouts to boost your metabolism and burn calories',
            difficulty: 'Advanced',
            duration: '14 days',
            trainer: 'Samantha Lee',
            category: 'cardio',
            image: '/f5.jpg'
          },
          {
            id: '3',
            title: 'Yoga for Beginners',
            description: 'Start your yoga journey with simple poses and breathing techniques',
            difficulty: 'Beginner',
            duration: '21 days',
            trainer: 'Michael Chen',
            category: 'yoga',
            image: '/f6.jpg'
          },
          {
            id: '4',
            title: 'Core Strength Builder',
            description: 'Focus on building a strong and stable core with targeted exercises',
            difficulty: 'Intermediate',
            duration: '14 days',
            trainer: 'Lisa Rodriguez',
            category: 'core',
            image: '/f9.jpg'
          },
          {
            id: '5',
            title: 'Flexibility & Mobility',
            description: 'Improve your range of motion and prevent injuries with these routines',
            difficulty: 'Beginner',
            duration: '28 days',
            trainer: 'David Kim',
            category: 'flexibility',
            image: '/f4.jpg'
          }
        ]);
      }, 800);
    });
  },

  getWorkoutPlan: async (id: string): Promise<WorkoutPlan> => {
    // Simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          title: '30-Day Full Body Challenge',
          description: 'Transform your body in just 30 days with this comprehensive workout plan that targets all major muscle groups. This plan includes a mix of strength training, cardio, and recovery sessions to ensure balanced progress.',
          difficulty: 'Intermediate',
          duration: '30 days',
          trainer: 'Alex Johnson',
          category: 'strength',
          image: '/f11.jpg'
        });
      }, 600);
    });
  },

  getUserStats: async (): Promise<FitnessStats> => {
    // Simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          workoutsCompleted: 24,
          minutesExercised: 840,
          caloriesBurned: 6240,
          stepsToday: 8456,
          weeklyActivity: [
            { day: 'Mon', minutes: 45 },
            { day: 'Tue', minutes: 30 },
            { day: 'Wed', minutes: 0 },
            { day: 'Thu', minutes: 60 },
            { day: 'Fri', minutes: 45 },
            { day: 'Sat', minutes: 90 },
            { day: 'Sun', minutes: 30 }
          ]
        });
      }, 700);
    });
  },

  logWorkout: async (workoutId: string, duration: number, caloriesBurned: number) => {
    // Simulate API call with timeout
    return new Promise((resolve) => {
      console.log(`Logging workout: ${workoutId}, duration: ${duration}, calories: ${caloriesBurned}`);
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  updateSteps: async (steps: number) => {
    // Simulate API call with timeout
    return new Promise((resolve) => {
      console.log(`Updating steps: ${steps}`);
      setTimeout(() => {
        resolve({ success: true });
      }, 400);
    });
  },

  // Add the missing getVideos method
  getVideos: async (category: string, filters: {time: string; intensity: string; equipment: string}): Promise<VideoItem[]> => {
    // Simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data for videos
        const allVideos = [
          {
            id: 'v1',
            title: 'Full Body HIIT',
            instructor: 'Alex Johnson',
            thumbnail: '/f5.jpg',
            duration: '30 min',
            level: 'Advanced',
            category: 'hiit'
          },
          {
            id: 'v2',
            title: 'Beginner Yoga Flow',
            instructor: 'Samantha Lee',
            thumbnail: '/f6.jpg',
            duration: '20 min',
            level: 'Beginner',
            category: 'yoga'
          },
          {
            id: 'v3',
            title: 'Strength Training Basics',
            instructor: 'Michael Chen',
            thumbnail: '/f7.jpg',
            duration: '45 min',
            level: 'Intermediate',
            category: 'strength'
          },
          {
            id: 'v4',
            title: 'Cardio Kickboxing',
            instructor: 'Lisa Rodriguez',
            thumbnail: '/f8.jpg',
            duration: '35 min',
            level: 'Intermediate',
            category: 'cardio'
          },
          {
            id: 'v5',
            title: 'Core Workout',
            instructor: 'David Kim',
            thumbnail: '/f9.jpg',
            duration: '15 min',
            level: 'Beginner',
            category: 'core'
          },
          {
            id: 'v6',
            title: 'Advanced Pilates',
            instructor: 'Emma Wilson',
            thumbnail: '/f10.jpg',
            duration: '40 min',
            level: 'Advanced',
            category: 'pilates'
          }
        ];
        
        // Filter based on category and other filters
        let filteredVideos = [...allVideos];
        
        if (category !== 'all') {
          filteredVideos = filteredVideos.filter(video => video.category === category);
        }
        
        // Apply additional filters if they are not set to 'all'
        if (filters.time !== 'all') {
          // Simple filtering logic - can be enhanced based on requirements
          const timeMap: {[key: string]: number[]} = {
            'short': [0, 20],
            'medium': [21, 40],
            'long': [41, 100]
          };
          
          if (filters.time in timeMap) {
            const [min, max] = timeMap[filters.time];
            filteredVideos = filteredVideos.filter(video => {
              const minutes = parseInt(video.duration);
              return minutes >= min && minutes <= max;
            });
          }
        }
        
        if (filters.intensity !== 'all') {
          filteredVideos = filteredVideos.filter(video => {
            // Map intensity filter to level
            const intensityMap: {[key: string]: string} = {
              'low': 'Beginner',
              'medium': 'Intermediate',
              'high': 'Advanced'
            };
            
            return video.level === intensityMap[filters.intensity];
          });
        }
        
        // Note: Equipment filter would be implemented similarly if video data included equipment info
        
        resolve(filteredVideos);
      }, 800);
    });
  }
};
