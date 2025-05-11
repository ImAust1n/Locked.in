
import { useState } from 'react';
import { Moon, Heart, Clock, Calendar, BarChart } from 'lucide-react';

export const WellnessHero = () => {
  const [activeMetric, setActiveMetric] = useState<'sleep' | 'stress' | 'mood'>('sleep');
  
  return (
    <div className="bg-black relative overflow-hidden border-b border-glow-green/20">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-glow-green/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-10 md:py-16 relative">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
            <span className="text-glow-green">Wellness &</span> Recovery Hub
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Track your sleep, manage stress, and find balance through meditation and mindfulness practices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div 
            className={`glass-card p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
              activeMetric === 'sleep' 
                ? 'border-glow-green bg-glow-green/10' 
                : 'border-gray-700 hover:border-glow-green/50'
            }`}
            onClick={() => setActiveMetric('sleep')}
          >
            <div className="flex items-start">
              <div className="bg-black/30 p-2 rounded-lg mr-3">
                <Moon className={activeMetric === 'sleep' ? 'text-glow-green' : 'text-gray-400'} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Sleep Score</h3>
                <div className="text-2xl font-bold">82</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={activeMetric === 'sleep' ? 'text-glow-green' : 'text-gray-400'}>▲ 8%</span> vs last week
                </p>
              </div>
            </div>
          </div>
          
          <div 
            className={`glass-card p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
              activeMetric === 'stress' 
                ? 'border-glow-green bg-glow-green/10' 
                : 'border-gray-700 hover:border-glow-green/50'
            }`}
            onClick={() => setActiveMetric('stress')}
          >
            <div className="flex items-start">
              <div className="bg-black/30 p-2 rounded-lg mr-3">
                <Heart className={activeMetric === 'stress' ? 'text-glow-green' : 'text-gray-400'} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Stress Level</h3>
                <div className="text-2xl font-bold">Medium</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={activeMetric === 'stress' ? 'text-glow-green' : 'text-gray-400'}>▼ 12%</span> vs last week
                </p>
              </div>
            </div>
          </div>
          
          <div 
            className={`glass-card p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
              activeMetric === 'mood' 
                ? 'border-glow-green bg-glow-green/10' 
                : 'border-gray-700 hover:border-glow-green/50'
            }`}
            onClick={() => setActiveMetric('mood')}
          >
            <div className="flex items-start">
              <div className="bg-black/30 p-2 rounded-lg mr-3">
                <BarChart className={activeMetric === 'mood' ? 'text-glow-green' : 'text-gray-400'} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Mood Trend</h3>
                <div className="text-2xl font-bold">Positive</div>
                <p className="text-xs text-gray-500 mt-1">
                  Based on last 7 days
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex space-x-4 bg-black/30 rounded-full p-1.5">
            <button className="btn-glow py-1.5 px-4 rounded-full text-sm flex items-center gap-1">
              <Calendar size={14} />
              <span>Today</span>
            </button>
            <button className="py-1.5 px-4 rounded-full text-sm text-gray-400 hover:text-white transition-colors">Week</button>
            <button className="py-1.5 px-4 rounded-full text-sm text-gray-400 hover:text-white transition-colors">Month</button>
          </div>
        </div>
      </div>
    </div>
  );
};
