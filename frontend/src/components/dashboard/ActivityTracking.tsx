
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const ActivityTracking = () => {
  // Mock data for the chart
  const data = [
    { day: 'Sun', steps: 5400, calories: 420 },
    { day: 'Mon', steps: 8200, calories: 580 },
    { day: 'Tue', steps: 7800, calories: 510 },
    { day: 'Wed', steps: 9200, calories: 620 },
    { day: 'Thu', steps: 8600, calories: 570 },
    { day: 'Fri', steps: 7400, calories: 490 },
    { day: 'Sat', steps: 9800, calories: 680 },
  ];
  
  interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
  }
  
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/80 backdrop-blur-md p-3 border border-glow-green/30 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-glow-green">
            {`Steps: ${payload[0].value.toLocaleString()}`}
          </p>
          <p className="text-sm text-gray-400">
            {`Calories: ${payload[1].value}`}
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="glass-card rounded-xl border border-glow-green/20 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">Weekly Activity</h3>
          <p className="text-gray-400">Daily steps and active calories</p>
        </div>
        
        <div className="flex gap-6 mt-3 md:mt-0">
          <div>
            <div className="text-sm text-gray-400">Avg. Steps</div>
            <div className="flex items-center">
              <span className="text-lg font-bold">8,057</span>
              <ArrowUp size={16} className="ml-1 text-glow-green" />
              <span className="text-xs text-glow-green ml-1">12%</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-400">Active Calories</div>
            <div className="flex items-center">
              <span className="text-lg font-bold">553</span>
              <ArrowDown size={16} className="ml-1 text-glow-red" />
              <span className="text-xs text-glow-red ml-1">3%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <XAxis 
              dataKey="day" 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              domain={[0, 12000]}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              domain={[0, 800]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="steps" 
              stroke="#39FF14" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#39FF14', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#39FF14', strokeWidth: 2, stroke: '#000' }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="calories" 
              stroke="#FF3B3B" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#FF3B3B', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#FF3B3B', strokeWidth: 2, stroke: '#000' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center mt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-glow-green mr-2"></span>
            <span className="text-sm text-gray-400">Steps</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-glow-red mr-2"></span>
            <span className="text-sm text-gray-400">Calories</span>
          </div>
        </div>
      </div>
    </div>
  );
};
