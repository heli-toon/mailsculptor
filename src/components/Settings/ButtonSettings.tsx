import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmailElement } from '../../types';

interface ButtonSettingsProps {
  element: EmailElement;
}

export function ButtonSettings({ element }: ButtonSettingsProps) {
  const { updateElement } = useApp();
  
  // Local state to prevent losing focus
  const [localValues, setLocalValues] = useState({
    content: element.content || '',
    url: element.url || '',
    backgroundColor: element.backgroundColor || '#8B5CF6',
    color: element.color || '#ffffff',
    borderRadius: element.borderRadius || '8px',
    padding: element.padding || '12px 24px',
    textAlign: element.textAlign || 'center'
  });

  // Update local state when element changes from outside
  useEffect(() => {
    setLocalValues({
      content: element.content || '',
      url: element.url || '',
      backgroundColor: element.backgroundColor || '#8B5CF6',
      color: element.color || '#ffffff',
      borderRadius: element.borderRadius || '8px',
      padding: element.padding || '12px 24px',
      textAlign: element.textAlign || 'center'
    });
  }, [element.id]);

  const handleChange = (property: string, value: any) => {
    setLocalValues(prev => ({ ...prev, [property]: value }));
    updateElement(element.id, { [property]: value });
  };

  const parsePixelValue = (value: string) => {
    return parseInt(value.replace('px', '')) || 0;
  };

  const handlePixelChange = (property: string, numValue: number) => {
    const pxValue = `${numValue}px`;
    setLocalValues(prev => ({ ...prev, [property]: pxValue }));
    updateElement(element.id, { [property]: pxValue });
  };

  return (
    <div className="space-y-4">
      {/* Button Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Button Text
        </label>
        <input
          type="text"
          value={localValues.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Button text"
        />
      </div>

      {/* URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          URL
        </label>
        <input
          type="url"
          value={localValues.url}
          onChange={(e) => handleChange('url', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="https://example.com"
        />
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Background Color
        </label>
        <input
          type="color"
          value={localValues.backgroundColor}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md"
        />
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text Color
        </label>
        <input
          type="color"
          value={localValues.color}
          onChange={(e) => handleChange('color', e.target.value)}
          className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md"
        />
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Border Radius
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={parsePixelValue(localValues.borderRadius)}
            onChange={(e) => handlePixelChange('borderRadius', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            min="0"
          />
          <span className="ml-2 text-sm text-gray-500">px</span>
        </div>
      </div>

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Padding
        </label>
        <input
          type="text"
          value={localValues.padding}
          onChange={(e) => handleChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="12px 24px"
        />
      </div>

      {/* Text Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Alignment
        </label>
        <div className="flex space-x-2">
          {[
            { value: 'left', icon: 'bi-text-left' },
            { value: 'center', icon: 'bi-text-center' },
            { value: 'right', icon: 'bi-text-right' }
          ].map(({ value, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleChange('textAlign', value)}
              className={`flex-1 p-2 border rounded-md flex items-center justify-center ${
                localValues.textAlign === value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <i className={`bi ${icon}`}></i>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
