
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SleepData } from '@/services/wellnessService';
import { useState } from 'react';

interface SleepTrackerProps {
  data: SleepData[];
  loading: boolean;
  onLogSleep: (duration: number, quality: number) => void;
}

export const SleepTracker = ({ data, loading, onLogSleep }: SleepTrackerProps) => {
  const [newSleepHours, setNewSleepHours] = useState<number>(7.5);
  const [newSleepQuality, setNewSleepQuality] = useState<number>(8);

  // Mock data for the sleep chart - use passed data or fallback
  const sleepData = data.length > 0 ? data.slice(0, 7).map(item => ({
    day: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    hours: item.duration,
    deep: item.deepSleep,
    rem: item.remSleep,
    light: item.lightSleep
  })) : [
    { day: 'Mon', hours: 7.5, deep: 2.2, rem: 1.8, light: 3.5 },
    { day: 'Tue', hours: 6.2, deep: 1.5, rem: 1.4, light: 3.3 },
    { day: 'Wed', hours: 8.1, deep: 2.8, rem: 2.0, light: 3.3 },
    { day: 'Thu', hours: 7.8, deep: 2.3, rem: 1.9, light: 3.6 },
    { day: 'Fri', hours: 5.9, deep: 1.4, rem: 1.2, light: 3.3 },
    { day: 'Sat', hours: 9.2, deep: 3.0, rem: 2.5, light: 3.7 },
    { day: 'Sun', hours: 8.5, deep: 2.7, rem: 2.2, light: 3.6 },
  ];

  interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="glass-card p-3 border border-glow-green/30">
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-sm text-gray-400">Total: <span className="text-white">{data.hours}h</span></p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-glow-green mr-1"></span>
                <span>Deep:</span>
              </div>
              <span className="font-medium">{data.deep}h</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-1"></span>
                <span>REM:</span>
              </div>
              <span className="font-medium">{data.rem}h</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-1"></span>
                <span>Light:</span>
              </div>
              <span className="font-medium">{data.light}h</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleLogSleep = () => {
    onLogSleep(newSleepHours, newSleepQuality);
  };

  // Calculate averages from data
  const averageSleep = data.length ? 
    data.reduce((sum, item) => sum + item.duration, 0) / data.length : 
    7.6;
    
  const averageDeepSleep = data.length ? 
    data.reduce((sum, item) => sum + item.deepSleep, 0) / data.length : 
    2.3;
    
  const averageDeepSleepPercentage = Math.round((averageDeepSleep / averageSleep) * 100);

  return (
    <div className="glass-card rounded-xl border border-glow-green/20 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Sleep Tracking</h2>
        <p className="text-gray-400">Monitor your sleep quality and patterns</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 rounded-lg text-center">
          <h3 className="text-sm text-gray-400 mb-1">Average Sleep</h3>
          <div className="text-2xl font-bold text-glow-green">{averageSleep.toFixed(1)}h</div>
          <p className="text-xs text-gray-500">Past week</p>
        </div>
        
        <div className="glass-card p-4 rounded-lg text-center">
          <h3 className="text-sm text-gray-400 mb-1">Deep Sleep</h3>
          <div className="text-2xl font-bold">{averageDeepSleep.toFixed(1)}h</div>
          <p className="text-xs text-gray-500">{averageDeepSleepPercentage}% of total</p>
        </div>
        
        <div className="glass-card p-4 rounded-lg text-center">
          <h3 className="text-sm text-gray-400 mb-1">Sleep Score</h3>
          <div className="text-2xl font-bold text-glow-green">82</div>
          <p className="text-xs text-gray-500">Good</p>
        </div>
        
        <div className="glass-card p-4 rounded-lg text-center">
          <h3 className="text-sm text-gray-400 mb-1">Bedtime</h3>
          <div className="text-2xl font-bold">11:24 PM</div>
          <p className="text-xs text-gray-500">Average</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Weekly Sleep Pattern</h3>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sleepData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="day"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={8} stroke="#39FF14" strokeDasharray="3 3" />
              <defs>
                <linearGradient id="colorDeep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39FF14" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorREM" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c084fc" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="deep" 
                stackId="1"
                stroke="#39FF14" 
                fill="url(#colorDeep)" 
              />
              <Area 
                type="monotone" 
                dataKey="rem" 
                stackId="1"
                stroke="#60a5fa" 
                fill="url(#colorREM)" 
              />
              <Area 
                type="monotone" 
                dataKey="light" 
                stackId="1"
                stroke="#c084fc" 
                fill="url(#colorLight)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-2">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-glow-green mr-2"></span>
            <span className="text-sm">Deep Sleep</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
            <span className="text-sm">REM Sleep</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-purple-400 mr-2"></span>
            <span className="text-sm">Light Sleep</span>
          </div>
        </div>
        <div className="flex justify-center mt-1">
          <span className="text-xs text-gray-400 flex items-center">
            <span className="h-px w-8 bg-glow-green/50 mr-2 border-dashed"></span>
            Target: 8 hours
          </span>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-lg mt-6">
        <h3 className="text-lg font-semibold mb-3">Log Today's Sleep</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Sleep Duration (hours)</label>
            <input 
              type="number" 
              min="0" 
              max="24" 
              step="0.5"
              value={newSleepHours}
              onChange={(e) => setNewSleepHours(parseFloat(e.target.value))} 
              className="w-full bg-black/30 border border-gray-700 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Sleep Quality (1-10)</label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={newSleepQuality}
              onChange={(e) => setNewSleepQuality(parseInt(e.target.value))} 
              className="w-full bg-black/30 border border-gray-700 rounded p-2"
            />
          </div>
        </div>
        <button 
          onClick={handleLogSleep}
          className="w-full mt-4 py-2 rounded-lg bg-glow-green/20 border border-glow-green/50 text-glow-green hover:bg-glow-green/30 transition-colors"
        >
          Log Sleep
        </button>
      </div>
      
      <div className="glass-card p-4 rounded-lg mt-6">
        <h3 className="text-lg font-semibold mb-3">AI Sleep Insights</h3>
        <p className="text-sm text-gray-300">
          Your sleep pattern shows good consistency on weekdays but varies on weekends. To improve your sleep quality, try these Ayurvedic tips:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-gray-300">
          <li className="flex items-start">
            <span className="text-glow-green mr-2">•</span>
            <span>Drink warm milk with a pinch of turmeric before bed (haldi doodh)</span>
          </li>
          <li className="flex items-start">
            <span className="text-glow-green mr-2">•</span>
            <span>Practice 10 minutes of meditation or pranayama breathing</span>
          </li>
          <li className="flex items-start">
            <span className="text-glow-green mr-2">•</span>
            <span>Maintain a consistent sleep schedule, even on weekends</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
