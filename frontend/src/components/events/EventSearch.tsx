
import { Search, Filter } from "lucide-react";

interface EventSearchProps {
  onSearch?: (searchTerm: string) => void;
  onFilterChange?: (filter: string) => void;
}

export const EventSearch = ({ onSearch, onFilterChange }: EventSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input 
          className="w-full bg-black/30 border border-gray-700 rounded-full px-10 py-2 text-sm"
          placeholder="Search events..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Filter size={18} className="text-gray-400" />
        <select 
          className="bg-black/30 border border-gray-700 rounded-full px-4 py-2 text-sm"
          onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
        >
          <option value="all">All Locations</option>
          <option value="online">Online Only</option>
          <option value="local">In Person</option>
        </select>
      </div>
    </div>
  );
};
