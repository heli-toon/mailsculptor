import { useState } from 'react';
import { Button } from '../ui/Button';
import { ElementSettings } from './ElementSettings';

export function RightSidebar() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="primary"
        size="sm"
        className="fixed bottom-4 right-4 z-50 lg:hidden"
        onClick={() => setIsVisible(true)}
      >
        <i className="bi bi-gear"></i>
      </Button>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300
        ${isVisible ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsVisible(false)}
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        </div>
        
        <div className="h-full overflow-y-auto pb-20">
          <ElementSettings />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsVisible(false)}
        />
      )}
    </>
  );
}
