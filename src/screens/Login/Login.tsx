import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import toast, { Toaster } from 'react-hot-toast';

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app-background flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <Card className="w-full max-w-md bg-app-background/50 border-2 border-app-primary/30">
        <CardHeader className="space-y-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white font-['Fira_Code',Helvetica] mb-2">
              <span className="text-app-primary">#</span>admin-login
            </h1>
            <p className="text-gray font-['Fira_Code',Helvetica] text-sm">
              Enter your credentials to access the admin panel
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-['Fira_Code',Helvetica]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-app-background border-2 border-app-primary/30 text-white font-['Fira_Code',Helvetica] focus:border-app-primary rounded-none"
                placeholder="admin@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-['Fira_Code',Helvetica]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-app-background border-2 border-app-primary/30 text-white font-['Fira_Code',Helvetica] focus:border-app-primary rounded-none"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-app-primary hover:bg-app-primary/80 text-app-background font-['Fira_Code',Helvetica] font-medium text-base py-6 rounded-none border-2 border-app-primary transition-all duration-300 cyber-glow"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 p-4 border border-app-primary/30 rounded-none bg-app-primary/5">
            <p className="text-gray text-xs font-['Fira_Code',Helvetica]">
              <span className="text-app-primary">💡 Note:</span> To create an admin account, use the Appwrite Console or contact your administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
