import { useState } from 'react';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
}

const presetColors = [
  '#000000', '#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af',
  '#6b7280', '#374151', '#1f2937', '#111827', '#ef4444', '#f97316',
  '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
  '#d946ef', '#ec4899', '#f43f5e'
];

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          className="w-full h-10 border border-gray-300 rounded-md flex items-center px-3 space-x-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => setShowPicker(!showPicker)}
        >
          <div
            className="w-6 h-6 rounded border"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm font-mono">{value}</span>
        </button>

        {showPicker && (
          <div className="absolute top-full left-0 z-10 mt-1 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
            <div className="grid grid-cols-9 gap-1 mb-3">
              {presetColors.map(color => (
                <button title='Select color'
                  key={color}
                  type="button"
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    onChange(color);
                    setShowPicker(false);
                  }}
                />
              ))}
            </div>
            <input title='Custom color'
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-8 border border-gray-300 rounded cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}