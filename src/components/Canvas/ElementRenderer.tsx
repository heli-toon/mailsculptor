import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { EmailElement, LayoutElement } from '../../types';
import { getThemeColors } from '../../utils/helpers';
import { ColumnDropZone } from './ColumnDropZone';

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

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    const dragData = {
      type: 'existing-element',
      elementId: element.id,
      element: element
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.setData('text/plain', element.id); // Fallback
    e.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    // Remove visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '';
    }
  };

  const renderLayoutElement = (layoutElement: LayoutElement) => {
    if (layoutElement.type === 'row') {
      const columns = layoutElement.columns || 1;
      
      return (
        <div
          className={`relative group ${isSelected ? 'ring-2 ring-purple-500' : ''} cursor-move`}
          onClick={handleSelect}
          draggable={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{
            backgroundColor: layoutElement.backgroundColor || 'transparent',
            padding: layoutElement.padding || '10px',
            margin: layoutElement.margin || '0'
          }}
        >
          <div className={`grid gap-2 min-h-[80px]`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, index) => {
              const childElement = layoutElement.children?.[index];
              return (
                <ColumnDropZone key={index} rowId={layoutElement.id} columnIndex={index}>
                  {childElement && (
                    <ElementRenderer 
                      element={childElement} 
                      onSelect={onSelect}
                      isSelected={isSelected && childElement.id === element.id}
                    />
                  )}
                </ColumnDropZone>
              );
            })}
          </div>
          
          {/* Drag Handle and Controls */}
          <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-1">
              <i className="bi bi-grip-vertical text-gray-400 cursor-move"></i>
            </div>
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

    const wrapperClass = `relative group ${isSelected ? 'ring-2 ring-purple-500' : ''} cursor-move`;

    const renderControls = () => (
      <>
        {/* Drag Handle */}
        <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-1">
            <i className="bi bi-grip-vertical text-gray-400 cursor-move"></i>
          </div>
        </div>
        
        {/* Action Controls */}
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
      </>
    );

    const commonProps = {
      className: wrapperClass,
      onClick: handleSelect,
      draggable: true,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd
    };

    switch (emailElement.type) {
      case 'text':
        return (
          <div {...commonProps}>
            <div style={styles} dangerouslySetInnerHTML={{ __html: emailElement.content || 'Sample text' }} />
            {renderControls()}
          </div>
        );

      case 'heading':
        return (
          <div {...commonProps}>
            <h2 style={styles}>{emailElement.content || 'Heading'}</h2>
            {renderControls()}
          </div>
        );

      case 'button':
        {
          const buttonBg = emailElement.backgroundColor || themeColors.primary;
          return (
            <div {...commonProps} style={{ textAlign: styles.textAlign as React.CSSProperties['textAlign'] }}>
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
        }

      case 'link':
        {
          const linkColor = emailElement.color || themeColors.primary;
          return (
            <div {...commonProps}>
              <div style={styles}>
                <span style={{ color: linkColor, textDecoration: 'underline' }}>
                  {emailElement.content || 'Link text'}
                </span>
              </div>
              {renderControls()}
            </div>
          );
        }

      case 'image':
      case 'logo':
        return (
          <div {...commonProps} style={{ textAlign: styles.textAlign as React.CSSProperties['textAlign'] }}>
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
          <div {...commonProps}>
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
        {
          const spacerHeight = emailElement.height || '20px';
          return (
            <div {...commonProps}>
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
        }

      case 'social':
        {
          const socialIcons = emailElement.socialIcons || [];
          const getBootstrapIconName = (platform: string) => {
            switch (platform) {
              case 'facebook':
                return 'facebook';
              case 'twitter':
                return 'twitter';
              case 'instagram':
                return 'instagram';
              case 'linkedin':
                return 'linkedin';
              case 'youtube':
                return 'youtube';
              case 'github':
                return 'github';
              case 'pinterest':
                return 'pinterest';
              case 'tiktok':
                return 'tiktok';
              case 'whatsapp':
                return 'whatsapp';
              case 'email':
                return 'envelope';
              case 'website':
                return 'globe';
              default:
                return 'link-45deg';
            }
          };
          return (
            <div {...commonProps}>
              <div style={styles}>
                {socialIcons.length > 0 ? (
                  socialIcons.map((icon, index) => (
                    <span key={index} style={{ marginRight: '10px' }}>
                      <i className={`bi bi-${getBootstrapIconName(icon.platform)}`} style={{ fontSize: '24px', color: themeColors.primary }}></i>
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
        }

      default:
        return null;
    }
  };

  if ('children' in element) {
    return renderLayoutElement(element);
  }

  return renderEmailElement(element);
}
