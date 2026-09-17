import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Zap } from 'lucide-react';
import { PostForm } from '../components/post/PostForm';
import { GenerationProgress } from '../components/post/GenerationProgress';
import { useAppStore } from '../store';
import { mockPosts } from '../data/mockData';

export function CreatePost() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createPost } = useAppStore();

  const [topic, setTopic] = useState(location.state?.topic || '');
  const [audience, setAudience] = useState('Product Managers and Product Leaders');
  const [tone, setTone] = useState('Conversational');
  const [postType, setPostType] = useState('Industry Insight');
  const [goal, setGoal] = useState('Engagement');
  const [length, setLength] = useState('Medium');
  const [instructions, setInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const newPost = {
        topic, audience, tone,
        type: postType, goal, length, instructions,
        content: mockPosts[0].content,
        hashtags: mockPosts[0].hashtags,
        status: 'Draft' as const,
        metrics: mockPosts[0].metrics,
        analysis: mockPosts[0].analysis,
      };

      createPost(newPost);

      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('linkedin_agent_posts') || '[]');
        navigate(posts.length > 0 ? `/posts/${posts[0].id}` : '/posts');
      }, 100);
    }, 4500);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create a Post</h1>
          <p className="text-gray-400 text-sm mt-0.5">Configure your idea — AI handles the writing.</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-xs font-semibold text-indigo-600">Gemini 1.5 Pro</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: form */}
        <div className="flex-1 min-w-0 pb-6">
          <PostForm
            topic={topic} setTopic={setTopic}
            audience={audience} setAudience={setAudience}
            tone={tone} setTone={setTone}
            postType={postType} setPostType={setPostType}
            goal={goal} setGoal={setGoal}
            length={length} setLength={setLength}
            instructions={instructions} setInstructions={setInstructions}
          />

          {/* Generate CTA */}
          <div className="mt-6 sticky bottom-4">
            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-bold text-white btn-gradient disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-300/40 transition-all"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating your post...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Generate with AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: preview panel */}
        <div className="hidden lg:flex w-[400px] shrink-0 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/80 shadow-sm overflow-hidden sticky top-4 self-start" style={{ minHeight: '580px' }}>
          {isGenerating ? (
            <GenerationProgress />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-10 text-center w-full space-y-4">
              {/* Decorative cards stack */}
              <div className="relative w-32 h-28 mb-4">
                {[2, 1, 0].map(i => (
                  <div
                    key={i}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100/60 shadow-sm"
                    style={{ transform: `rotate(${(i - 1) * 5}deg) translateY(${i * -6}px)`, zIndex: i }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center z-10 text-4xl">✨</div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1">AI Preview</h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[200px] mx-auto">
                  Fill in your idea and click generate. Your LinkedIn post will appear here.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {['Hook', 'Content', 'Hashtags', 'Analysis'].map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-gray-100 text-[10px] font-semibold text-gray-500">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
