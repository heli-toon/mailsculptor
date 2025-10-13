import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmailElement, LayoutElement } from '../../types';
import { generateId } from '../../utils/helpers';

interface ColumnDropZoneProps {
  rowId: string;
  columnIndex: number;
  children?: React.ReactNode;
}

const KNOWN_TYPES = new Set(['text','heading','button','link','image','logo','divider','spacer','social']);

export function ColumnDropZone({ rowId, columnIndex, children }: ColumnDropZoneProps) {
  const { addElementToColumn, moveElementToColumn } = useApp();
  const [isDragOver, setIsDragOver] = useState(false);

  const getDropIntent = (e: React.DragEvent): 'new' | 'existing' => {
    try {
      const jsonData = e.dataTransfer.getData('application/json');
      if (jsonData) {
        const data = JSON.parse(jsonData);
        if (data?.type === 'existing-element') return 'existing';
        if (data?.type === 'element') return 'new';
      }
    } catch {
      // ignore and fall through
    }
    const textData = e.dataTransfer.getData('text/plain');
    if (textData) {
      return KNOWN_TYPES.has(textData) ? 'new' : 'existing';
    }
    return 'new';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    try {
      const jsonData = e.dataTransfer.getData('application/json');
      const textData = e.dataTransfer.getData('text/plain');
      
      if (jsonData) {
        const data = JSON.parse(jsonData);
        if (data.type === 'element') {
          const newElement = createElementFromType(data.elementType);
          if (newElement) addElementToColumn(rowId, columnIndex, newElement);
          return;
        } else if (data.type === 'existing-element') {
          moveElementToColumn(data.elementId, rowId, columnIndex);
          return;
        }
        // Fallback if JSON not recognized
        if (textData) {
          if (KNOWN_TYPES.has(textData)) {
            const newElement = createElementFromType(textData);
            if (newElement) addElementToColumn(rowId, columnIndex, newElement);
          } else {
            moveElementToColumn(textData, rowId, columnIndex);
          }
          return;
        }
      }

      if (textData) {
        if (KNOWN_TYPES.has(textData)) {
          const newElement = createElementFromType(textData);
          if (newElement) addElementToColumn(rowId, columnIndex, newElement);
        } else {
          moveElementToColumn(textData, rowId, columnIndex);
        }
      }
    } catch (error) {
      console.error('Failed to process drop:', error);
      const fallback = e.dataTransfer.getData('text/plain');
      if (fallback) {
        if (KNOWN_TYPES.has(fallback)) {
          const newElement = createElementFromType(fallback);
          if (newElement) addElementToColumn(rowId, columnIndex, newElement);
        } else {
          moveElementToColumn(fallback, rowId, columnIndex);
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = getDropIntent(e) === 'existing' ? 'move' : 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = getDropIntent(e) === 'existing' ? 'move' : 'copy';
    setIsDragOver(true);
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

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-[80px] border-2 border-dashed rounded-md p-2 transition-all ${
        isDragOver 
          ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20' 
          : 'border-gray-200 dark:border-gray-600'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {children || (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          {isDragOver ? (
            <>
              <i className="bi bi-plus-circle mr-2"></i>
              Drop element here
            </>
          ) : (
            'Drop element here'
          )}
        </div>
      )}
    </div>
  );
}
