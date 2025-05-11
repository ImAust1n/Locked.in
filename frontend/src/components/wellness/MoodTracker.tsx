
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { MoodData } from '@/services/wellnessService';

interface MoodTrackerProps {
  data: MoodData[];
  loading: boolean;
  onLogMood: (mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible', energy: number, notes?: string) => void;
}

export const MoodTracker = ({ data, loading, onLogMood }: MoodTrackerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMood, setSelectedMood] = useState<number | null>(4);
  const [note, setNote] = useState<string>('');
  
  const moods = [
    { value: 1, emoji: '😔', label: 'Terrible', moodType: 'terrible' as const },
    { value: 2, emoji: '😐', label: 'Bad', moodType: 'bad' as const },
    { value: 3, emoji: '🙂', label: 'Okay', moodType: 'okay' as const },
    { value: 4, emoji: '😊', label: 'Good', moodType: 'good' as const },
    { value: 5, emoji: '😁', label: 'Great', moodType: 'great' as const },
  ];
  
  const handleAddNote = () => {
    if (selectedMood) {
      const selectedMoodObj = moods.find(m => m.value === selectedMood);
      if (selectedMoodObj) {
        onLogMood(selectedMoodObj.moodType, selectedMood * 2, note); // Scale mood 1-5 to energy 2-10
        setNote('');
      }
    }
  };

  return (
    <div className="glass-card rounded-xl border border-glow-green/20 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Mood Tracker</h2>
        <p className="text-gray-400">Track how you feel and identify patterns</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Select Date & Mood</h3>
          <div className="mb-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-gray-700 p-3"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">How are you feeling today?</h4>
            <div className="flex justify-between">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all ${
                    selectedMood === mood.value
                      ? 'bg-glow-green/20 border border-glow-green/50 scale-110'
                      : 'bg-black/30 border border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="text-xs mt-1">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Add Note</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-32 bg-black/30 border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:border-glow-green/50 transition-colors"
            placeholder="How are you feeling today? What factors might be affecting your mood?"
          ></textarea>
          
          <button 
            onClick={handleAddNote} 
            className="btn-glow w-full py-2 rounded-lg bg-glow-green/20 border border-glow-green/50 text-glow-green hover:bg-glow-green/30 transition-colors"
            disabled={!selectedMood}
          >
            Save Today's Entry
          </button>
          
          <div className="mt-6 p-4 bg-black/20 rounded-lg">
            <h4 className="text-sm font-medium mb-2">AI Mood Insights</h4>
            <p className="text-xs text-gray-400">
              {data.length > 0 ? 
                "Your mood has been consistently positive for the past week! Continue your morning meditation and regular exercise routine as they seem to be working well for you." :
                "Start logging your mood daily to receive personalized insights and recommendations."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
