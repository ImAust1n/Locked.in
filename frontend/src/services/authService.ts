import { toast } from "sonner";

// API base URL - update this to match your backend URL
// Using port 5001 as specified in the backend .env file
const API_BASE_URL = 'http://localhost:5001/api';

// Types for authentication
export interface User {
  _id: string;
  fullName: string;
  email: string;
  location: string;
  weight: number;
  height: number;
  fatPercentage: number;
  musclePercentage: number;
  muscleMass: number;
  time5k: number;
  maxPullUps: number;
  rmBenchPress: number;
  fitnessGoals: string[];
  streak: number;
}

interface AuthResponse {
  user: User | null;
  success: boolean;
  message?: string;
}

// Store the current user session
let currentUser: User | null = null;

export const authService = {
  // Login function
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important for cookies
      });

      const data = await response.json();

      if (response.ok) {
        currentUser = data;
        localStorage.setItem('currentUser', JSON.stringify(data));
        toast.success(`Welcome back, ${data.fullName}!`);
        return { user: data, success: true };
      } else {
        return { 
          user: null, 
          success: false, 
          message: data.message || 'Login failed. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        user: null, 
        success: false, 
        message: 'Network error. Please try again later.' 
      };
    }
  },

  // Register function
  register: async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
        credentials: 'include', // Important for cookies
      });

      const data = await response.json();

      if (response.ok) {
        currentUser = data;
        localStorage.setItem('currentUser', JSON.stringify(data));
        toast.success('Account created successfully!');
        return { user: data, success: true };
      } else {
        return { 
          user: null, 
          success: false, 
          message: data.message || 'Registration failed. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        user: null, 
        success: false, 
        message: 'Network error. Please try again later.' 
      };
    }
  },

  // Logout function
  logout: async (): Promise<{ success: boolean, message?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();
      
      // Clear local storage and current user regardless of server response
      currentUser = null;
      localStorage.removeItem('currentUser');
      
      if (response.ok) {
        toast.info(data.message || 'You\'ve been logged out');
        return { success: true };
      } else {
        return { 
          success: false, 
          message: data.message || 'Logout failed. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local data even if server request fails
      currentUser = null;
      localStorage.removeItem('currentUser');
      return { 
        success: true, 
        message: 'Logged out locally, but server could not be reached.' 
      };
    }
  },

  // Check if user is authenticated with the server
  checkAuth: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        currentUser = userData;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        return true;
      } else {
        currentUser = null;
        localStorage.removeItem('currentUser');
        return false;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  },

  // Check if user is authenticated locally
  isAuthenticated: (): boolean => {
    if (currentUser) return true;
    
    // Check localStorage for persisted user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser);
        return true;
      } catch (e) {
        localStorage.removeItem('currentUser');
        return false;
      }
    }
    
    return false;
  },

  // Get current user
  getCurrentUser: (): User | null => {
    if (currentUser) return currentUser;
    
    // Check localStorage for persisted user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser);
        return currentUser;
      } catch (e) {
        localStorage.removeItem('currentUser');
        return null;
      }
    }
    
    return null;
  }
};
