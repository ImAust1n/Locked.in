
import { useState, useEffect } from 'react';
import { Dumbbell, Play, Pause, RotateCcw, Activity, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const AIWorkoutTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentReps, setCurrentReps] = useState(0);
  const [formCorrection, setFormCorrection] = useState<string | null>(null);
  const [exerciseName, setExerciseName] = useState('Push-ups');
  const [elapsed, setElapsed] = useState(0);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  
  const { toast } = useToast();
  
  // Mock exercise form feedback
  const formFeedback = [
    "Keep your back straight",
    "Lower your hips slightly",
    "Tuck in your elbows",
    "Look ahead, not down",
    "Great form! Keep it up",
    "Slow down the movement",
    "Go deeper on each rep",
    "Maintain even breathing"
  ];

  // Start and stop camera
  const toggleCamera = async () => {
    try {
      if (!videoStream) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' }
        });
        setVideoStream(stream);
        
        // Connect video to element
        const videoElement = document.getElementById('workout-camera') as HTMLVideoElement;
        if (videoElement) {
          videoElement.srcObject = stream;
        }
        
        toast({
          title: "Camera activated",
          description: "AI workout tracking is now available.",
        });
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please enable camera permissions for workout tracking.",
        variant: "destructive",
      });
    }
  };
  
  // Stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  // Toggle workout tracking
  const toggleWorkout = () => {
    if (!videoStream) {
      toggleCamera();
      return;
    }
    
    setIsTracking(!isTracking);
    
    if (!isTracking) {
      // Reset counters when starting
      setElapsed(0);
      setCurrentReps(0);
      setFormCorrection(null);
      
      // Start the session
      toast({
        title: "Workout tracking started",
        description: `Now tracking: ${exerciseName}`,
      });
    } else {
      // End the session
      toast({
        title: "Workout complete!",
        description: `You completed ${currentReps} reps of ${exerciseName}`,
      });
      
      // Simulate analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        toast({
          title: "Workout analyzed",
          description: "Great effort! See your results below.",
        });
      }, 2000);
    }
  };

  // Timer for workout duration
  useEffect(() => {
    let timer: number;
    
    if (isTracking) {
      timer = window.setInterval(() => {
        setElapsed(prev => prev + 1);
        
        // Simulate rep counting based on time (just for demo)
        if (elapsed % 3 === 0) {
          setCurrentReps(prev => prev + 1);
          
          // Simulate random form feedback
          const randomFeedback = formFeedback[Math.floor(Math.random() * formFeedback.length)];
          setFormCorrection(randomFeedback);
          
          setTimeout(() => setFormCorrection(null), 3000);
        }
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [isTracking, elapsed]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Dumbbell className="text-glow-green" />
          AI Workout Tracking
        </h3>
        <div>
          <select 
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="bg-background border border-border rounded-md px-3 py-1 text-sm"
            disabled={isTracking}
          >
            <option>Push-ups</option>
            <option>Squats</option>
            <option>Planks</option>
            <option>Lunges</option>
            <option>Jumping Jacks</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video feed area */}
        <div className="relative bg-black/40 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
          {videoStream ? (
            <video 
              id="workout-camera"
              autoPlay 
              playsInline
              muted 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-8">
              <div className="mb-3 text-4xl text-glow-green animate-pulse">
                <Activity />
              </div>
              <h4 className="mb-2 text-lg font-semibold">Camera Access Required</h4>
              <p className="text-sm text-gray-400 mb-4">
                Enable your camera to track workout form and count reps automatically
              </p>
              <button 
                onClick={toggleCamera}
                className="btn-glow"
              >
                Enable Camera
              </button>
            </div>
          )}
          
          {/* Overlay for form correction */}
          {formCorrection && (
            <div className="absolute bottom-4 left-0 right-0 mx-auto w-5/6 bg-black/70 backdrop-blur-sm rounded-lg border border-glow-green px-4 py-3 text-white text-center animate-fade-in">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-glow-green" />
                <span>{formCorrection}</span>
              </div>
            </div>
          )}
          
          {/* Workout metrics overlay */}
          {isTracking && (
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg border border-glow-green px-3 py-2 text-white">
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Time:</span> {formatTime(elapsed)}
                </div>
                <div>
                  <span className="text-gray-400">Reps:</span> {currentReps}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Controls and stats */}
        <div className="flex flex-col">
          {/* Main controls */}
          <div className="flex justify-center mb-6">
            <button
              onClick={toggleWorkout}
              className={`${
                isTracking 
                  ? 'bg-glow-red/20 hover:bg-glow-red/30 border-glow-red'
                  : 'bg-glow-green/20 hover:bg-glow-green/30 border-glow-green'
              } border rounded-full w-16 h-16 flex items-center justify-center transition-all`}
              disabled={isAnalyzing}
            >
              {isTracking ? <Pause className="text-glow-red" size={24} /> : <Play className="text-glow-green" size={24} />}
            </button>
          </div>
          
          {/* Stats display */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black/20 rounded-lg p-4 text-center">
              <span className="block text-sm text-gray-400 mb-1">Reps</span>
              <span className="text-3xl font-bold glow-text">{currentReps}</span>
            </div>
            <div className="bg-black/20 rounded-lg p-4 text-center">
              <span className="block text-sm text-gray-400 mb-1">Duration</span>
              <span className="text-3xl font-bold glow-text">{formatTime(elapsed)}</span>
            </div>
            <div className="bg-black/20 rounded-lg p-4 text-center">
              <span className="block text-sm text-gray-400 mb-1">Form Score</span>
              <span className="text-3xl font-bold glow-text">
                {isTracking || currentReps > 0 ? "95%" : "--"}
              </span>
            </div>
            <div className="bg-black/20 rounded-lg p-4 text-center">
              <span className="block text-sm text-gray-400 mb-1">Calories</span>
              <span className="text-3xl font-bold glow-text">
                {isTracking || currentReps > 0 ? Math.floor(elapsed * 0.15) : "--"}
              </span>
            </div>
          </div>
          
          {/* AI insights */}
          <div className="bg-black/30 rounded-lg p-4 mb-4">
            <h4 className="text-sm text-gray-400 mb-2">AI Insights</h4>
            <p className="text-sm">
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">
                    <RotateCcw size={16} />
                  </span>
                  Analyzing your workout...
                </span>
              ) : isTracking ? (
                "Maintaining good form. Remember to breathe deeply with each movement."
              ) : currentReps > 0 ? (
                "Great workout! Your form improved throughout the session. Consider increasing intensity next time."
              ) : (
                "Start your workout to receive real-time AI feedback on your form and performance."
              )}
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2 mt-auto">
            <button 
              className="btn-glow w-full"
              disabled={!videoStream || isTracking}
            >
              Save Custom Exercise
            </button>
            <button 
              className="btn-red w-full"
              onClick={() => {
                if (videoStream) {
                  videoStream.getTracks().forEach(track => track.stop());
                  setVideoStream(null);
                  setIsTracking(false);
                }
              }}
              disabled={!videoStream}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
