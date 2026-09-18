import { ThumbsUp, MessageSquare, Repeat2, Send, Globe, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../../store';

interface LinkedInPreviewProps {
  content: string;
  hashtags: string[];
}

export function LinkedInPreview({ content, hashtags }: LinkedInPreviewProps) {
  const { user } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);
  if (!user) return null;

  const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
  const previewText = isExpanded ? content : content.slice(0, 300);
  const isLong = content.length > 300;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-lg mx-auto w-full">
      {/* Browser-like top bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[10px] font-medium text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200">linkedin.com • Preview</span>
        </div>
      </div>

      {/* LinkedIn card */}
      <div className="p-4 linkedin-post">
        {/* Author */}
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-base shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-semibold text-[15px] text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] cursor-pointer">{user.name}</span>
              <span className="text-[#666] text-[13px]">• 1st</span>
            </div>
            <p className="text-[12px] text-[#666] leading-none mb-0.5 mt-0.5 line-clamp-1">{user.headline}</p>
            <p className="text-[12px] text-[#666] flex items-center gap-1">
              Just now •
              <Globe className="w-3 h-3" />
            </p>
          </div>
          <button className="p-1 text-[#666] hover:text-gray-900 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="text-[14px] text-[rgba(0,0,0,0.9)] leading-[1.5] mb-3 whitespace-pre-wrap">
          {previewText}
          {isLong && (
            <span>
              {!isExpanded && '... '}
              <button
                type="button"
                onClick={() => setIsExpanded((expanded) => !expanded)}
                className="text-[#0a66c2] font-semibold hover:underline"
              >
                {isExpanded ? 'see less' : 'see more'}
              </button>
            </span>
          )}
        </div>

        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="flex flex-wrap gap-x-1 gap-y-0.5 mb-3">
            {hashtags.map((tag) => (
              <span key={tag} className="text-[#0a66c2] text-[14px] font-medium hover:underline cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Reactions bar */}
        <div className="flex items-center gap-1 text-[12px] text-[#666] mb-2 pb-2 border-b border-[#e0dede]">
          <div className="flex -space-x-0.5">
            <span className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center text-[8px]">👍</span>
            <span className="w-4 h-4 rounded-full bg-[#f5987e] flex items-center justify-center text-[8px]">❤️</span>
          </div>
          <span className="ml-1">24 · 8 comments</span>
        </div>
      </div>

      {/* Action bar */}
      <div className="px-2 pb-2">
        <div className="grid grid-cols-4 gap-0">
          {[
            { icon: ThumbsUp, label: 'Like' },
            { icon: MessageSquare, label: 'Comment' },
            { icon: Repeat2, label: 'Repost' },
            { icon: Send, label: 'Send' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center justify-center gap-1.5 py-2.5 px-1 hover:bg-gray-100 rounded-lg transition-colors text-[#666] hover:text-[#333]"
            >
              <Icon className="w-4 h-4" />
              <span className="text-[12px] font-semibold hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
