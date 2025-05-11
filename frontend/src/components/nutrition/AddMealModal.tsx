
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddMealModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (meal: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    notes?: string;
  }) => void;
}

export const AddMealModal = ({ open, onClose, onSave }: AddMealModalProps) => {
  const [meal, setMeal] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    notes: '',
  });

  // Calculate calories automatically based on macros
  useEffect(() => {
    const calculatedCalories = meal.protein * 4 + meal.carbs * 4 + meal.fats * 9;
    if (calculatedCalories > 0 && meal.calories !== calculatedCalories) {
      setMeal(prev => ({
        ...prev,
        calories: calculatedCalories,
      }));
    }
  }, [meal.protein, meal.carbs, meal.fats]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeal(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'notes' ? value : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(meal);
    // Reset form after submit
    setMeal({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center font-orbitron">
            Add Custom Meal
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Meal Name</Label>
            <Input
              id="name"
              name="name"
              value={meal.name}
              onChange={handleChange}
              className="bg-black/30 border-white/20"
              placeholder="E.g., Chicken Salad"
              required
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                name="protein"
                type="number"
                min="0"
                value={meal.protein}
                onChange={handleChange}
                className="bg-black/30 border-white/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                name="carbs"
                type="number"
                min="0"
                value={meal.carbs}
                onChange={handleChange}
                className="bg-black/30 border-white/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fats">Fats (g)</Label>
              <Input
                id="fats"
                name="fats"
                type="number"
                min="0"
                value={meal.fats}
                onChange={handleChange}
                className="bg-black/30 border-white/20"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="calories">Calories (calculated)</Label>
            <Input
              id="calories"
              name="calories"
              type="number"
              value={meal.calories}
              onChange={handleChange}
              className="bg-black/30 border-glow-green/30"
              disabled
            />
            <p className="text-xs text-gray-400">
              Calculated from macros: Protein (4 cal/g) + Carbs (4 cal/g) + Fats (9 cal/g)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <textarea
              id="notes"
              name="notes"
              value={meal.notes}
              onChange={handleChange}
              className="w-full h-20 bg-black/30 border border-white/20 rounded-md px-3 py-2"
              placeholder="Any additional details..."
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-white/20">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-glow-green text-black hover:bg-glow-green/80"
            >
              Add Meal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
