import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../../types';
import { Badge } from '../common/Badge';
import { Search, Copy, Trash2, ExternalLink, PenSquare, Filter } from 'lucide-react';
import { useAppStore } from '../../store';
import { useToastStore } from '../../store/toastStore';

interface PostTableProps {
  posts: Post[];
  title: string;
  emptyMessage: React.ReactNode;
  showFilters?: boolean;
}

const STATUS_VARIANT: Record<string, 'success' | 'info' | 'warning' | 'default'> = {
  Published: 'success', Approved: 'info', Draft: 'warning',
};

export function PostTable({ posts, title, emptyMessage, showFilters = false }: PostTableProps) {
  const navigate = useNavigate();
  const { deletePost } = useAppStore();
  const { addToast } = useToastStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = (post.topic || '').toLowerCase().includes(search.toLowerCase()) ||
                          (post.content || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Delete this post?')) {
      deletePost(id);
      addToast('success', 'Post deleted');
    }
  };

  const handleCopy = (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();
    navigator.clipboard.writeText(post.content);
    addToast('success', 'Content copied');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
            <p className="text-xs text-gray-400 mt-0.5">{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found</p>
          </div>
          <button
            onClick={() => navigate('/create')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white btn-gradient"
          >
            <PenSquare className="w-3.5 h-3.5" />
            New Post
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="input-modern pl-9"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {showFilters && (
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              {['All', 'Published', 'Approved', 'Draft'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === status
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
            {emptyMessage}
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50/90 backdrop-blur-sm border-b border-gray-100">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Post</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  onClick={() => navigate(`/posts/${post.id}`)}
                  className="hover:bg-indigo-50/30 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/50 flex items-center justify-center shrink-0">
                        <PenSquare className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 truncate max-w-[200px]">{post.topic || 'Untitled Post'}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 max-w-[200px] sm:hidden">{post.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{post.type || 'General'}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <Badge variant={STATUS_VARIANT[post.status] ?? 'default'}>{post.status}</Badge>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-xs text-gray-400">
                    {new Date(post.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/posts/${post.id}`); }}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Open"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleCopy(e, post)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, post.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
