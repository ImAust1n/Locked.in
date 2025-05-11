
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StressData } from '@/services/wellnessService';

interface StressInsightsProps {
  data: StressData[];
  loading: boolean;
}

export const StressInsights = ({ data, loading }: StressInsightsProps) => {
  // Use passed data or fallback to mock data
  const stressData = data.length > 0 ? data.slice(0, 7).map(item => ({
    day: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    stress: item.level * 10, // Scale 1-10 to percentage
    recovery: 100 - (item.level * 10),
    hrv: item.hrvScore
  })) : [
    { day: 'Mon', stress: 65, recovery: 35, hrv: 45 },
    { day: 'Tue', stress: 75, recovery: 25, hrv: 38 },
    { day: 'Wed', stress: 40, recovery: 60, hrv: 52 },
    { day: 'Thu', stress: 30, recovery: 70, hrv: 58 },
    { day: 'Fri', stress: 60, recovery: 40, hrv: 47 },
    { day: 'Sat', stress: 20, recovery: 80, hrv: 62 },
    { day: 'Sun', stress: 35, recovery: 65, hrv: 55 },
  ];
  
  const respiratoryData = [
    { time: '9 AM', rate: 16 },
    { time: '10 AM', rate: 18 },
    { time: '11 AM', rate: 20 },
    { time: '12 PM', rate: 19 },
    { time: '1 PM', rate: 21 },
    { time: '2 PM', rate: 22 },
    { time: '3 PM', rate: 20 },
    { time: '4 PM', rate: 17 },
    { time: '5 PM', rate: 15 },
    { time: '6 PM', rate: 16 },
    { time: '7 PM', rate: 14 },
    { time: '8 PM', rate: 14 },
  ];
  
  interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
  }
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-glow-green/30">
          <p className="text-sm font-medium">{label}</p>
          <div className="text-sm">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="flex items-center">
                  <span 
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  <span>{entry.name}:</span>
                </span>
                <span className="font-medium ml-2">{entry.value}{entry.name === 'HRV' ? ' ms' : '%'}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  
  const BreathingTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-glow-green/30">
          <p className="text-sm font-medium">{label}</p>
          <div className="text-sm flex items-center justify-between">
            <span>Breathing rate:</span>
            <span className="font-medium ml-2">{payload[0].value} breaths/min</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate today's metrics from data if available
  const todaysStressPercentage = data.length > 0 ? data[0].level * 10 : 35;
  const todaysRecoveryPercentage = 100 - todaysStressPercentage;
  const todaysHRV = data.length > 0 ? data[0].hrvScore : 55;

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl border border-glow-green/20 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Stress & Recovery</h2>
          <p className="text-gray-400">Monitor your stress levels and recovery balance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-4 rounded-lg text-center">
            <h3 className="text-sm text-gray-400 mb-1">Today's Stress</h3>
            <div className="text-2xl font-bold text-glow-red">{todaysStressPercentage}%</div>
            <p className="text-xs text-gray-500">{todaysStressPercentage < 40 ? 'Low' : todaysStressPercentage < 70 ? 'Medium' : 'High'}</p>
          </div>
          
          <div className="glass-card p-4 rounded-lg text-center">
            <h3 className="text-sm text-gray-400 mb-1">Recovery Score</h3>
            <div className="text-2xl font-bold text-glow-green">{todaysRecoveryPercentage}%</div>
            <p className="text-xs text-gray-500">
              {todaysRecoveryPercentage > 70 ? 'Excellent' : todaysRecoveryPercentage > 50 ? 'Good' : todaysRecoveryPercentage > 30 ? 'Fair' : 'Poor'}
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-lg text-center">
            <h3 className="text-sm text-gray-400 mb-1">Heart Rate Variability</h3>
            <div className="text-2xl font-bold">{todaysHRV} ms</div>
            <p className="text-xs text-gray-500">
              {data.length > 1 ? `${todaysHRV > data[1].hrvScore ? '+' : ''}${todaysHRV - data[1].hrvScore} ms from prev.` : '+8 ms from avg.'}
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Weekly Stress Pattern</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stressData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="day"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  hide
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar yAxisId="left" dataKey="stress" name="Stress" fill="#FF3B3B" radius={[3, 3, 0, 0]} />
                <Bar yAxisId="left" dataKey="recovery" name="Recovery" fill="#39FF14" radius={[3, 3, 0, 0]} />
                <Line 
                  yAxisId="right"
                  type="monotone"
                  dataKey="hrv"
                  name="HRV"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#60a5fa', strokeWidth: 0 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-3">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-glow-red mr-2"></span>
              <span className="text-sm">Stress</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-glow-green mr-2"></span>
              <span className="text-sm">Recovery</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
              <span className="text-sm">HRV</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl border border-glow-green/20 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Breathing Pattern</h3>
            <p className="text-sm text-gray-400">Today's respiratory rate</p>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={respiratoryData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[10, 25]}
                />
                <Tooltip content={<BreathingTooltip />} />
                <Line 
                  type="monotone"
                  dataKey="rate"
                  name="Respiratory Rate"
                  stroke="#39FF14"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#39FF14', strokeWidth: 0 }}
                  activeDot={{ r: 5, stroke: '#000', strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-black/30 border border-gray-700">
              <span className="text-sm">Average: </span>
              <span className="font-bold">17.5</span>
              <span className="text-sm text-gray-400"> breaths/min</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-xl border border-glow-green/20 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">AI Stress Insights</h3>
            <p className="text-sm text-gray-400">Personalized recommendations</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-black/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Stress Triggers</h4>
              <p className="text-sm text-gray-300">
                Your stress levels typically peak during mid-week meetings (Tuesday-Wednesday). Consider scheduling short breaks or chai time between long meetings.
              </p>
            </div>
            
            <div className="bg-black/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Ayurvedic Balance</h4>
              <p className="text-sm text-gray-300">
                Based on your stress patterns, we recommend incorporating Indian adaptogenic herbs like Ashwagandha (अश्वगंधा) to help your body adapt to stress naturally.
              </p>
            </div>
            
            <div className="bg-black/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Breathing Exercise</h4>
              <p className="text-sm text-gray-300">
                Try the 4-7-8 pranayama technique: Inhale for 4 seconds, hold for 7, exhale for 8. Practice for 5 minutes when stress peaks in the afternoon.
              </p>
              <button className="mt-2 py-1.5 px-3 bg-black/20 text-glow-green border border-glow-green/40 rounded-md text-xs hover:bg-glow-green/10 transition-colors">
                Start Guided Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
