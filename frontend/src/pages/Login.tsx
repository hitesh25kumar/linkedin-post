import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useToastStore } from '../store/toastStore';
import { Sparkles, ArrowRight, Zap, Users, BarChart3, Eye } from 'lucide-react';

const FEATURES = [
  { icon: Zap, label: 'AI-Powered', desc: 'Gemini generates posts in seconds' },
  { icon: BarChart3, label: 'Analytics', desc: 'Quality score & engagement insights' },
  { icon: Users, label: 'Built for PMs', desc: 'Templates for every use case' },
];

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('error', 'Please enter email and password');
      return;
    }
    setIsLoading(true);
    try {
      await authService.login(email, password);
      addToast('success', 'Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Invalid email or password'
        : 'Login failed';
      addToast('error', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-mesh">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-12 overflow-hidden">
        {/* Gradient background blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-16">
            <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">LinkedIn Post Agent</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.15] mb-5">
            Turn ideas into<br />
            <span className="text-indigo-200">LinkedIn magic</span>
          </h1>
          <p className="text-indigo-100/80 text-lg leading-relaxed max-w-sm">
            AI-crafted posts that sound like you — not a robot. Build your professional brand in minutes.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/15">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-indigo-100/70 text-xs">{desc}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {['P', 'A', 'M', 'K'].map((l, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-indigo-400 border-2 border-indigo-700 flex items-center justify-center text-white text-[10px] font-bold">{l}</div>
              ))}
            </div>
            <p className="text-indigo-100/70 text-xs">Trusted by 12,000+ professionals</p>
          </div>
        </div>
      </div>

      {/* ── Right form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white/60 backdrop-blur-sm">
        <div className="w-full max-w-[380px] animate-in">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl btn-gradient flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Post Agent</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
            <p className="text-gray-500 text-sm">Sign in to continue crafting great content.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Email</label>
              <input
                type="email"
                className="input-modern"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">Password</label>
                <button type="button" className="text-xs text-indigo-600 font-medium hover:text-indigo-800 transition-colors">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input-modern pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold text-white btn-gradient mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            No account?{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
