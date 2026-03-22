import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface CreatePollProps {
  onCreate: (question: string, options: string[], category: string) => void;
  onCancel: () => void;
}

export function CreatePoll({ onCreate, onCancel }: CreatePollProps) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [category, setCategory] = useState('general');

  const addOption = () => {
    if (options.length < 6) setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = () => {
    const validOptions = options.filter((o) => o.trim());
    if (!question.trim() || validOptions.length < 2) return;
    onCreate(question, validOptions, category);
  };

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-lg p-4 space-y-3">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50"
      />

      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-3 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50"
            />
            {options.length > 2 && (
              <button
                onClick={() => removeOption(index)}
                className="p-1.5 text-gray-600 hover:text-danger-light transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {options.length < 6 && (
          <button
            onClick={addOption}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add option
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-dark-700 border border-dark-600 rounded-lg px-2 py-1 text-xs text-gray-400 focus:outline-none"
        >
          <option value="general">General</option>
          <option value="events">Events</option>
          <option value="analysis">Analysis</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!question.trim() || options.filter((o) => o.trim()).length < 2}
            className="px-4 py-1.5 bg-accent text-white text-xs rounded-lg hover:bg-accent-light transition-colors disabled:opacity-40"
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
}
