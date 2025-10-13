import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmailElement, LayoutElement } from '../../types';
import { generateId } from '../../utils/helpers';

interface InsertDropZoneProps {
  index: number;
}

export function InsertDropZone({ index }: InsertDropZoneProps) {
  const { addElementAtIndex } = useApp();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));

      if (data.type === 'element') {
        const newElement = createElementFromType(data.elementType);
        if (newElement) {
          addElementAtIndex(newElement, index);
        }
      }
    } catch (error) {
      console.error('Failed to process drop:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const createElementFromType = (type: string): EmailElement | LayoutElement | null => {
    const id = generateId();

    switch (type) {
      case 'text':
        return {
          id,
          type: 'text',
          content: 'Your text content goes here. You can edit this text in the settings panel.',
          fontSize: '16px',
          color: '#000000',
          padding: '10px',
          margin: '0'
        };

      case 'heading':
        return {
          id,
          type: 'heading',
          content: 'Your Heading Here',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000000',
          padding: '10px',
          margin: '0'
        };

      case 'button':
        return {
          id,
          type: 'button',
          content: 'Click Me',
          url: 'https://example.com',
          backgroundColor: '#8B5CF6',
          color: '#ffffff',
          borderRadius: '8px',
          padding: '12px 24px',
          margin: '10px 0'
        };

      case 'link':
        return {
          id,
          type: 'link',
          content: 'Click this link',
          url: 'https://example.com',
          color: '#8B5CF6',
          padding: '5px',
          margin: '0'
        };

      case 'image':
        return {
          id,
          type: 'image',
          src: 'https://images.pexels.com/photos/341088/pexels-photo-341088.jpeg?auto=compress&cs=tinysrgb&w=400',
          alt: 'Sample image',
          width: '300px',
          height: '200px',
          borderRadius: '8px',
          padding: '10px',
          margin: '0'
        };

      case 'logo':
        return {
          id,
          type: 'logo',
          src: 'https://via.placeholder.com/200x80/8B5CF6/ffffff?text=LOGO',
          alt: 'Company Logo',
          width: '200px',
          height: '80px',
          textAlign: 'center',
          padding: '20px',
          margin: '0'
        };

      case 'divider':
        return {
          id,
          type: 'divider',
          color: '#e5e7eb',
          padding: '10px 0',
          margin: '10px 0'
        };

      case 'spacer':
        return {
          id,
          type: 'spacer',
          height: '40px'
        };

      case 'social':
        return {
          id,
          type: 'social',
          textAlign: 'center',
          padding: '20px',
          socialIcons: [
            { platform: 'facebook', url: 'https://facebook.com' },
            { platform: 'twitter', url: 'https://twitter.com' },
            { platform: 'instagram', url: 'https://instagram.com' }
          ]
        };

      case 'row':
        return {
          id,
          type: 'row',
          columns: 2,
          children: [],
          padding: '20px',
          margin: '10px 0'
        };

      default:
        return null;
    }
  };

  return (
    <div
      className={`transition-all duration-200 ${
        isDragOver ? 'h-16 bg-purple-100 dark:bg-purple-900/20 border-2 border-dashed border-purple-400' : 'h-2 opacity-0 hover:opacity-100'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {isDragOver && (
        <div className="flex items-center justify-center h-full text-purple-600 dark:text-purple-400 text-sm font-medium">
          <i className="bi bi-plus-circle mr-2"></i>
          Drop here to insert
        </div>
      )}
    </div>
  );
}
