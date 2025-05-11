
import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AuthForm } from "../components/auth/AuthForm";
import { AiAssistant } from "../components/ui/AiAssistant";
import { authService } from "@/services/authService";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const location = useLocation();

  // If user is already authenticated, redirect to dashboard
  if (authService.isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  // Set active tab based on URL path
  useEffect(() => {
    if (location.pathname === '/signup') {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto py-12 px-4 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <AuthForm activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Auth;
