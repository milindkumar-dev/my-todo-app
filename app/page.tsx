'use client';
import { useState } from 'react';
import TodoInput from './components/TodoInput';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todoText: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: todoText,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          My Todo App
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TodoInput onAdd={addTodo} />
          
          {todos.length === 0 ? (
            <p className="text-center text-gray-400 py-8">
              No todos yet. Add one above! 👆
            </p>
          ) : (
            <div className="space-y-2">
              {todos.map((todo) => (
                <div 
                  key={todo.id} 
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setTodos(todos.filter(t => !t.completed))}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear completed
            </button>
          </div>
        )}
      </div>
    </main>
  );
}