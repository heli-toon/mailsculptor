import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmailElement, LayoutElement } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ColorPicker } from '../ui/ColorPicker';
import { SpacingInput } from '../ui/SpacingInput';
import { Button } from '../ui/Button';

export function ElementSettings() {
  const { selectedElement, updateElement, deleteElement, duplicateElement } = useApp();

  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        <i className="bi bi-cursor text-2xl mb-2 block"></i>
        <p>Select an element to edit its properties</p>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<EmailElement | LayoutElement>) => {
    updateElement(selectedElement.id, updates);
  };

  const element = selectedElement as EmailElement;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
          {element.type} Settings
        </h3>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => duplicateElement(selectedElement.id)}
            title="Duplicate"
          >
            <i className="bi bi-files"></i>
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => deleteElement(selectedElement.id)}
            title="Delete"
          >
            <i className="bi bi-trash"></i>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Content */}
        {['text', 'heading', 'button', 'link'].includes(element.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <textarea
              value={element.content || ''}
              onChange={(e) => handleUpdate({ content: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        )}

        {/* URL */}
        {['button', 'link'].includes(element.type) && (
          <Input
            label="URL"
            value={element.url || ''}
            onChange={(e) => handleUpdate({ url: e.target.value })}
            placeholder="https://example.com"
          />
        )}

        {/* Image Source */}
        {['image', 'logo'].includes(element.type) && (
          <>
            <Input
              label="Image URL"
              value={element.src || ''}
              onChange={(e) => handleUpdate({ src: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            <Input
              label="Alt Text"
              value={element.alt || ''}
              onChange={(e) => handleUpdate({ alt: e.target.value })}
              placeholder="Image description"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Width"
                value={element.width || ''}
                onChange={(e) => handleUpdate({ width: e.target.value })}
                placeholder="150px or 100%"
              />
              <Input
                label="Height"
                value={element.height || ''}
                onChange={(e) => handleUpdate({ height: e.target.value })}
                placeholder="100px or auto"
              />
            </div>
          </>
        )}

        {/* Typography */}
        {['text', 'heading', 'button', 'link'].includes(element.type) && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Font Size"
                value={element.fontSize || '16px'}
                onChange={(e) => handleUpdate({ fontSize: e.target.value })}
                placeholder="16px"
              />
              <Select
                label="Font Weight"
                value={element.fontWeight || 'normal'}
                onChange={(e) => handleUpdate({ fontWeight: e.target.value })}
                options={[
                  { value: 'normal', label: 'Normal' },
                  { value: 'bold', label: 'Bold' },
                  { value: '300', label: 'Light' },
                  { value: '500', label: 'Medium' },
                  { value: '600', label: 'Semi Bold' },
                  { value: '700', label: 'Bold' },
                  { value: '800', label: 'Extra Bold' }
                ]}
              />
            </div>

            <Select
              label="Font Family"
              value={element.fontFamily || 'Arial, sans-serif'}
              onChange={(e) => handleUpdate({ fontFamily: e.target.value })}
              options={[
                { value: 'Arial, sans-serif', label: 'Arial' },
                { value: 'Helvetica, sans-serif', label: 'Helvetica' },
                { value: 'Georgia, serif', label: 'Georgia' },
                { value: 'Times New Roman, serif', label: 'Times New Roman' },
                { value: 'Verdana, sans-serif', label: 'Verdana' },
                { value: 'Courier New, monospace', label: 'Courier New' }
              ]}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Text Alignment
              </label>
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {[
                  { value: 'left', icon: 'text-left' },
                  { value: 'center', icon: 'text-center' },
                  { value: 'right', icon: 'text-right' }
                ].map(({ value, icon }) => (
                  <button
                    key={value}
                    type="button"
                    className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
                      (element.textAlign || 'left') === value
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    onClick={() => handleUpdate({ textAlign: value as any })}
                  >
                    <i className={`bi bi-${icon}`}></i>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Text Color"
            value={element.color || '#000000'}
            onChange={(color) => handleUpdate({ color })}
          />
          <ColorPicker
            label="Background"
            value={element.backgroundColor || 'transparent'}
            onChange={(backgroundColor) => handleUpdate({ backgroundColor })}
          />
        </div>

        {/* Spacing */}
        <div className="space-y-4">
          <SpacingInput
            label="Padding"
            value={element.padding || '10px'}
            onChange={(padding) => handleUpdate({ padding })}
            placeholder="10px or 10px 20px"
          />
          <SpacingInput
            label="Margin"
            value={element.margin || '0'}
            onChange={(margin) => handleUpdate({ margin })}
            placeholder="0 or 10px 0"
          />
        </div>

        {/* Border Radius */}
        <SpacingInput
          label="Border Radius"
          value={element.borderRadius || '0'}
          onChange={(borderRadius) => handleUpdate({ borderRadius })}
          placeholder="0 or 8px"
        />

        {/* Social Icons Settings */}
        {element.type === 'social' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Social Media Links
            </label>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Click on social icons in the canvas to add/edit links
            </div>
          </div>
        )}

        {/* Spacer Height */}
        {element.type === 'spacer' && (
          <SpacingInput
            label="Height"
            value={element.height || '20px'}
            onChange={(height) => handleUpdate({ height })}
            placeholder="20px"
          />
        )}

        {/* Divider Color */}
        {element.type === 'divider' && (
          <ColorPicker
            label="Line Color"
            value={element.color || '#cccccc'}
            onChange={(color) => handleUpdate({ color })}
          />
        )}
      </div>
    </div>
  );
}