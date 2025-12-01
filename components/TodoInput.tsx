import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  // Focus input on mount for quick entry
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative mb-6">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full pl-4 pr-14 py-4 text-lg bg-white border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-slate-400 shadow-sm"
          aria-label="New task input"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-2 p-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
          aria-label="Add task"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
};