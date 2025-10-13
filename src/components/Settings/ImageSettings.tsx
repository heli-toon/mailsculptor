import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmailElement } from '../../types';

interface ImageSettingsProps {
  element: EmailElement;
}

export function ImageSettings({ element }: ImageSettingsProps) {
  const { updateElement } = useApp();
  
  // Local state to prevent losing focus
  const [localValues, setLocalValues] = useState({
    src: element.src || '',
    alt: element.alt || '',
    width: element.width || '',
    height: element.height || '',
    borderRadius: element.borderRadius || '0px',
    textAlign: element.textAlign || 'left',
    padding: element.padding || '10px'
  });

  // Update local state when element changes from outside
  useEffect(() => {
    setLocalValues({
      src: element.src || '',
      alt: element.alt || '',
      width: element.width || '',
      height: element.height || '',
      borderRadius: element.borderRadius || '0px',
      textAlign: element.textAlign || 'left',
      padding: element.padding || '10px'
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
      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Image URL
        </label>
        <input
          type="url"
          value={localValues.src}
          onChange={(e) => handleChange('src', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Alt Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Alt Text
        </label>
        <input
          type="text"
          value={localValues.alt}
          onChange={(e) => handleChange('alt', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Description of the image"
        />
      </div>

      {/* Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Width
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={parsePixelValue(localValues.width)}
            onChange={(e) => handlePixelChange('width', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            min="0"
          />
          <span className="ml-2 text-sm text-gray-500">px</span>
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Height
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={parsePixelValue(localValues.height)}
            onChange={(e) => handlePixelChange('height', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            min="0"
          />
          <span className="ml-2 text-sm text-gray-500">px</span>
        </div>
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

      {/* Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Alignment
        </label>
        <div className="flex space-x-2">
          {[
            { value: 'left', icon: 'bi-arrow-left' },
            { value: 'center', icon: 'bi-arrow-up' },
            { value: 'right', icon: 'bi-arrow-right' }
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

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Padding
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={parsePixelValue(localValues.padding)}
            onChange={(e) => handlePixelChange('padding', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            min="0"
          />
          <span className="ml-2 text-sm text-gray-500">px</span>
        </div>
      </div>
    </div>
  );
}
