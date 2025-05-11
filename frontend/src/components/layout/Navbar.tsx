
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock, Heart, MessageSquare } from "lucide-react";
import { ThemeToggle } from '../ui/ThemeToggle';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Fitness', path: '/fitness' },
    { name: 'Nutrition', path: '/nutrition' },
    { name: 'Wellness', path: '/wellness', icon: <Heart size={16} /> },
    { name: 'Chat', path: '/chat', icon: <MessageSquare size={16} /> },
    { name: 'Events', path: '/events' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Blog', path: '/blog' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="backdrop-blur-md dark:bg-black/50 bg-white/50 dark:border-glow-green/20 border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Lock size={24} className="text-glow-green" />
            <span className="text-2xl font-bold font-orbitron dark:text-white text-gray-900">
              LOCKED <span className="text-glow-green">IN</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`dark:text-white text-gray-800 hover:text-glow-green transition-colors relative group flex items-center gap-1 ${
                  isActive(item.path) ? 'text-glow-green' : ''
                }`}
              >
                {item.icon && item.icon}
                {item.name}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-glow-green transition-all duration-300 ${
                    isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="relative">
              <Link 
                to="/profile" 
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-glow-green/20 border border-glow-green/50 dark:text-white text-gray-800 hover:bg-glow-green/30 transition-colors"
              >
                <span>PL</span>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden dark:text-white text-gray-800 hover:text-glow-green"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in px-4 pb-4 pt-2 dark:bg-black/90 bg-white/90 dark:border-b dark:border-glow-green/20 border-b border-gray-200">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`dark:text-white text-gray-800 hover:text-glow-green transition-colors py-2 flex items-center gap-2 ${
                  isActive(item.path) ? 'text-glow-green' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && item.icon}
                {item.name}
              </Link>
            ))}
            <Link 
              to="/profile" 
              className="flex items-center gap-2 dark:text-white text-gray-800 hover:text-glow-green transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
