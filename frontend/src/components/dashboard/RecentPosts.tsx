import { useNavigate } from 'react-router-dom';
import { ExternalLink, Clock, PenSquare } from 'lucide-react';
import { useAppStore } from '../../store';

const STATUS_STYLES: Record<string, string> = {
  Published: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Approved:  'bg-indigo-50 text-indigo-700 border border-indigo-200',
  Draft:     'bg-amber-50 text-amber-700 border border-amber-200',
};

export function RecentPosts() {
  const { posts } = useAppStore();
  const navigate = useNavigate();
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100/80">
        <div>
          <h2 className="text-base font-bold text-gray-900">Recent Posts</h2>
          <p className="text-xs text-gray-400 mt-0.5">{posts.length} total posts</p>
        </div>
        <button
          onClick={() => navigate('/posts')}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50"
        >
          View All →
        </button>
      </div>

      <div className="flex-1">
        {recentPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
              <PenSquare className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">No posts yet</p>
            <p className="text-xs text-gray-400">Create your first post to see it here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => navigate(`/posts/${post.id}`)}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/50 flex items-center justify-center shrink-0">
                    <PenSquare className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{post.topic || 'Untitled Post'}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-300" />
                      <span className="text-[11px] text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-gray-200">·</span>
                      <span className="text-[11px] text-gray-400">{post.type || 'General'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 ml-4">
                  <span className={`badge-pill text-[10px] ${STATUS_STYLES[post.status] ?? STATUS_STYLES.Draft}`}>
                    {post.status}
                  </span>
                  <button
                    className="p-1 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    onClick={(e) => { e.stopPropagation(); navigate(`/posts/${post.id}`); }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
