
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface WorkoutDay {
  dayName: string;
  focus: string;
  exercises: string[];
  duration: string;
}

interface WeeklyPlannerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const WeeklyPlannerModal = ({ open, onClose, onSave }: WeeklyPlannerModalProps) => {
  // Pre-generated workout plan
  const [workoutPlan] = useState<WorkoutDay[]>([
    {
      dayName: 'Monday',
      focus: 'Upper Body Strength',
      exercises: [
        'Bench Press - 4x8',
        'Pull-ups - 3x10',
        'Shoulder Press - 3x12',
        'Tricep Extensions - 3x15'
      ],
      duration: '45-60 min'
    },
    {
      dayName: 'Tuesday',
      focus: 'Lower Body Power',
      exercises: [
        'Squats - 5x5',
        'Deadlifts - 4x6',
        'Leg Press - 3x12',
        'Calf Raises - 4x20'
      ],
      duration: '50-65 min'
    },
    {
      dayName: 'Wednesday',
      focus: 'Active Recovery',
      exercises: [
        'Light Cardio - 20 min',
        'Mobility Work - 15 min',
        'Foam Rolling - 10 min',
        'Stretching - 15 min'
      ],
      duration: '30-45 min'
    },
    {
      dayName: 'Thursday',
      focus: 'Core & Conditioning',
      exercises: [
        'Circuit Training - 3 rounds',
        'Plank Variations - 3 min total',
        'Russian Twists - 3x20',
        'HIIT - 10 min'
      ],
      duration: '40-50 min'
    },
    {
      dayName: 'Friday',
      focus: 'Full Body Strength',
      exercises: [
        'Deadlifts - 3x8',
        'Push-ups - 3x15',
        'Kettlebell Swings - 3x15',
        'Dumbbell Rows - 3x12'
      ],
      duration: '45-60 min'
    },
    {
      dayName: 'Saturday',
      focus: 'Endurance',
      exercises: [
        'Jogging/Running - 30 min',
        'Cycling - 20 min',
        'Jump Rope - 10 min',
        'Bodyweight Circuit - 2 rounds'
      ],
      duration: '50-70 min'
    },
    {
      dayName: 'Sunday',
      focus: 'Rest Day',
      exercises: [
        'Light Walking - 20-30 min',
        'Gentle Yoga - 15-20 min',
        'Meditation - 10 min',
        'Stretching - 10-15 min'
      ],
      duration: '30-45 min'
    }
  ]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center font-orbitron">
            <Calendar size={20} className="mr-2 text-glow-green" />
            Weekly Workout Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {workoutPlan.map((day) => (
              <div 
                key={day.dayName} 
                className="bg-black/30 border border-white/10 rounded-md p-3 hover:border-glow-green/30 transition-all"
              >
                <div className="bg-glow-green/10 rounded px-2 py-1 mb-2">
                  <h3 className="font-semibold text-center">{day.dayName}</h3>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-gray-400">FOCUS</p>
                  <p className="font-medium text-sm">{day.focus}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-gray-400">EXERCISES</p>
                  <ul className="list-disc pl-4 text-xs space-y-1">
                    {day.exercises.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-gray-400">DURATION</p>
                  <p className="text-xs">{day.duration}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-glow-green/10 border border-glow-green/30 rounded-md p-4">
            <h4 className="font-medium mb-2">Training Tips</h4>
            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-300">
              <li>Warm up properly before each workout (5-10 minutes).</li>
              <li>Stay hydrated and maintain proper nutrition on training days.</li>
              <li>Adjust weights and intensity based on how you feel.</li>
              <li>Take rest days seriously—they're when your body rebuilds!</li>
              <li>Track your progress to stay motivated and see improvements.</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={onClose} className="border-white/20">
            Close
          </Button>
          <Button 
            onClick={() => {
              onSave();
              onClose();
            }} 
            className="bg-glow-green text-black hover:bg-glow-green/80"
          >
            Save Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
