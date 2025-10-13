import { useApp } from '../../contexts/AppContext';
import { EmailElement } from '../../types';
import { Button } from '../ui/Button';

interface SocialSettingsProps {
  element: EmailElement;
}

export function SocialSettings({ element }: SocialSettingsProps) {
  const { updateElement } = useApp();

  const handleChange = (property: string, value: any) => {
    updateElement(element.id, { [property]: value });
  };

  const addSocialIcon = () => {
    const currentIcons = element.socialIcons || [];
    const newIcons = [...currentIcons, { platform: 'facebook', url: '' }];
    handleChange('socialIcons', newIcons);
  };

  const updateSocialIcon = (index: number, field: 'platform' | 'url', value: string) => {
    const currentIcons = element.socialIcons || [];
    const newIcons = [...currentIcons];
    newIcons[index] = { ...newIcons[index], [field]: value };
    handleChange('socialIcons', newIcons);
  };

  const removeSocialIcon = (index: number) => {
    const currentIcons = element.socialIcons || [];
    const newIcons = currentIcons.filter((_, i) => i !== index);
    handleChange('socialIcons', newIcons);
  };

  return (
    <div className="space-y-4">
      {/* Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Alignment
        </label>
        <select title='Alignment'
          value={element.textAlign || 'center'}
          onChange={(e) => handleChange('textAlign', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
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

      {/* Social Icons */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Social Icons
          </label>
          <Button variant="secondary" size="sm" onClick={addSocialIcon}>
            <i className="bi bi-plus mr-1"></i>
            Add
          </Button>
        </div>
        
        <div className="space-y-3">
          {(element.socialIcons || []).map((icon, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Icon {index + 1}
                </span>
                <button
                  onClick={() => removeSocialIcon(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <i className="bi bi-trash text-sm"></i>
                </button>
              </div>
              
              <div className="space-y-2">
                <select title='Platform'
                  value={icon.platform}
                  onChange={(e) => updateSocialIcon(index, 'platform', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="github">GitHub</option>
                </select>
                
                <input
                  type="url"
                  value={icon.url}
                  onChange={(e) => updateSocialIcon(index, 'url', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
