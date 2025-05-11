
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";

export const ThemeToggle = () => {
  const { toast: uiToast } = useToast();
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to dark mode
    return true;
  });

  useEffect(() => {
    // Apply theme class to document
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    
    // Show toast notification
    toast.success(`Theme changed to ${!isDark ? 'dark' : 'light'} mode`, {
      description: "Your preference has been saved.",
      duration: 2000,
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors transform hover:scale-110 
        ${isDark 
          ? 'bg-secondary/30 text-gray-300 hover:text-glow-green hover:bg-glow-green/10'
          : 'bg-secondary text-gray-700 hover:text-glow-red hover:bg-glow-red/10'
        }`}
      aria-label="Toggle theme"
    >
      {isDark ? 
        <Sun size={18} className="transition-all duration-300 hover:rotate-45" /> : 
        <Moon size={18} className="transition-all duration-300 hover:rotate-12" />
      }
    </button>
  );
};
