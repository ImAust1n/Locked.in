
import { useState, useEffect } from 'react';
import { Activity, Droplets, PieChart, Timer, Zap } from 'lucide-react';
import { toast } from 'sonner';

type FitnessCard = {
  id: string;
  title: string;
  icon: React.ElementType;
  value: number | string;
  unit: string;
  color: string;
  progress?: number;
};

export const FitnessCards = () => {
  const [cards, setCards] = useState<FitnessCard[]>([
    { 
      id: 'steps', 
      title: 'Steps', 
      icon: Activity, 
      value: 8743, 
      unit: 'steps',
      color: 'border-glow-green',
      progress: 87
    },
    { 
      id: 'water', 
      title: 'Water', 
      icon: Droplets, 
      value: 1.8, 
      unit: 'L',
      color: 'border-blue-500',
      progress: 60
    },
    { 
      id: 'calories', 
      title: 'Calories', 
      icon: PieChart, 
      value: 1256, 
      unit: 'kcal',
      color: 'border-glow-red',
      progress: 42
    },
    { 
      id: 'active', 
      title: 'Active Time', 
      icon: Timer, 
      value: '01:45', 
      unit: 'hours',
      color: 'border-purple-500',
      progress: 70
    },
    { 
      id: 'points', 
      title: 'XP Points', 
      icon: Zap, 
      value: 2350, 
      unit: 'pts',
      color: 'border-yellow-500',
      progress: 80
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Randomly select a card to update
      const randomIndex = Math.floor(Math.random() * cards.length);
      const cardToUpdate = { ...cards[randomIndex] };
      
      // Update the value based on the card type
      switch (cardToUpdate.id) {
        case 'steps':
          cardToUpdate.value = Math.floor(Number(cardToUpdate.value) + Math.random() * 50);
          cardToUpdate.progress = Math.min(100, Math.floor((Number(cardToUpdate.value) / 10000) * 100));
          break;
        case 'water':
          cardToUpdate.value = Math.min(3, Number(cardToUpdate.value) + Math.random() * 0.1).toFixed(1);
          cardToUpdate.progress = Math.min(100, Math.floor((Number(cardToUpdate.value) / 3) * 100));
          break;
        case 'calories':
          cardToUpdate.value = Math.floor(Number(cardToUpdate.value) + Math.random() * 20);
          cardToUpdate.progress = Math.min(100, Math.floor((Number(cardToUpdate.value) / 3000) * 100));
          break;
        case 'active':
          const minutes = parseInt(cardToUpdate.value.toString().split(':')[0]) * 60 + 
                         parseInt(cardToUpdate.value.toString().split(':')[1]);
          const newMinutes = minutes + Math.floor(Math.random() * 5);
          const hours = Math.floor(newMinutes / 60);
          const mins = newMinutes % 60;
          cardToUpdate.value = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
          cardToUpdate.progress = Math.min(100, Math.floor((newMinutes / 150) * 100));
          break;
        case 'points':
          cardToUpdate.value = Math.floor(Number(cardToUpdate.value) + Math.random() * 15);
          cardToUpdate.progress = Math.min(100, Math.floor((Number(cardToUpdate.value) / 3000) * 100));
          break;
      }
      
      // Update the card in state
      const updatedCards = [...cards];
      updatedCards[randomIndex] = cardToUpdate;
      setCards(updatedCards);
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [cards]);

  const handleCardClick = (card: FitnessCard) => {
    toast.info(`${card.title} details coming soon`, {
      description: `Current value: ${card.value} ${card.unit}`
    });
  };

  const handleAddNewCard = () => {
    toast.info("Add new card feature coming soon");
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Your Fitness Tracker</h2>
            <p className="text-gray-400">Daily stats and progress</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="btn-glow text-sm" onClick={handleAddNewCard}>Add New Card</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`glass-card p-4 rounded-lg border-t-2 ${card.color} hover:shadow-lg hover:shadow-${card.color}/20 transition-all duration-300 cursor-pointer`}
              onClick={() => handleCardClick(card)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-md bg-black/50">
                  <card.icon size={18} className="text-white" />
                </div>
                <div className="text-xs text-gray-400">Today</div>
              </div>
              
              <div className="mb-2">
                <h3 className="font-medium text-white">{card.title}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-orbitron font-bold text-white">{card.value}</span>
                  <span className="text-xs text-gray-400 mb-1">{card.unit}</span>
                </div>
              </div>
              
              {card.progress && (
                <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-2">
                  <div 
                    className={`h-1.5 rounded-full ${
                      card.id === 'steps' ? 'bg-glow-green' :
                      card.id === 'water' ? 'bg-blue-500' :
                      card.id === 'calories' ? 'bg-glow-red' :
                      card.id === 'active' ? 'bg-purple-500' : 'bg-yellow-500'
                    }`} 
                    style={{ width: `${card.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
