import { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmailElement } from '../../types';

interface TextSettingsProps {
  element: EmailElement;
}

export function TextSettings({ element }: TextSettingsProps) {
  const { updateElement } = useApp();
  
  const [localValues, setLocalValues] = useState({
    content: element.content || '',
    fontSize: element.fontSize || '16px',
    fontWeight: element.fontWeight || 'normal',
    color: element.color || '#000000',
    textAlign: element.textAlign || 'left',
    padding: element.padding || '10px',
    margin: element.margin || '0',
    url: element.url || ''
  });

  // Update local state when element changes from outside
  useEffect(() => {
    setLocalValues({
      content: element.content || '',
      fontSize: element.fontSize || '16px',
      fontWeight: element.fontWeight || 'normal',
      color: element.color || '#000000',
      textAlign: element.textAlign || 'left',
      padding: element.padding || '10px',
      margin: element.margin || '0',
      url: element.url || ''
    });
  }, [element.id]);

  const handleChange = (property: string, value: unknown) => {
    setLocalValues(prev => ({ ...prev, [property]: value }));
    updateElement(element.id, { [property]: value } as Partial<EmailElement>);
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
      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content
        </label>
        <textarea
          value={localValues.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          rows={4}
          placeholder="Enter your text content..."
        />
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Font Size
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={parsePixelValue(localValues.fontSize)}
            onChange={(e) => handlePixelChange('fontSize', parseInt(e.target.value) || 16)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            min="8"
            max="72"
          />
          <span className="ml-2 text-sm text-gray-500">px</span>
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Font Weight
        </label>
        <select title='Font Weight'
          value={localValues.fontWeight}
          onChange={(e) => handleChange('fontWeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Lighter</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
          <option value="600">600</option>
          <option value="700">700</option>
          <option value="800">800</option>
          <option value="900">900</option>
        </select>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text Color
        </label>
        <input title='Text Color'
          type="color"
          value={localValues.color}
          onChange={(e) => handleChange('color', e.target.value)}
          className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md"
        />
      </div>

      {/* Text Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text Alignment
        </label>
        <div className="flex space-x-2">
          {[
            { value: 'left', icon: 'bi-text-left' },
            { value: 'center', icon: 'bi-text-center' },
            { value: 'right', icon: 'bi-text-right' },
            { value: 'justify', icon: 'bi-justify' }
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

      {/* Margin */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Margin
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={parsePixelValue(localValues.margin)}
            onChange={(e) => handlePixelChange('margin', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            min="0"
          />
          <span className="ml-2 text-sm text-gray-500">px</span>
        </div>
      </div>

      {/* URL field for links */}
      {element.type === 'link' && (
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
      )}
    </div>
  );
}
