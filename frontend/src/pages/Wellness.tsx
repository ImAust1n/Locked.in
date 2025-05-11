
import { useState, useEffect } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { PageBackground } from "../components/ui/PageBackground";
import { WellnessHero } from "../components/wellness/WellnessHero";
import { SleepTracker } from "../components/wellness/SleepTracker";
import { StressInsights } from "../components/wellness/StressInsights";
import { MeditationLibrary } from "../components/wellness/MeditationLibrary";
import { MoodTracker } from "../components/wellness/MoodTracker";
import { SleepLogModal } from "../components/wellness/SleepLogModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Activity, HeartPulse } from "lucide-react";
import { wellnessService } from "@/services/wellnessService";
import { toast } from "sonner";

const Wellness = () => {
  const [activeTab, setActiveTab] = useState('sleep');
  const [sleepData, setSleepData] = useState<any[]>([]);
  const [stressData, setStressData] = useState<any[]>([]);
  const [moodData, setMoodData] = useState<any[]>([]);
  const [isSleepLogOpen, setIsSleepLogOpen] = useState(false);
  const [loading, setLoading] = useState({
    sleep: true,
    stress: true,
    mood: true
  });

  useEffect(() => {
    const fetchWellnessData = async () => {
      try {
        // Fetch sleep data
        const sleep = await wellnessService.getSleepData();
        setSleepData(sleep);
        setLoading(prev => ({ ...prev, sleep: false }));
        
        // Fetch stress data
        const stress = await wellnessService.getStressData();
        setStressData(stress);
        setLoading(prev => ({ ...prev, stress: false }));
        
        // Fetch mood data
        const mood = await wellnessService.getMoodData();
        setMoodData(mood);
        setLoading(prev => ({ ...prev, mood: false }));
      } catch (error) {
        console.error('Failed to fetch wellness data:', error);
        toast.error('Failed to load wellness data');
      }
    };
    
    fetchWellnessData();
  }, []);

  // When user switches tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // If this is the first time loading this tab, we could refresh the data
    if (value === 'sleep' && !loading.sleep) {
      // For demo purposes, we'll just show a toast
      toast.info("Sleep data refreshed");
    } else if (value === 'stress' && !loading.stress) {
      toast.info("Stress data refreshed");
    } else if (value === 'meditation') {
      toast.info("Meditation library loaded");
    }
  };

  const handleLogSleep = async (sleepData: any) => {
    try {
      await wellnessService.logSleep(
        calculateDuration(sleepData.sleepStart, sleepData.wakeTime), 
        sleepData.quality
      );
      toast.success("Sleep data logged successfully");
      
      // Refetch data to update the UI
      const updatedData = await wellnessService.getSleepData();
      setSleepData(updatedData);
      setIsSleepLogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to log sleep data");
    }
  };

  const handleLogMood = async (mood: any, energy: any, notes: any) => {
    try {
      await wellnessService.logMood(mood, energy, notes);
      toast.success("Mood data logged successfully");
      
      // Refetch data to update the UI
      const updatedData = await wellnessService.getMoodData();
      setMoodData(updatedData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to log mood data");
    }
  };

  // Helper function to calculate sleep duration
  const calculateDuration = (start: string, end: string): number => {
    // Simple calculation for demo purposes
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    
    let duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    
    // Handle overnight sleep
    if (duration < 0) {
      duration += 24 * 60;
    }
    
    // Return duration in hours
    return Math.round(duration / 60 * 10) / 10;
  };

  return (
    <PageBackground>
      <Navbar />
      <main>
        <WellnessHero />
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="sleep" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="sleep" className="flex items-center gap-2">
                <Moon size={16} />
                <span>Sleep Tracking</span>
              </TabsTrigger>
              <TabsTrigger value="stress" className="flex items-center gap-2">
                <HeartPulse size={16} />
                <span>Stress & Recovery</span>
              </TabsTrigger>
              <TabsTrigger value="meditation" className="flex items-center gap-2">
                <Activity size={16} />
                <span>Meditation</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sleep" className="space-y-6">
              <SleepTracker 
                data={sleepData} 
                loading={loading.sleep} 
                onLogSleep={() => setIsSleepLogOpen(true)}
              />
              <MoodTracker 
                data={moodData} 
                loading={loading.mood} 
                onLogMood={handleLogMood}
              />
            </TabsContent>
            
            <TabsContent value="stress" className="space-y-6">
              <StressInsights 
                data={stressData} 
                loading={loading.stress} 
              />
            </TabsContent>
            
            <TabsContent value="meditation" className="space-y-6">
              <MeditationLibrary 
                onMeditationSelect={(id) => {
                  toast.info(`Starting meditation session`, {
                    description: "Meditation playback functionality coming soon"
                  });
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <AiAssistant />
      
      <SleepLogModal 
        open={isSleepLogOpen}
        onClose={() => setIsSleepLogOpen(false)}
        onSubmit={handleLogSleep}
      />
    </PageBackground>
  );
};

export default Wellness;
