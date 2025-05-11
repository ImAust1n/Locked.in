
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddCardModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (card: {
    title: string;
    type: 'workout' | 'nutrition';
    content: string;
  }) => void;
}

export const AddCardModal = ({ open, onClose, onSave }: AddCardModalProps) => {
  const [card, setCard] = useState({
    title: '',
    type: 'workout' as 'workout' | 'nutrition',
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCard(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(card);
    // Reset form after submit
    setCard({
      title: '',
      type: 'workout',
      content: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center font-orbitron">
            Add New Card
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={card.title}
              onChange={handleChange}
              className="bg-black/30 border-white/20"
              placeholder="Enter card title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Card Type</Label>
            <select
              id="type"
              name="type"
              value={card.type}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/20 rounded-md px-3 py-2"
              required
            >
              <option value="workout">Workout</option>
              <option value="nutrition">Nutrition</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={card.content}
              onChange={handleChange}
              className="w-full h-32 bg-black/30 border border-white/20 rounded-md px-3 py-2"
              placeholder="Enter card content..."
              required
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
              Save Card
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
