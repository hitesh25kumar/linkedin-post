import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { PostAnalysis } from '../components/post/PostAnalysis';
import { LinkedInPreview } from '../components/post/LinkedInPreview';
import { PostEditor } from '../components/post/PostEditor';
import { RegenerateMenu } from '../components/post/RegenerateMenu';
import { Badge } from '../components/common/Badge';
import { useToastStore } from '../store/toastStore';
import { ArrowLeft, Copy, Save, Edit3, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';

export function PostResult() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, updatePost, deletePost } = useAppStore();
  const { addToast } = useToastStore();

  const post = posts.find(p => p.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post?.content || '');
  const [editHashtags, setEditHashtags] = useState<string[]>(post?.hashtags || []);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Removing this useEffect to fix react-hooks/set-state-in-effect warning.
  // Instead we will initialize it when clicking Edit.

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 text-center">
        <p className="text-gray-500 mb-4">Post not found.</p>
        <button onClick={() => navigate('/dashboard')} className="text-indigo-600 font-semibold hover:underline">Back to Dashboard</button>
      </div>
    );
  }

  const STATUS_VARIANT: Record<string, 'success' | 'info' | 'warning'> = {
    Published: 'success', Approved: 'info', Draft: 'warning',
  };

  const handleSaveDraft = async () => {
    await updatePost(post.id, { status: 'Draft' });
    addToast('success', 'Post saved to drafts');
    navigate('/drafts');
  };

  const handleApprove = async () => {
    await updatePost(post.id, { status: 'Approved' });
    addToast('success', 'Post approved and saved');
    navigate('/posts');
  };

  const handleCopy = () => {
    const text = `${post.content}\n\n${(post.hashtags || []).join(' ')}`;
    navigator.clipboard.writeText(text);
    addToast('success', 'Copied to clipboard');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(post.id);
      addToast('success', 'Post deleted');
      navigate('/posts');
    }
  };

  const handleSaveEdit = async () => {
    await updatePost(post.id, { content: editContent, hashtags: editHashtags });
    setIsEditing(false);
    addToast('success', 'Changes saved');
  };

  const handleRegenerate = async (reason: string) => {
    setIsRegenerating(true);
    addToast('info', `Regenerating: ${reason}...`);
    setTimeout(async () => {
      setIsRegenerating(false);
      await updatePost(post.id, { content: post.content + `\n\nRefined for: ${reason}` });
      addToast('success', 'Post regenerated');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200 hover:shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 line-clamp-1">{post.topic || 'Untitled Post'}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant={STATUS_VARIANT[post.status] ?? 'default'}>{post.status}</Badge>
              <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Desktop action bar */}
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-sm">
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
          <button onClick={handleSaveDraft} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-sm">
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>
          <button onClick={handleApprove} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white btn-gradient">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Analysis + actions */}
        <div className="space-y-4">
          <PostAnalysis metrics={post.metrics} analysis={post.analysis} />

          {/* Action panel */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm p-4 flex flex-wrap gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => { setEditContent(post.content); setEditHashtags(post.hashtags || []); setIsEditing(true); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all flex-1 min-w-[110px] justify-center"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <div className="flex-1 min-w-[110px]">
                  <RegenerateMenu onRegenerate={handleRegenerate} />
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-all flex-1 min-w-[110px] justify-center"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all flex-1 min-w-[110px] justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </>
            ) : null}
          </div>

          {/* Mobile actions */}
          <div className="flex flex-col gap-2 sm:hidden">
            <button onClick={handleSaveDraft} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 bg-white">
              <Save className="w-4 h-4" /> Save Draft
            </button>
            <button onClick={handleApprove} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient">
              <CheckCircle2 className="w-4 h-4" /> Approve & Save
            </button>
          </div>
        </div>

        {/* Right: Preview or Editor */}
        <div className="relative">
          {isRegenerating && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 rounded-2xl flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
              <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Regenerating post...
              </div>
            </div>
          )}

          {isEditing ? (
            <PostEditor
              content={editContent}
              setContent={setEditContent}
              hashtags={editHashtags}
              setHashtags={setEditHashtags}
              onSave={handleSaveEdit}
              onCancel={() => {
                setIsEditing(false);
                setEditContent(post.content);
                setEditHashtags(post.hashtags || []);
              }}
            />
          ) : (
            <LinkedInPreview content={post.content} hashtags={post.hashtags || []} />
          )}
        </div>
      </div>
    </div>
  );
}
