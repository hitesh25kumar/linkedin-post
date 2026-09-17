import { Bell, Search, Menu } from 'lucide-react';
import { useAppStore } from '../../store';

export function Header() {
  const { user } = useAppStore();
  if (!user) return null;

  return (
    <header className="h-14 bg-white/60 backdrop-blur-xl border-b border-gray-100/80 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10 shadow-sm shadow-gray-100/50">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        {/* Search bar */}
        <div className="relative hidden sm:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts, templates..."
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-100/80 border border-transparent rounded-full text-gray-600 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-indigo-500/20 transition-all w-48 lg:w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-150">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200 ml-1">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none mb-0.5">{user.name}</p>
            <p className="text-xs text-gray-400 leading-none truncate max-w-[140px]">{user.headline}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
        </div>
      </div>
    </header>
  );
}
