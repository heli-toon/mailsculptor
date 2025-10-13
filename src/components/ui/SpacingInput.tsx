import React, { useState } from 'react';

interface SpacingInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SpacingInput({ label, value, onChange, placeholder = '0' }: SpacingInputProps) {
  const [mode, setMode] = useState<'simple' | 'advanced'>('simple');

  const parseSimpleValue = (val: string): number => {
    const num = parseInt(val.replace(/[^\d]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const simpleValue = parseSimpleValue(value);

  const handleSimpleChange = (newValue: number) => {
    onChange(`${Math.max(0, newValue)}px`);
  };

  const handleAdvancedChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <button
          type="button"
          className="text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
          onClick={() => setMode(mode === 'simple' ? 'advanced' : 'simple')}
        >
          {mode === 'simple' ? 'Advanced' : 'Simple'}
        </button>
      </div>

      {mode === 'simple' ? (
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors border border-gray-300 dark:border-gray-600"
            onClick={() => handleSimpleChange(simpleValue - 1)}
          >
            <i className="bi bi-dash"></i>
          </button>
          <input
            type="number"
            value={simpleValue}
            onChange={(e) => handleSimpleChange(parseInt(e.target.value) || 0)}
            className="flex-1 px-3 py-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
          />
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors border border-gray-300 dark:border-gray-600"
            onClick={() => handleSimpleChange(simpleValue + 1)}
          >
            <i className="bi bi-plus"></i>
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[2rem]">px</span>
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => handleAdvancedChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      )}

      {mode === 'advanced' && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Examples: "10px", "10px 20px", "10px 20px 10px 20px"
        </p>
      )}
    </div>
  );
}