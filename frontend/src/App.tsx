
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Fitness from "./pages/Fitness";
import Nutrition from "./pages/Nutrition";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Wellness from "./pages/Wellness";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import ExplorePlans from "./pages/ExplorePlans";
import StartWorkout from "./pages/StartWorkout";
import { PageBackground } from "./components/ui/PageBackground";
import { authService } from "./services/authService";
import { toast } from "sonner";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!authService.isAuthenticated()) {
    toast.error("You need to log in to access this page");
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  // Set dark mode as default
  useEffect(() => {
    // Check for existing theme preference
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      // If no preference saved, set dark theme as default
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/events" element={<Events />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/explore-plans" element={<ExplorePlans />} />
            <Route path="/start-workout" element={<StartWorkout />} />
            <Route path="/start-workout/:planId" element={<StartWorkout />} />
            <Route path="/dashboard" element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            } />
            <Route path="/profile" element={
              // <ProtectedRoute>
                <Profile />
              // </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              // <ProtectedRoute>
                <Leaderboard />
              // </ProtectedRoute>
            } />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/chat" element={<Chat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
