// src/components/CitySearch.tsx
'use client';
import { useState } from 'react';
import { useWeatherStore } from '@/store/weatherStore';

interface CitySearchProps {
  onAddCity: (city: string) => Promise<void>;
  disabled?: boolean;
}

export function CitySearch({ onAddCity, disabled = false }: CitySearchProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      await onAddCity(input.trim());
      setInput('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a city..."
        className={`flex-1 p-2 border rounded-lg bg-white/80 dark:bg-gray-800 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !disabled) {
            handleSubmit();
          }
        }}
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={!input.trim() || disabled || isLoading}
        className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition-all ${!input.trim() || disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          'Add'
        )}
      </button>
    </div>
  );
}