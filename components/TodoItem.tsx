import React from 'react';
import { Trash2, Check } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="group flex items-center justify-between p-4 mb-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center flex-1 gap-4 min-w-0">
        <button
          onClick={() => onToggle(todo.id)}
          className={`
            relative flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
            ${todo.completed 
              ? 'bg-primary-500 border-primary-500 text-white' 
              : 'border-slate-300 hover:border-primary-500 text-transparent'}
          `}
          aria-checked={todo.completed}
          role="checkbox"
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        >
          <Check size={14} strokeWidth={3} />
        </button>
        
        <span 
          className={`
            flex-1 text-lg truncate transition-all duration-200
            ${todo.completed ? 'text-slate-400 line-through decoration-slate-300 decoration-2' : 'text-slate-700'}
          `}
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="ml-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        aria-label={`Delete task: ${todo.text}`}
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
};