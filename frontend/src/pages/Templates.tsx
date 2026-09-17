import { useState } from 'react';
import { useAppStore } from '../store';
import { TemplateCard } from '../components/templates/TemplateCard';
import { TemplateModal } from '../components/templates/TemplateModal';
import { Plus, LayoutTemplate } from 'lucide-react';

export function Templates() {
  const { templates } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Templates</h1>
          <p className="text-gray-400 text-sm mt-0.5">Reusable writing frameworks to start faster.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white/60 rounded-2xl border border-white/80">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
            <LayoutTemplate className="w-7 h-7 text-indigo-400" />
          </div>
          <p className="font-semibold text-gray-900 mb-1">No templates yet</p>
          <p className="text-sm text-gray-400 mb-6 max-w-xs">Create reusable templates to speed up your content creation.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient"
          >
            <Plus className="w-4 h-4" />
            Create Your First Template
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((template, index) => (
            <TemplateCard key={template.id} template={template} index={index} />
          ))}
        </div>
      )}

      <TemplateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
