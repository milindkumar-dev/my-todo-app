'use client';
import { useState } from 'react';

interface TodoInputProps {
  onAdd: (todo: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onAdd(input);
      setInput(''); // Clear input after adding
    }
  };

  return (
    <div className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        <button 
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}