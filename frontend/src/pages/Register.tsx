import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAppStore } from '../store';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useToastStore } from '../store/toastStore';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loadInitialData } = useAppStore();
  const { addToast } = useToastStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('error', 'Please fill in all fields');
      return;
    }
    setIsLoading(true);
    try {
      // Mocking registration by just logging in
      await authService.login(email, password);
      loadInitialData();
      addToast('success', 'Account created successfully');
      navigate('/dashboard');
    } catch {
      addToast('error', 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h2>
        <p className="text-gray-500 mb-8">Start building your personal brand today.</p>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input
              type="text"
              placeholder="Hanisha Sachdeva"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              placeholder="hanisha@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            Create Account
          </Button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
