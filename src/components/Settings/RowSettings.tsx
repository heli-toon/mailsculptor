import { useApp } from '../../contexts/AppContext';
import { LayoutElement } from '../../types';

interface RowSettingsProps {
  element: LayoutElement;
}

export function RowSettings({ element }: RowSettingsProps) {
  const { updateElement } = useApp();

  const handleChange = (property: string, value: any) => {
    updateElement(element.id, { [property]: value });
  };

  return (
    <div className="space-y-4">
      {/* Number of Columns */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Number of Columns
        </label>
        <select
          value={element.columns || 2}
          onChange={(e) => handleChange('columns', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value={1}>1 Column</option>
          <option value={2}>2 Columns</option>
          <option value={3}>3 Columns</option>
          <option value={4}>4 Columns</option>
        </select>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Background Color
        </label>
        <input
          type="color"
          value={element.backgroundColor || '#ffffff'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
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
          value={element.padding || '20px'}
          onChange={(e) => handleChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="20px"
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
