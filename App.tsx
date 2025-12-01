import React, { useMemo } from 'react';
import { CheckCircle2, ListTodo, Trash } from 'lucide-react';
import { Todo, FilterType } from './types';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('zentask-todos', []);
  const [filter, setFilter] = React.useState<FilterType>('all');

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    // Add to top of list
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTodos([]);
    }
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12">
      <main className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-primary-600">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">ZenTask</h1>
              <p className="text-slate-500 font-medium">Focus on what matters</p>
            </div>
          </div>
          
          <div className="text-right hidden sm:block">
            <div className="text-2xl font-bold text-slate-900">{stats.active}</div>
            <div className="text-sm text-slate-500 font-medium">Tasks Pending</div>
          </div>
        </div>

        {/* Add Task */}
        <TodoInput onAdd={handleAddTodo} />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex p-1 bg-white border border-slate-200 rounded-lg w-full sm:w-auto">
            {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                  flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all duration-200
                  ${filter === f 
                    ? 'bg-primary-50 text-primary-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
                `}
              >
                {f}
              </button>
            ))}
          </div>

          {todos.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Trash size={16} />
              Clear All
            </button>
          )}
        </div>

        {/* Task List */}
        <div className="space-y-1">
          {filteredTodos.length > 0 ? (
            <ul className="space-y-3">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-300 mb-4">
                <ListTodo size={32} />
              </div>
              <p className="text-slate-500 font-medium">
                {filter === 'completed' 
                  ? "No completed tasks yet. Keep going!" 
                  : filter === 'active' 
                    ? "No active tasks. You're all caught up!"
                    : "No tasks found. Add one above!"}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-slate-400">
          <p>Press <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-xs font-semibold text-slate-500">Enter</kbd> to add a task</p>
        </div>
      </main>
    </div>
  );
};

export default App;