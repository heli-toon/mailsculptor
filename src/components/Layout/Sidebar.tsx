import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-64'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-start"
        >
          <i className={`bi bi-${isCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
          {!isCollapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="p-4 space-y-4 overflow-y-auto h-full">
          {children}
        </div>
      )}
    </div>
  );
}