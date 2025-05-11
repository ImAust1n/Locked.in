
import { useState } from 'react';
import { Check } from 'lucide-react';

type FilterProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filters: {
    time: string;
    intensity: string;
    equipment: string;
  };
  setFilters: (filters: {
    time: string;
    intensity: string;
    equipment: string;
  }) => void;
};

export const FitnessFilters = ({
  activeCategory,
  setActiveCategory,
  filters,
  setFilters
}: FilterProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const categories = [
    { id: "all", name: "All Videos" },
    { id: "cardio", name: "Cardio" },
    { id: "strength", name: "Strength" },
    { id: "mobility", name: "Mobility" },
    { id: "recovery", name: "Recovery" },
    { id: "sport", name: "Sport-Specific" },
  ];
  
  const timeOptions = [
    { value: "all", label: "Any Duration" },
    { value: "short", label: "< 15 minutes" },
    { value: "medium", label: "15-30 minutes" },
    { value: "long", label: "> 30 minutes" },
  ];
  
  const intensityOptions = [
    { value: "all", label: "Any Intensity" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];
  
  const equipmentOptions = [
    { value: "all", label: "Any Equipment" },
    { value: "none", label: "No Equipment" },
    { value: "minimal", label: "Minimal" },
    { value: "full", label: "Full Gym" },
  ];
  
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };
  
  return (
    <section className="py-8 bg-black/80">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-glow-green text-black font-medium'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Filters */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="text-glow-green hover:underline"
            >
              {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {isFiltersOpen && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border border-gray-800 rounded-lg bg-black/50">
              {/* Time Filter */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Duration</h3>
                <div className="space-y-2">
                  {timeOptions.map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <div className={`w-4 h-4 rounded-full border ${
                        filters.time === option.value 
                          ? 'border-glow-green bg-glow-green'
                          : 'border-gray-600'
                      } flex items-center justify-center`}>
                        {filters.time === option.value && <Check size={12} className="text-black" />}
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Intensity Filter */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Intensity</h3>
                <div className="space-y-2">
                  {intensityOptions.map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <div className={`w-4 h-4 rounded-full border ${
                        filters.intensity === option.value 
                          ? 'border-glow-green bg-glow-green'
                          : 'border-gray-600'
                      } flex items-center justify-center`}>
                        {filters.intensity === option.value && <Check size={12} className="text-black" />}
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Equipment Filter */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Equipment</h3>
                <div className="space-y-2">
                  {equipmentOptions.map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <div 
                        className={`w-4 h-4 rounded-full border ${
                          filters.equipment === option.value 
                            ? 'border-glow-green bg-glow-green'
                            : 'border-gray-600'
                        } flex items-center justify-center`}
                        onClick={() => handleFilterChange('equipment', option.value)}
                      >
                        {filters.equipment === option.value && <Check size={12} className="text-black" />}
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
