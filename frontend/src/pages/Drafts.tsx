import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { PostTable } from '../components/post/PostTable';
import { FileEdit, Zap } from 'lucide-react';

export function Drafts() {
  const { posts } = useAppStore();
  const navigate = useNavigate();
  const drafts = posts.filter((p) => p.status === 'Draft');

  return (
    <div className="max-w-6xl mx-auto animate-in" style={{ height: 'calc(100vh - 7rem)' }}>
      <PostTable
        posts={drafts}
        title="Drafts"
        showFilters={false}
        emptyMessage={
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <FileEdit className="w-7 h-7 text-amber-400" />
            </div>
            <p className="font-semibold text-gray-900 mb-1">No drafts yet</p>
            <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto text-center">
              Posts you save as drafts will appear here, ready to review and publish.
            </p>
            <button
              onClick={() => navigate('/create')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient"
            >
              <Zap className="w-4 h-4" />
              Create a Post
            </button>
          </div>
        }
      />
    </div>
  );
}
