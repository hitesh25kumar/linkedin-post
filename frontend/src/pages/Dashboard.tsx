import { FileText, CheckCircle, FileEdit, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store';
import { StatCard } from '../components/dashboard/StatCard';
import { QuickCreate } from '../components/dashboard/QuickCreate';
import { RecentPosts } from '../components/dashboard/RecentPosts';
import { useNavigate } from 'react-router-dom';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function Dashboard() {
  const { user, posts } = useAppStore();
  const navigate = useNavigate();

  if (!user) return null;

  const publishedCount = posts.filter(p => p.status === 'Published').length;
  const draftCount = posts.filter(p => p.status === 'Draft').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      {/* ── Hero greeting ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 sm:p-8 text-white shadow-xl shadow-indigo-200">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-violet-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-indigo-200/80 text-sm font-medium mb-1">{getGreeting()} 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold leading-snug mb-2">
              Ready to build your brand,<br className="hidden sm:block" /> {user.name.split(' ')[0]}?
            </h1>
            <p className="text-indigo-100/70 text-sm max-w-md">
              You have <span className="text-white font-semibold">{draftCount} draft{draftCount !== 1 ? 's' : ''}</span> waiting. Turn your ideas into posts that get noticed.
            </p>
          </div>

          <button
            onClick={() => navigate('/create')}
            className="shrink-0 flex items-center gap-2 px-5 py-3 bg-white text-indigo-700 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg shadow-black/10"
          >
            <Zap className="w-4 h-4" />
            Create Post
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Posts"
          value={posts.length}
          subtext="+4 this month"
          icon={FileText}
          color="indigo"
        />
        <StatCard
          label="Published"
          value={publishedCount}
          subtext="2 this week"
          icon={CheckCircle}
          color="emerald"
        />
        <StatCard
          label="Drafts"
          value={draftCount}
          subtext="Needs review"
          icon={FileEdit}
          color="amber"
        />
        <StatCard
          label="Engagement"
          value="↑ 12%"
          subtext="vs last month"
          icon={TrendingUp}
          color="violet"
        />
      </div>

      {/* ── Main content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-1">
          <QuickCreate />
        </div>
        <div className="lg:col-span-2">
          <RecentPosts />
        </div>
      </div>
    </div>
  );
}
