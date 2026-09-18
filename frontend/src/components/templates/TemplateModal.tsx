import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useAppStore } from '../../store';
import { useToastStore } from '../../store/toastStore';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TemplateModal({ isOpen, onClose }: TemplateModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tone, setTone] = useState('Professional');
  
  const { createTemplate } = useAppStore();
  const { addToast } = useToastStore();

  const handleSave = async () => {
    if (!name || !description || !instructions) {
      addToast('error', 'Please fill in all fields');
      return;
    }

    try {
      await createTemplate({ name, description, instructions, tone });
    } catch {
      addToast('error', 'Unable to create template');
      return;
    }

    addToast('success', 'Template created successfully');
    onClose();
    // Reset form
    setName('');
    setDescription('');
    setInstructions('');
    setTone('Professional');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Template">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g. Weekly Product Update"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <Input 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="What is this template for?"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Writing Instructions</label>
          <Textarea 
            value={instructions} 
            onChange={(e) => setInstructions(e.target.value)} 
            placeholder="How should the AI format this post?"
            className="min-h-[100px]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Tone</label>
          <Select value={tone} onChange={(e) => setTone(e.target.value)}>
            {['Professional', 'Conversational', 'Educational', 'Storytelling', 'Bold'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Template</Button>
        </div>
      </div>
    </Modal>
  );
}
