import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { DropZone } from './DropZone';
import { ElementRenderer } from './ElementRenderer';
import { InsertDropZone } from './InsertDropZone';
import { Button } from '../ui/Button';
import { ToolbarContent } from '../Toolbar/ToolbarContent';

export function Canvas() {
  const { currentTemplate, selectedElement, selectElement, viewMode } = useApp();
  const [showMobileToolbar, setShowMobileToolbar] = React.useState(false);

  if (!currentTemplate) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 text-center">
          <i className="bi bi-envelope text-4xl mb-4 block"></i>
          <p>No template loaded</p>
        </div>
      </div>
    );
  }

  const canvasWidth = viewMode === 'desktop' ? 'min(680px, 100%)' : 'min(360px, 100%)';

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectElement(null);
    }
  };

  return (
    <DropZone className="flex-1 bg-gray-50 dark:bg-gray-800 flex flex-col overflow-hidden relative">
      {/* Mobile Toolbar Toggle */}
      <Button
        variant="primary"
        size="sm"
        className="fixed bottom-4 left-4 z-50 lg:hidden"
        onClick={() => setShowMobileToolbar(true)}
      >
        <i className="bi bi-plus-circle mr-1"></i>
        Elements
      </Button>

      {/* Mobile Toolbar Overlay */}
      {showMobileToolbar && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowMobileToolbar(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 z-50 lg:hidden overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Elements</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileToolbar(false)}
              >
                <i className="bi bi-x-lg"></i>
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <ToolbarContent />
            </div>
          </div>
        </>
      )}

      <div className="flex-1 flex items-start justify-center p-4 lg:p-8 overflow-y-auto">
        <div className="relative w-full max-w-4xl">
        {/* Canvas Header */}
          <div className="mb-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm">
            <i className={`bi bi-${viewMode === 'desktop' ? 'laptop' : 'phone'} text-purple-600`}></i>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {viewMode === 'desktop' ? 'Desktop' : 'Mobile'} Preview ({canvasWidth})
            </span>
          </div>
        </div>

        {/* Canvas - Always white background like an HTML document */}
        <div
            className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 mx-auto"
          style={{ width: canvasWidth, minHeight: '600px' }}
          onClick={handleCanvasClick}
        >
          {currentTemplate.elements.length === 0 ? (
              <div className="h-96 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 m-4 rounded-lg">
              <div className="text-center">
                <i className="bi bi-plus-circle text-3xl mb-2 block"></i>
                <p>Drag elements here to start building your email</p>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <InsertDropZone index={0} />
              {currentTemplate.elements.map((element, index) => (
                <React.Fragment key={element.id}>
                  <ElementRenderer
                    element={element}
                    isSelected={selectedElement?.id === element.id}
                    onSelect={selectElement}
                  />
                  <InsertDropZone index={index + 1} />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Canvas Footer Info */}
          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Email-safe HTML will be generated with table-based layout
        </div>
        </div>
      </div>
    </DropZone>
  );
}