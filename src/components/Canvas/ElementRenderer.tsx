import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmailElement, LayoutElement } from '../../types';
import { getThemeColors } from '../../utils/helpers';

interface ElementRendererProps {
  element: EmailElement | LayoutElement;
  isSelected?: boolean;
  onSelect?: (element: EmailElement | LayoutElement) => void;
}

export function ElementRenderer({ element, isSelected, onSelect }: ElementRendererProps) {
  const { theme, deleteElement, duplicateElement, moveElement } = useApp();
  const themeColors = getThemeColors(theme);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(element);
  };

  const renderLayoutElement = (layoutElement: LayoutElement) => {
    if (layoutElement.type === 'row') {
      const columns = layoutElement.columns || 1;
      
      return (
        <div
          className={`relative group ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
          onClick={handleSelect}
          style={{
            backgroundColor: layoutElement.backgroundColor || 'transparent',
            padding: layoutElement.padding || '10px',
            margin: layoutElement.margin || '0'
          }}
        >
          <div className={`grid grid-cols-${columns} gap-2 min-h-[60px]`}>
            {Array.from({ length: columns }).map((_, index) => {
              const childElement = layoutElement.children[index];
              return (
                <div key={index} className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded p-2 min-h-[50px] flex items-center justify-center">
                  {childElement ? (
                    <ElementRenderer 
                      element={childElement} 
                      onSelect={onSelect}
                      isSelected={isSelected && childElement.id === element.id}
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Drop element here</span>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Hover Controls */}
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 bg-white dark:bg-gray-800 rounded shadow-lg p-1">
            <button
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs"
              onClick={(e) => { e.stopPropagation(); moveElement(element.id, 'up'); }}
              title="Move Up"
            >
              <i className="bi bi-arrow-up"></i>
            </button>
            <button
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs"
              onClick={(e) => { e.stopPropagation(); moveElement(element.id, 'down'); }}
              title="Move Down"
            >
              <i className="bi bi-arrow-down"></i>
            </button>
            <button
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs"
              onClick={(e) => { e.stopPropagation(); duplicateElement(element.id); }}
              title="Duplicate"
            >
              <i className="bi bi-files"></i>
            </button>
            <button
              className="p-1 hover:bg-red-100 text-red-600 rounded text-xs"
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              title="Delete"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderEmailElement = (emailElement: EmailElement) => {
    const styles: React.CSSProperties = {
      fontSize: emailElement.fontSize || '16px',
      fontFamily: emailElement.fontFamily || 'Arial, sans-serif',
      fontWeight: emailElement.fontWeight || 'normal',
      color: emailElement.color || '#000000',
      backgroundColor: emailElement.backgroundColor || 'transparent',
      padding: emailElement.padding || '10px',
      margin: emailElement.margin || '0',
      borderRadius: emailElement.borderRadius || '0',
      textAlign: emailElement.textAlign || 'left',
      textTransform: emailElement.textTransform || 'none',
      width: emailElement.width || 'auto',
      height: emailElement.height || 'auto',
      border: emailElement.border || 'none'
    };

    const wrapperClass = `relative group ${isSelected ? 'ring-2 ring-purple-500' : ''} cursor-pointer`;

    const renderControls = () => (
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 bg-white dark:bg-gray-800 rounded shadow-lg p-1 z-10">
        <button
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs"
          onClick={(e) => { e.stopPropagation(); moveElement(element.id, 'up'); }}
          title="Move Up"
        >
          <i className="bi bi-arrow-up"></i>
        </button>
        <button
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs"
          onClick={(e) => { e.stopPropagation(); moveElement(element.id, 'down'); }}
          title="Move Down"
        >
          <i className="bi bi-arrow-down"></i>
        </button>
        <button
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs"
          onClick={(e) => { e.stopPropagation(); duplicateElement(element.id); }}
          title="Duplicate"
        >
          <i className="bi bi-files"></i>
        </button>
        <button
          className="p-1 hover:bg-red-100 text-red-600 rounded text-xs"
          onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
          title="Delete"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    );

    switch (emailElement.type) {
      case 'text':
        return (
          <div className={wrapperClass} onClick={handleSelect}>
            <div style={styles} dangerouslySetInnerHTML={{ __html: emailElement.content || 'Sample text' }} />
            {renderControls()}
          </div>
        );

      case 'heading':
        return (
          <div className={wrapperClass} onClick={handleSelect}>
            <h2 style={styles}>{emailElement.content || 'Heading'}</h2>
            {renderControls()}
          </div>
        );

      case 'button':
        const buttonBg = emailElement.backgroundColor || themeColors.primary;
        return (
          <div className={wrapperClass} onClick={handleSelect} style={{ textAlign: styles.textAlign as any }}>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: buttonBg,
                borderRadius: styles.borderRadius,
                padding: '12px 24px',
                textAlign: 'center'
              }}
            >
              <span style={{ color: emailElement.color || '#ffffff', textDecoration: 'none', fontFamily: styles.fontFamily, fontSize: styles.fontSize, fontWeight: styles.fontWeight }}>
                {emailElement.content || 'Button'}
              </span>
            </div>
            {renderControls()}
          </div>
        );

      case 'link':
        const linkColor = emailElement.color || themeColors.primary;
        return (
          <div className={wrapperClass} onClick={handleSelect}>
            <div style={styles}>
              <span style={{ color: linkColor, textDecoration: 'underline' }}>
                {emailElement.content || 'Link text'}
              </span>
            </div>
            {renderControls()}
          </div>
        );

      case 'image':
      case 'logo':
        return (
          <div className={wrapperClass} onClick={handleSelect} style={{ textAlign: styles.textAlign as any }}>
            <img
              src={emailElement.src || 'https://via.placeholder.com/150x100?text=Image'}
              alt={emailElement.alt || ''}
              style={{
                width: emailElement.width || '150px',
                height: emailElement.height || '100px',
                borderRadius: styles.borderRadius,
                display: 'block',
                margin: styles.textAlign === 'center' ? '0 auto' : '0'
              }}
            />
            {renderControls()}
          </div>
        );

      case 'divider':
        return (
          <div className={wrapperClass} onClick={handleSelect}>
            <hr style={{ 
              border: 'none', 
              borderTop: `1px solid ${emailElement.color || '#cccccc'}`, 
              margin: styles.margin,
              padding: styles.padding 
            }} />
            {renderControls()}
          </div>
        );

      case 'spacer':
        const spacerHeight = emailElement.height || '20px';
        return (
          <div className={wrapperClass} onClick={handleSelect}>
            <div
              style={{
                height: spacerHeight,
                backgroundColor: '#f3f4f6',
                border: '2px dashed #d1d5db',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '12px'
              }}
            >
              Spacer ({spacerHeight})
            </div>
            {renderControls()}
          </div>
        );

      case 'social':
        const socialIcons = emailElement.socialIcons || [];
        return (
          <div className={wrapperClass} onClick={handleSelect}>
            <div style={styles}>
              {socialIcons.length > 0 ? (
                socialIcons.map((icon, index) => (
                  <span key={index} style={{ marginRight: '10px' }}>
                    <i className={`bi bi-${icon.platform}`} style={{ fontSize: '24px', color: themeColors.primary }}></i>
                  </span>
                ))
              ) : (
                <div className="text-gray-400 text-sm">
                  <i className="bi bi-share mr-2"></i>
                  Social Icons (click to configure)
                </div>
              )}
            </div>
            {renderControls()}
          </div>
        );

      default:
        return null;
    }
  };

  if ('children' in element) {
    return renderLayoutElement(element);
  }

  return renderEmailElement(element);
}