
import { useState, useEffect } from 'react';

export const HomeStats = () => {
  const [counters, setCounters] = useState({
    users: 0,
    workouts: 0,
    meals: 0,
    minutes: 0
  });
  
  const finalValues = {
    users: 25000,
    workouts: 150000,
    meals: 300000,
    minutes: 9500000
  };
  
  useEffect(() => {
    // Simple animation for counters
    const intervalId = setInterval(() => {
      setCounters(prev => {
        const newCounters = {...prev};
        
        if (prev.users < finalValues.users) {
          newCounters.users = Math.min(prev.users + Math.ceil(finalValues.users / 30), finalValues.users);
        }
        
        if (prev.workouts < finalValues.workouts) {
          newCounters.workouts = Math.min(prev.workouts + Math.ceil(finalValues.workouts / 30), finalValues.workouts);
        }
        
        if (prev.meals < finalValues.meals) {
          newCounters.meals = Math.min(prev.meals + Math.ceil(finalValues.meals / 30), finalValues.meals);
        }
        
        if (prev.minutes < finalValues.minutes) {
          newCounters.minutes = Math.min(prev.minutes + Math.ceil(finalValues.minutes / 30), finalValues.minutes);
        }
        
        // Stop the interval if all counters reached their final values
        if (Object.keys(newCounters).every(key => newCounters[key] === finalValues[key])) {
          clearInterval(intervalId);
        }
        
        return newCounters;
      });
    }, 50);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num;
  };

  return (
    <section className="py-16 glass-card border-y border-glow-green/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-glow-green text-4xl font-bold mb-2 font-orbitron">{formatNumber(counters.users)}+</h3>
            <p className="text-gray-400">Active Users</p>
          </div>
          
          <div>
            <h3 className="text-glow-green text-4xl font-bold mb-2 font-orbitron">{formatNumber(counters.workouts)}+</h3>
            <p className="text-gray-400">Workouts Completed</p>
          </div>
          
          <div>
            <h3 className="text-glow-green text-4xl font-bold mb-2 font-orbitron">{formatNumber(counters.meals)}+</h3>
            <p className="text-gray-400">Meals Planned</p>
          </div>
          
          <div>
            <h3 className="text-glow-green text-4xl font-bold mb-2 font-orbitron">{formatNumber(counters.minutes)}+</h3>
            <p className="text-gray-400">Minutes Exercising</p>
          </div>
        </div>
      </div>
    </section>
  );
};
