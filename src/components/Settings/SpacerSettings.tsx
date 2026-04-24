import { useApp } from '../../contexts/AppContext';
import { EmailElement } from '../../types';

interface SpacerSettingsProps {
  element: EmailElement;
}

export function SpacerSettings({ element }: SpacerSettingsProps) {
  const { updateElement } = useApp();

  const handleChange = <K extends keyof EmailElement>(property: K, value: EmailElement[K]) => {
    updateElement(element.id, { [property]: value } as Partial<EmailElement>);
  };

  return (
    <div className="space-y-4">
      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Height
        </label>
        <input
          type="text"
          value={element.height || '40px'}
          onChange={(e) => handleChange('height', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="40px"
        />
      </div>
    </div>
  );
}
