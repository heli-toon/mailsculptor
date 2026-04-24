import { useApp } from '../../contexts/AppContext';
import { EmailElement } from '../../types';

interface DividerSettingsProps {
  element: EmailElement;
}

export function DividerSettings({ element }: DividerSettingsProps) {
  const { updateElement } = useApp();

  const handleChange = <K extends keyof EmailElement>(property: K, value: EmailElement[K]) => {
    updateElement(element.id, { [property]: value } as Partial<EmailElement>);
  };

  return (
    <div className="space-y-4">
      {/* Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Color
        </label>
        <input
          type="color"
          value={element.color || '#e5e7eb'}
          onChange={(e) => handleChange('color', e.target.value)}
          className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md"
        />
      </div>

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Padding
        </label>
        <input
          type="text"
          value={element.padding || '10px 0'}
          onChange={(e) => handleChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="10px 0"
        />
      </div>

      {/* Margin */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Margin
        </label>
        <input
          type="text"
          value={element.margin || '10px 0'}
          onChange={(e) => handleChange('margin', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="10px 0"
        />
      </div>
    </div>
  );
}
