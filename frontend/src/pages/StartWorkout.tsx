
import { useState, useEffect, useRef } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { PageBackground } from "../components/ui/PageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Play, Pause, RefreshCcw, Plus, Minus } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const StartWorkout = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [restTime, setRestTime] = useState(60);
  const [exerciseType, setExerciseType] = useState('Strength');
  const [showSettings, setShowSettings] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setRunning(true);
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTime(0);
    setWorkoutComplete(false);
  };

  const completeWorkout = () => {
    pauseTimer();
    setWorkoutComplete(true);
    toast.success("Workout completed! Great job!");
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Sample workout plan data (would be fetched based on planId in a real app)
  const workoutPlan = {
    title: planId ? `Workout Plan ${planId}` : 'Today\'s Workout',
    description: 'Complete the following exercises with proper form',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: 12 },
      { name: 'Squats', sets: 4, reps: 15 },
      { name: 'Pull-ups', sets: 3, reps: 8 },
      { name: 'Lunges', sets: 3, reps: 10 },
      { name: 'Plank', sets: 3, reps: '30 seconds' },
    ]
  };

  const adjustValue = (value: number, change: number, min: number, max: number): number => {
    const newValue = value + change;
    return Math.min(Math.max(newValue, min), max);
  };

  return (
    <PageBackground>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center">
                  <span className="text-white">{workoutPlan.title}</span>
                  <span className="ml-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowSettings(!showSettings)}
                      className="bg-black/30 border-white/20"
                    >
                      {showSettings ? 'Hide Settings' : 'Show Settings'}
                    </Button>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">{workoutPlan.description}</p>
                
                {showSettings && (
                  <div className="bg-black/30 border border-white/10 rounded-md p-4 mb-6 animate-fade-in">
                    <h3 className="font-bold mb-3">Workout Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="exerciseType">Exercise Type</Label>
                        <select
                          id="exerciseType"
                          value={exerciseType}
                          onChange={(e) => setExerciseType(e.target.value)}
                          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
                        >
                          <option>Strength</option>
                          <option>Cardio</option>
                          <option>Flexibility</option>
                          <option>HIIT</option>
                          <option>Custom</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Label htmlFor="voiceGuide">Voice Guidance</Label>
                          <div className="flex items-center gap-2">
                            <Switch id="voiceGuide" />
                            <span className="text-sm text-gray-400">On</span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <Label htmlFor="autoPause">Auto-pause</Label>
                          <div className="flex items-center gap-2">
                            <Switch id="autoPause" />
                            <span className="text-sm text-gray-400">On</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="sets" className="flex items-center justify-between">
                          <span>Sets</span> 
                          <span className="text-xs text-gray-400">(1-10)</span>
                        </Label>
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 bg-black/30 border-white/20"
                            onClick={() => setSets(s => adjustValue(s, -1, 1, 10))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input 
                            id="sets" 
                            type="number" 
                            min={1} 
                            max={10} 
                            value={sets} 
                            onChange={(e) => setSets(Number(e.target.value))}
                            className="mx-2 bg-black/30 border-white/20 text-center"
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 bg-black/30 border-white/20"
                            onClick={() => setSets(s => adjustValue(s, 1, 1, 10))}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="reps" className="flex items-center justify-between">
                          <span>Reps</span> 
                          <span className="text-xs text-gray-400">(1-50)</span>
                        </Label>
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 bg-black/30 border-white/20"
                            onClick={() => setReps(r => adjustValue(r, -1, 1, 50))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input 
                            id="reps" 
                            type="number" 
                            min={1} 
                            max={50} 
                            value={reps} 
                            onChange={(e) => setReps(Number(e.target.value))}
                            className="mx-2 bg-black/30 border-white/20 text-center"
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 bg-black/30 border-white/20"
                            onClick={() => setReps(r => adjustValue(r, 1, 1, 50))}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="restTime" className="flex items-center justify-between">
                          <span>Rest Time (seconds)</span> 
                          <span className="text-xs text-gray-400">(10-300)</span>
                        </Label>
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 bg-black/30 border-white/20"
                            onClick={() => setRestTime(r => adjustValue(r, -5, 10, 300))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input 
                            id="restTime" 
                            type="number" 
                            min={10} 
                            max={300} 
                            step={5}
                            value={restTime} 
                            onChange={(e) => setRestTime(Number(e.target.value))}
                            className="mx-2 bg-black/30 border-white/20 text-center"
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 bg-black/30 border-white/20"
                            onClick={() => setRestTime(r => adjustValue(r, 5, 10, 300))}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-black/40 border border-white/10 rounded-md p-6 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono">
                      {formatTime(time)}
                    </div>
                    
                    <div className="flex gap-2 md:gap-4">
                      {!running ? (
                        <Button 
                          onClick={startTimer}
                          className="bg-glow-green text-black hover:bg-glow-green/80 hover:shadow-[0_0_10px_#39FF14] transition-all"
                        >
                          <Play className="mr-2 h-4 w-4" /> Start
                        </Button>
                      ) : (
                        <Button 
                          onClick={pauseTimer}
                          variant="outline"
                          className="border-glow-red text-glow-red hover:bg-glow-red/10"
                        >
                          <Pause className="mr-2 h-4 w-4" /> Pause
                        </Button>
                      )}
                      
                      <Button 
                        onClick={resetTimer}
                        variant="outline"
                        className="border-white/30 hover:bg-white/10"
                      >
                        <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                      </Button>
                      
                      <Button 
                        onClick={completeWorkout}
                        className="bg-glow-red text-white hover:bg-glow-red/80"
                        disabled={workoutComplete}
                      >
                        <Timer className="mr-2 h-4 w-4" /> Complete
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {workoutPlan.exercises.map((exercise, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-black/30 border border-white/10 rounded-md hover:border-glow-green/30 transition-all"
                    >
                      <div>
                        <h3 className="font-medium">{exercise.name}</h3>
                        <p className="text-sm text-gray-400">{exercise.sets} sets × {exercise.reps} reps</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-glow-green/30 text-glow-green hover:bg-glow-green/10"
                        onClick={() => toast.info(`Starting ${exercise.name}`)}
                      >
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:w-1/3">
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle className="font-orbitron">WORKOUT STATS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gray-400">Duration</span>
                    <span className="font-mono">{formatTime(time)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gray-400">Calories</span>
                    <span>{Math.floor(time * 0.15)} kcal</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gray-400">Total Sets</span>
                    <span>{workoutPlan.exercises.reduce((acc, ex) => acc + ex.sets, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${workoutComplete ? 'bg-glow-green/20 text-glow-green' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {workoutComplete ? 'COMPLETED' : 'IN PROGRESS'}
                    </span>
                  </div>
                </div>

                {workoutComplete && (
                  <div className="mt-6 p-4 bg-glow-green/10 border border-glow-green/30 rounded-md animate-fade-in">
                    <h3 className="font-bold text-glow-green mb-2">Great Job!</h3>
                    <p className="text-sm text-gray-300 mb-4">You've completed your workout. Would you like to save your progress?</p>
                    <div className="flex gap-2">
                      <Button 
                        className="bg-glow-green text-black hover:bg-glow-green/80 flex-1"
                        onClick={() => {
                          toast.success("Progress saved!");
                          navigate('/fitness');
                        }}
                      >
                        Save Progress
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-white/30 hover:bg-white/10 flex-1"
                        onClick={() => navigate('/fitness')}
                      >
                        Not Now
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </PageBackground>
  );
};

export default StartWorkout;
