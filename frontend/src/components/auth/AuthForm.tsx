
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { useAuthStore } from '../../services/useAuthStore'; 

interface AuthFormProps {
  activeTab: 'login' | 'signup';
  setActiveTab: (tab: 'login' | 'signup') => void;
}

export const AuthForm = ({ activeTab, setActiveTab }: AuthFormProps) => {
  const navigate = useNavigate();
  const { checkAuth, signup, login } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (activeTab === 'login') {
        login({
          email: formData.email,
          password: formData.password
        });
      } else {
        signup({
          fullName: formData.name,
          email: formData.email,
          password: formData.password
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
      navigate('/fitness');
      
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="glass-card p-8 rounded-2xl border border-glow-green/20">
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            <Lock size={40} className="text-glow-green mx-auto" />
          </div>
          <h2 className="text-2xl font-bold">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 mt-2">
            {activeTab === 'login' ? 
              'Sign in to continue your fitness journey' : 
              'Join our community of fitness enthusiasts'}
          </p>
        </div>
        
        <div className="mb-6 flex rounded-lg overflow-hidden">
          <button 
            className={`flex-1 py-3 px-4 text-center transition-colors ${
              activeTab === 'login' 
                ? 'bg-glow-green/20 text-white' 
                : 'bg-background text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center transition-colors ${
              activeTab === 'signup' 
                ? 'bg-glow-green/20 text-white' 
                : 'bg-background text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <div className="mb-4">
              <Label htmlFor="name" className="mb-2 block">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="John Doe"
                  required
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <Label htmlFor="email" className="mb-2 block">Email Address</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
                placeholder="you@example.com"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="password" className="mb-2 block">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <button 
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {activeTab === 'login' && (
            <div className="mb-6 text-right">
              <a href="/forgot-password" className="text-glow-green text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full btn-glow flex items-center justify-center gap-2 py-5"
            disabled={loading}
          >
            {loading ? "Processing..." : activeTab === 'login' ? "Sign In" : "Create Account"}
            {!loading && <ArrowRight size={18} />}
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {activeTab === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="text-glow-green ml-1 hover:underline"
              >
                {activeTab === 'login' ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Or continue with
          </p>
          <div className="flex gap-4 mt-4 justify-center">
            <button 
              className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center border border-glow-green/20 hover:border-glow-green/50 transition-colors"
              onClick={() => toast.info("Google authentication coming soon!")}
            >
              G
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center border border-glow-green/20 hover:border-glow-green/50 transition-colors"
              onClick={() => toast.info("Facebook authentication coming soon!")}
            >
              f
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center border border-glow-green/20 hover:border-glow-green/50 transition-colors"
              onClick={() => toast.info("LinkedIn authentication coming soon!")}
            >
              in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
