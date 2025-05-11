
export interface SleepData {
  date: string;
  duration: number; // in hours
  quality: number; // 1-10
  deepSleep: number; // in hours
  remSleep: number; // in hours
  lightSleep: number; // in hours
}

export interface StressData {
  date: string;
  level: number; // 1-10
  heartRate: number; // average BPM
  hrvScore: number; // heart rate variability
}

export interface MoodData {
  date: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  energy: number; // 1-10
  notes?: string;
}

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: string;
  audioUrl: string;
  imageUrl?: string;
}

// Mock data
const sleepData: SleepData[] = [
  { date: '2023-05-10', duration: 7.5, quality: 8, deepSleep: 1.5, remSleep: 2, lightSleep: 4 },
  { date: '2023-05-09', duration: 6.8, quality: 7, deepSleep: 1.2, remSleep: 1.8, lightSleep: 3.8 },
  { date: '2023-05-08', duration: 8.2, quality: 9, deepSleep: 1.8, remSleep: 2.2, lightSleep: 4.2 },
  { date: '2023-05-07', duration: 7, quality: 6, deepSleep: 1.3, remSleep: 1.7, lightSleep: 4 },
  { date: '2023-05-06', duration: 7.8, quality: 8, deepSleep: 1.6, remSleep: 2.1, lightSleep: 4.1 },
  { date: '2023-05-05', duration: 6.5, quality: 6, deepSleep: 1.1, remSleep: 1.6, lightSleep: 3.8 },
  { date: '2023-05-04', duration: 7.2, quality: 7, deepSleep: 1.4, remSleep: 1.9, lightSleep: 3.9 },
];

const stressData: StressData[] = [
  { date: '2023-05-10', level: 4, heartRate: 68, hrvScore: 65 },
  { date: '2023-05-09', level: 6, heartRate: 72, hrvScore: 55 },
  { date: '2023-05-08', level: 3, heartRate: 65, hrvScore: 70 },
  { date: '2023-05-07', level: 7, heartRate: 76, hrvScore: 50 },
  { date: '2023-05-06', level: 5, heartRate: 70, hrvScore: 60 },
  { date: '2023-05-05', level: 8, heartRate: 78, hrvScore: 45 },
  { date: '2023-05-04', level: 4, heartRate: 69, hrvScore: 62 },
];

const moodData: MoodData[] = [
  { date: '2023-05-10', mood: 'good', energy: 7 },
  { date: '2023-05-09', mood: 'okay', energy: 5 },
  { date: '2023-05-08', mood: 'great', energy: 9 },
  { date: '2023-05-07', mood: 'bad', energy: 3 },
  { date: '2023-05-06', mood: 'good', energy: 7 },
  { date: '2023-05-05', mood: 'okay', energy: 6 },
  { date: '2023-05-04', mood: 'good', energy: 8 },
];

const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Mindful Morning',
    description: 'Start your day with clarity and purpose with this guided meditation',
    duration: 10,
    category: 'morning',
    audioUrl: '/meditation-audio.mp3', // placeholder
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Evening Wind Down',
    description: 'Release the tension of the day and prepare for restful sleep',
    duration: 15,
    category: 'evening',
    audioUrl: '/meditation-audio.mp3', // placeholder
    imageUrl: 'https://images.unsplash.com/photo-1515894274784-5f8c2a6e9578?ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'Stress Relief Breathing',
    description: 'Reduce stress and anxiety with deep breathing techniques',
    duration: 8,
    category: 'stress',
    audioUrl: '/meditation-audio.mp3', // placeholder
    imageUrl: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?ixlib=rb-4.0.3'
  },
  {
    id: '4',
    title: 'Focus Enhancer',
    description: 'Sharpen your concentration and mental clarity',
    duration: 12,
    category: 'focus',
    audioUrl: '/meditation-audio.mp3', // placeholder
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3'
  },
  {
    id: '5',
    title: 'Body Scan Relaxation',
    description: 'Progressively relax your entire body for deep relaxation',
    duration: 20,
    category: 'relaxation',
    audioUrl: '/meditation-audio.mp3', // placeholder
    imageUrl: 'https://images.unsplash.com/photo-1536621888777-682409ccd25e?ixlib=rb-4.0.3'
  },
];

export const wellnessService = {
  // Get sleep data
  getSleepData: async (): Promise<SleepData[]> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    return sleepData;
  },

  // Get stress data
  getStressData: async (): Promise<StressData[]> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 700));
    return stressData;
  },

  // Get mood data
  getMoodData: async (): Promise<MoodData[]> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 600));
    return moodData;
  },

  // Log sleep data
  logSleep: async (duration: number, quality: number): Promise<boolean> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const date = new Date().toISOString().split('T')[0];
    const deepSleep = duration * 0.2;
    const remSleep = duration * 0.25;
    const lightSleep = duration * 0.55;
    
    const newSleepEntry: SleepData = {
      date,
      duration,
      quality,
      deepSleep,
      remSleep,
      lightSleep
    };
    
    // In a real app, this would be sent to the server
    sleepData.unshift(newSleepEntry);
    
    return true;
  },

  // Log mood data
  logMood: async (mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible', energy: number, notes?: string): Promise<boolean> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const date = new Date().toISOString().split('T')[0];
    
    const newMoodEntry: MoodData = {
      date,
      mood,
      energy,
      notes
    };
    
    // In a real app, this would be sent to the server
    moodData.unshift(newMoodEntry);
    
    return true;
  },

  // Get meditations
  getMeditations: async (): Promise<Meditation[]> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 600));
    return meditations;
  },

  // Get meditation by id
  getMeditation: async (id: string): Promise<Meditation | null> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 300));
    const meditation = meditations.find(m => m.id === id);
    return meditation || null;
  }
};
