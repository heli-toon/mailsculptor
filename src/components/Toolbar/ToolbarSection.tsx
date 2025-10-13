import React, { useState } from 'react';

interface ToolbarSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function ToolbarSection({ title, icon, children, defaultExpanded = true }: ToolbarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      <button
        className="w-full px-3 py-2 flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-t-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <i className={`bi bi-${icon} text-gray-600 dark:text-gray-400`}></i>
          <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        </div>
        <i className={`bi bi-chevron-${isExpanded ? 'down' : 'right'} text-gray-500`}></i>
      </button>
      
      {isExpanded && (
        <div className="p-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}