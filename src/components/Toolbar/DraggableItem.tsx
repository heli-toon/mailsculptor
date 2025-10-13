import React from 'react';
import { EmailElement } from '../../types';

interface DraggableItemProps {
  type: EmailElement['type'] | 'row';
  icon: string;
  label: string;
  description?: string;
}

export function DraggableItem({ type, icon, label, description }: DraggableItemProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type: 'element', elementType: type }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center space-x-3 p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
        <i className={`bi bi-${icon} text-purple-600 dark:text-purple-400`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{description}</p>
        )}
      </div>
    </div>
  );
}