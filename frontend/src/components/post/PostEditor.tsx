import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { FileText } from 'lucide-react';

interface PostEditorProps {
  content: string;
  setContent: (v: string) => void;
  hashtags: string[];
  setHashtags: (v: string[]) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function PostEditor({ content, setContent, hashtags, setHashtags, onSave, onCancel }: PostEditorProps) {
  const characters = content.length;
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
          <FileText className="w-3.5 h-3.5 text-indigo-500" />
        </div>
        <h2 className="text-sm font-bold text-gray-900">Edit Post</h2>
        <div className="ml-auto flex items-center gap-2 text-[10px] font-medium text-gray-400">
          <span className="px-2 py-1 bg-gray-100 rounded-md">{characters.toLocaleString()} chars</span>
          <span className="px-2 py-1 bg-gray-100 rounded-md">{words.toLocaleString()} words</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[260px] text-[13px] leading-relaxed font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Hashtags</label>
          <Textarea
            value={hashtags.join(' ')}
            onChange={(e) => setHashtags(e.target.value.split(/\s+/).filter(h => h.startsWith('#')))}
            className="min-h-[60px] text-[13px] text-indigo-600"
            placeholder="#ProductManagement #AI #Leadership"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
          <Button size="sm" onClick={onSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
