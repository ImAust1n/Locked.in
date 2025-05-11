
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Moon } from 'lucide-react';

interface SleepLogModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (sleepData: {
    sleepStart: string;
    wakeTime: string;
    quality: number;
    notes: string;
  }) => void;
}

export const SleepLogModal = ({ open, onClose, onSubmit }: SleepLogModalProps) => {
  const [sleepData, setSleepData] = useState({
    sleepStart: '',
    wakeTime: '',
    quality: 3,
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSleepData(prev => ({
      ...prev,
      [name]: name === 'quality' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(sleepData);
    // Reset form after submit
    setSleepData({
      sleepStart: '',
      wakeTime: '',
      quality: 3,
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center font-orbitron">
            <Moon size={18} className="mr-2 text-glow-green" />
            Log Sleep
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sleepStart">Sleep Time</Label>
              <Input
                id="sleepStart"
                name="sleepStart"
                type="time"
                value={sleepData.sleepStart}
                onChange={handleChange}
                className="bg-black/30 border-white/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wakeTime">Wake Time</Label>
              <Input
                id="wakeTime"
                name="wakeTime"
                type="time"
                value={sleepData.wakeTime}
                onChange={handleChange}
                className="bg-black/30 border-white/20"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quality">Sleep Quality (1-5)</Label>
            <div className="flex items-center space-x-2">
              <input
                id="quality"
                name="quality"
                type="range"
                min="1"
                max="5"
                value={sleepData.quality}
                onChange={handleChange}
                className="w-full"
              />
              <span className="bg-glow-green/20 text-glow-green px-2 py-1 rounded font-mono">
                {sleepData.quality}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 px-2">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <textarea
              id="notes"
              name="notes"
              value={sleepData.notes}
              onChange={handleChange}
              className="w-full h-20 bg-black/30 border border-white/20 rounded-md px-3 py-2"
              placeholder="Any notes about your sleep..."
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
              Log Sleep
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
