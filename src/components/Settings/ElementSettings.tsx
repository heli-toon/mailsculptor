import { useApp } from '../../contexts/AppContext';
import { TextSettings } from './TextSettings';
import { ButtonSettings } from './ButtonSettings';
import { ImageSettings } from './ImageSettings';
import { DividerSettings } from './DividerSettings';
import { SpacerSettings } from './SpacerSettings';
import { SocialSettings } from './SocialSettings';
import { RowSettings } from './RowSettings';
import { TemplateSettings } from './TemplateSettings';

export function ElementSettings() {
  const { selectedElement } = useApp();

  if (!selectedElement) {
    return (
      <div className="p-4">
        <TemplateSettings />
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
          <i className="bi bi-cursor text-2xl mb-2 block"></i>
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const renderSettings = () => {
    switch (selectedElement.type) {
      case 'text':
      case 'heading':
        return <TextSettings element={selectedElement} />;
      case 'button':
        return <ButtonSettings element={selectedElement} />;
      case 'link':
        return <TextSettings element={selectedElement} />;
      case 'image':
      case 'logo':
        return <ImageSettings element={selectedElement} />;
      case 'divider':
        return <DividerSettings element={selectedElement} />;
      case 'spacer':
        return <SpacerSettings element={selectedElement} />;
      case 'social':
        return <SocialSettings element={selectedElement} />;
      case 'row':
        return <RowSettings element={selectedElement} />;
      default:
        return (
          <div className="p-4 text-gray-500 dark:text-gray-400">
            <p className="text-sm">Settings not available for this element type</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white capitalize">
          {selectedElement.type} Settings
        </h3>
      </div>
      {renderSettings()}
    </div>
  );
}
