import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PenSquare, 
  FileText, 
  FileEdit, 
  LayoutTemplate,
  Settings,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAppStore } from '../../store';

export function Sidebar() {
  const { user } = useAppStore();
  const initials = user?.name.split(' ').map(n => n[0]).join('').substring(0, 2) ?? 'U';

  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Post', path: '/create', icon: PenSquare },
    { name: 'All Posts', path: '/posts', icon: FileText },
    { name: 'Drafts', path: '/drafts', icon: FileEdit },
    { name: 'Templates', path: '/templates', icon: LayoutTemplate },
  ];

  return (
    <aside className="w-[240px] bg-white/70 backdrop-blur-xl border-r border-gray-100/80 flex flex-col hidden md:flex shadow-sm">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900 leading-none block">Post Agent</span>
            <span className="text-[10px] text-indigo-500 font-semibold tracking-wide uppercase leading-none">AI Powered</span>
          </div>
        </div>
      </div>

      {/* Quick Create CTA */}
      <div className="px-3 pt-4 pb-2">
        <NavLink
          to="/create"
          className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl btn-gradient text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200"
        >
          <Zap className="w-4 h-4" />
          New Post
        </NavLink>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu</p>
        {mainNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `nav-pill${isActive ? ' active' : ''}`
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: User + Settings */}
      <div className="px-3 pb-4 space-y-1 border-t border-gray-100/80 pt-3">
        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-pill${isActive ? ' active' : ''}`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          Settings
        </NavLink>

        <div className="flex items-center gap-3 px-3 py-2.5 mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name ?? 'User'}</p>
            <p className="text-[10px] text-gray-400 truncate">{user?.headline ?? ''}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
