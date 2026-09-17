import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { PostTable } from '../components/post/PostTable';
import { FileText } from 'lucide-react';

export function Posts() {
  const { posts } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto animate-in" style={{ height: 'calc(100vh - 7rem)' }}>
      <PostTable
        posts={posts}
        title="All Posts"
        showFilters
        emptyMessage={
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-indigo-400" />
            </div>
            <p className="font-semibold text-gray-900 mb-1">No posts yet</p>
            <p className="text-sm text-gray-400 mb-6">Create your first AI-powered LinkedIn post</p>
            <button
              onClick={() => navigate('/create')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient"
            >
              Create first post
            </button>
          </div>
        }
      />
    </div>
  );
}
