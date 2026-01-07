import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Sparkles, Lock } from 'lucide-react';
import { authenticateAdmin } from '../mockAdmin';
import { useToast } from '../hooks/use-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (authenticateAdmin(credentials.username, credentials.password)) {
      localStorage.setItem('adminAuthenticated', 'true');
      toast({
        title: "Login Successful",
        description: "Welcome to Eden Rest Admin Panel",
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-peach-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-peach-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">Eden Rest</h1>
          </div>
          <CardTitle className="text-xl text-green-800">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>

            <div className="bg-peach-50 p-3 rounded-md border border-peach-200">
              <p className="text-sm text-gray-600">
                <Lock className="h-4 w-4 inline mr-1" />
                Demo Credentials: <br />
                <span className="font-mono text-xs">Username: admin | Password: admin123</span>
              </p>
            </div>
            
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Login to Admin Panel
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
