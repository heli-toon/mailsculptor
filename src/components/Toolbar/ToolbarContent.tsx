import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { generateId } from '../../utils/helpers';

export function ToolbarContent() {
  const { addElement } = useApp();
  const [draggedElement, setDraggedElement] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const elements = [
    { type: 'text', label: 'Text', icon: 'bi-fonts' },
    { type: 'heading', label: 'Heading', icon: 'bi-type-h1' },
    { type: 'button', label: 'Button', icon: 'bi-square' },
    { type: 'link', label: 'Link', icon: 'bi-link-45deg' },
    { type: 'image', label: 'Image', icon: 'bi-image' },
    { type: 'logo', label: 'Logo', icon: 'bi-badge-tm' },
    { type: 'divider', label: 'Divider', icon: 'bi-hr' },
    { type: 'spacer', label: 'Spacer', icon: 'bi-distribute-vertical' },
    { type: 'social', label: 'Social', icon: 'bi-share' },
    { type: 'row', label: 'Columns', icon: 'bi-columns' }
  ];

  const handleDragStart = (e: React.DragEvent, elementType: string) => {
    const data = {
      type: 'element',
      elementType
    };
    e.dataTransfer.setData('application/json', JSON.stringify(data));
    e.dataTransfer.setData('text/plain', elementType); // Fallback
    e.dataTransfer.effectAllowed = 'copy';
    setDraggedElement(elementType);
  };

  const handleDragEnd = () => {
    setDraggedElement(null);
  };

  const handleMobileClick = (elementType: string) => {
    // On mobile, clicking an element adds it directly to the canvas
    const newElement = createElementFromType(elementType);
    if (newElement) {
      addElement(newElement);
    }
  };

  const createElementFromType = (type: string) => {
    const id = generateId();

    switch (type) {
      case 'text':
        return {
          id,
          type: 'text' as const,
          content: 'Your text content goes here. You can edit this text in the settings panel.',
          fontSize: '16px',
          color: '#000000',
          padding: '10px',
          margin: '0'
        };

      case 'heading':
        return {
          id,
          type: 'heading' as const,
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
          type: 'button' as const,
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
          type: 'link' as const,
          content: 'Click this link',
          url: 'https://example.com',
          color: '#8B5CF6',
          padding: '5px',
          margin: '0'
        };

      case 'image':
        return {
          id,
          type: 'image' as const,
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
          type: 'logo' as const,
          src: 'https://via.placeholder.com/200x80/8B5CF6/ffffff?text=LOGO',
          alt: 'Company Logo',
          width: '200px',
          height: '80px',
          textAlign: 'center' as const,
          padding: '20px',
          margin: '0'
        };

      case 'divider':
        return {
          id,
          type: 'divider' as const,
          color: '#e5e7eb',
          padding: '10px 0',
          margin: '10px 0'
        };

      case 'spacer':
        return {
          id,
          type: 'spacer' as const,
          height: '40px'
        };

      case 'social':
        return {
          id,
          type: 'social' as const,
          textAlign: 'center' as const,
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
          type: 'row' as const,
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
    <>
      {isMobile && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <i className="bi bi-info-circle mr-2"></i>
            Tap an element to add it to your email
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3">
        {elements.map((element) => (
          <div
            key={element.type}
            className={`
              bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center cursor-pointer transition-all
              hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20
              ${draggedElement === element.type ? 'opacity-50 scale-95' : 'hover:scale-105'}
              ${isMobile ? 'active:scale-95' : ''}
            `}
            draggable={!isMobile}
            onDragStart={(e) => !isMobile && handleDragStart(e, element.type)}
            onDragEnd={handleDragEnd}
            onClick={() => isMobile && handleMobileClick(element.type)}
          >
            <i className={`${element.icon} text-2xl text-purple-600 dark:text-purple-400 mb-2 block`}></i>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
