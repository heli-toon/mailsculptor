import { useApp } from '../../contexts/AppContext';
import { ColorPicker } from '../ui/ColorPicker';

export function TemplateSettings() {
  const { currentTemplate, theme, setTheme, updateTemplate } = useApp();

  if (!currentTemplate) return null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Template</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Customize global email settings (applies to the whole template).
        </p>
      </div>

      <ColorPicker
        label="Email body background"
        value={currentTemplate.bodyBackgroundColor || '#ffffff'}
        onChange={(color) => updateTemplate({ bodyBackgroundColor: color })}
      />

      <ColorPicker
        label="Theme color"
        value={theme}
        onChange={(color) => setTheme(color as `#${string}`)}
      />
    </div>
  );
}
