import { useEffect, useState } from 'react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Select } from '../components/common/Select';
import { useAppStore } from '../store';
import { authService } from '../services/authService';
import { settingsService } from '../services/settingsService';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sparkles, User2, Palette, Cpu } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

export function Settings() {
  const { user, setUser } = useAppStore();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const [name, setName] = useState(user?.name || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [tone, setTone] = useState('Professional');
  const [audience, setAudience] = useState('Product Managers');
  const [length, setLength] = useState('Medium');

  useEffect(() => {
    void settingsService.get().then((settings) => {
      setName(settings.name);
      setHeadline(settings.headline || '');
      setBio(settings.bio || '');
      setTone(settings.preferences?.defaultTone || 'Professional');
      setAudience(settings.preferences?.defaultAudience || 'Product Managers');
      setLength(settings.preferences?.defaultLength || 'Medium');
    }).catch(() => {
      addToast('error', 'Unable to load settings');
    });
  }, [addToast]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleSave = async () => {
    try {
      const updatedUser = await settingsService.update({
        name,
        headline,
        bio,
        preferences: {
          defaultTone: tone,
          defaultAudience: audience,
          defaultLength: length,
        },
      });
      setUser(updatedUser);
      localStorage.setItem('linkedin_agent_user', JSON.stringify(updatedUser));
      addToast('success', 'Settings saved successfully');
    } catch {
      addToast('error', 'Unable to save settings');
    }
  };

  if (!user) return null;

  const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-in">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage your profile and agent preferences.</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 border border-gray-200 hover:border-rose-200 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

      {/* Profile */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <User2 className="w-4 h-4 text-indigo-500" />
          <h2 className="text-sm font-bold text-gray-900">Profile</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-200/40">
                {initials}
              </div>
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors border border-indigo-200">
                Change avatar
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Headline</label>
                <Input value={headline} onChange={(e) => setHeadline(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Bio</label>
                <Textarea className="min-h-[80px]" value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Writing Preferences */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Palette className="w-4 h-4 text-violet-500" />
          <h2 className="text-sm font-bold text-gray-900">Writing Preferences</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Default Tone</label>
            <Select value={tone} onChange={(e) => setTone(e.target.value)}>
              {['Professional', 'Conversational', 'Educational', 'Storytelling', 'Bold'].map(t => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Default Audience</label>
            <Input value={audience} onChange={(e) => setAudience(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Default Length</label>
            <Select value={length} onChange={(e) => setLength(e.target.value)}>
              {['Short', 'Medium', 'Long'].map(t => (<option key={t}>{t}</option>))}
            </Select>
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-500" />
          <h2 className="text-sm font-bold text-gray-900">AI Configuration</h2>
        </div>
        <div className="p-6 space-y-3">
          {[
            { label: 'Provider', value: 'Google Gemini' },
            { label: 'Model', value: 'Gemini 1.5 Pro' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <span className="text-sm text-gray-600 font-medium">{label}</span>
              <span className="text-sm font-bold text-gray-900">{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-sm text-gray-600 font-medium">Status</span>
            <span className="badge-pill bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Mock Mode
            </span>
          </div>
          <div className="mt-4 p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-800 leading-relaxed">
                The Gemini API will be connected through the NestJS backend. No API keys are needed on the frontend.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
}
