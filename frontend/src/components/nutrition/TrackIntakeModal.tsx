
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface TrackIntakeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (items: FoodItem[]) => void;
}

export const TrackIntakeModal = ({ open, onClose, onSave }: TrackIntakeModalProps) => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [newItem, setNewItem] = useState<FoodItem>({
    id: Date.now(),
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }));
  };

  const addItem = () => {
    if (newItem.name.trim() === '') return;
    
    setItems(prev => [...prev, { ...newItem, id: Date.now() }]);
    setNewItem({
      id: Date.now(),
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    });
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(items);
  };

  // Calculate totals
  const totals = {
    calories: items.reduce((sum, item) => sum + item.calories, 0),
    protein: items.reduce((sum, item) => sum + item.protein, 0),
    carbs: items.reduce((sum, item) => sum + item.carbs, 0),
    fats: items.reduce((sum, item) => sum + item.fats, 0)
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center font-orbitron">
            Track Food Intake
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Add Food Item</Label>
            <div className="grid grid-cols-5 gap-2">
              <Input
                name="name"
                value={newItem.name}
                onChange={handleItemChange}
                className="bg-black/30 border-white/20 col-span-2"
                placeholder="Food name"
              />
              <Input
                name="calories"
                type="number"
                min="0"
                value={newItem.calories}
                onChange={handleItemChange}
                className="bg-black/30 border-white/20"
                placeholder="Cal"
              />
              <Input
                name="protein"
                type="number"
                min="0"
                value={newItem.protein}
                onChange={handleItemChange}
                className="bg-black/30 border-white/20"
                placeholder="Protein (g)"
              />
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  onClick={addItem}
                  className="bg-glow-green text-black hover:bg-glow-green/80"
                >
                  <PlusCircle size={16} />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-2"></div>
              <div className="text-xs text-gray-400 text-center">Calories</div>
              <div className="text-xs text-gray-400 text-center">Protein (g)</div>
              <div></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Food Items</Label>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {items.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No items added yet</p>
              ) : (
                items.map(item => (
                  <div key={item.id} className="grid grid-cols-5 gap-2 p-2 bg-black/20 border border-white/10 rounded-md items-center">
                    <div className="col-span-2 font-medium">{item.name}</div>
                    <div className="text-center">{item.calories}</div>
                    <div className="text-center">{item.protein}g</div>
                    <div className="flex justify-center">
                      <Button 
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-glow-red hover:text-glow-red hover:bg-glow-red/10"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {items.length > 0 && (
            <div className="p-3 bg-glow-green/10 border border-glow-green/30 rounded-md">
              <p className="text-sm font-medium mb-2">Meal Summary</p>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <p className="text-xs text-gray-400">Calories</p>
                  <p className="font-medium">{totals.calories}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Protein</p>
                  <p className="font-medium">{totals.protein}g</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Carbs</p>
                  <p className="font-medium">{totals.carbs}g</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Fats</p>
                  <p className="font-medium">{totals.fats}g</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-white/20">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-glow-green text-black hover:bg-glow-green/80"
              disabled={items.length === 0}
            >
              Save Intake
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
