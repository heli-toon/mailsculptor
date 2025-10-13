import { EmailElement, LayoutElement } from '../types';
import { getThemeColors } from './helpers';

export function generateEmailHTML(elements: (EmailElement | LayoutElement)[], theme: string = 'purple'): string {
  const themeColors = getThemeColors(theme);
  
  const renderElement = (element: EmailElement | LayoutElement): string => {
    if ('children' in element) {
      return renderLayoutElement(element);
    }
    return renderEmailElement(element);
  };

  const renderLayoutElement = (element: LayoutElement): string => {
    if (element.type === 'row') {
      const columns = element.columns || 1;
      const columnWidth = Math.floor(100 / columns);
      
      return `
        <tr>
          <td style="padding: ${element.padding || '10px'}; margin: ${element.margin || '0'}; background-color: ${element.backgroundColor || 'transparent'};">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${element.children.map((child, index) => `
                  <td width="${columnWidth}%" valign="top" style="padding: 5px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${renderElement(child)}
                    </table>
                  </td>
                `).join('')}
              </tr>
            </table>
          </td>
        </tr>
      `;
    }
    return '';
  };

  const renderEmailElement = (element: EmailElement): string => {
    const styles = {
      fontSize: element.fontSize || '16px',
      fontFamily: element.fontFamily || 'Arial, sans-serif',
      fontWeight: element.fontWeight || 'normal',
      color: element.color || '#000000',
      backgroundColor: element.backgroundColor || 'transparent',
      padding: element.padding || '10px',
      margin: element.margin || '0',
      borderRadius: element.borderRadius || '0',
      textAlign: element.textAlign || 'left',
      textTransform: element.textTransform || 'none',
      width: element.width || 'auto',
      height: element.height || 'auto',
      border: element.border || 'none'
    };

    const styleString = Object.entries(styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ');

    switch (element.type) {
      case 'text':
        return `
          <tr>
            <td style="${styleString}">
              ${element.content || 'Sample text'}
            </td>
          </tr>
        `;

      case 'heading':
        return `
          <tr>
            <td style="${styleString}">
              <h2 style="margin: 0; font-size: ${styles.fontSize}; font-family: ${styles.fontFamily}; font-weight: ${styles.fontWeight}; color: ${styles.color}; text-align: ${styles.textAlign}; text-transform: ${styles.textTransform};">
                ${element.content || 'Heading'}
              </h2>
            </td>
          </tr>
        `;

      case 'button':
        const buttonBg = element.backgroundColor || themeColors.primary;
        return `
          <tr>
            <td style="padding: ${styles.padding}; text-align: ${styles.textAlign};">
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: ${buttonBg}; border-radius: ${styles.borderRadius}; padding: 12px 24px;">
                    <a href="${element.url || '#'}" style="color: ${element.color || '#ffffff'}; text-decoration: none; font-family: ${styles.fontFamily}; font-size: ${styles.fontSize}; font-weight: ${styles.fontWeight}; display: block;">
                      ${element.content || 'Button'}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        `;

      case 'link':
        const linkColor = element.color || themeColors.primary;
        return `
          <tr>
            <td style="${styleString}">
              <a href="${element.url || '#'}" style="color: ${linkColor}; text-decoration: underline; font-family: ${styles.fontFamily}; font-size: ${styles.fontSize};">
                ${element.content || 'Link text'}
              </a>
            </td>
          </tr>
        `;

      case 'image':
      case 'logo':
        return `
          <tr>
            <td style="padding: ${styles.padding}; text-align: ${styles.textAlign};">
              <img src="${element.src || 'https://via.placeholder.com/150x100'}" 
                   alt="${element.alt || ''}" 
                   width="${element.width || '150'}" 
                   height="${element.height || '100'}" 
                   style="display: block; border-radius: ${styles.borderRadius}; max-width: 100%; height: auto;" />
            </td>
          </tr>
        `;

      case 'divider':
        return `
          <tr>
            <td style="padding: ${styles.padding};">
              <hr style="border: none; border-top: 1px solid ${element.color || '#cccccc'}; margin: 0;" />
            </td>
          </tr>
        `;

      case 'spacer':
        const spacerHeight = element.height || '20px';
        return `
          <tr>
            <td style="height: ${spacerHeight}; line-height: ${spacerHeight}; font-size: 1px;">&nbsp;</td>
          </tr>
        `;

      case 'social':
        const socialIcons = element.socialIcons || [];
        const socialIconsHTML = socialIcons.map(icon => {
          const iconUrl = getSocialIconUrl(icon.platform);
          return `
            <a href="${icon.url}" style="text-decoration: none; margin-right: 10px;">
              <img src="${iconUrl}" alt="${icon.platform}" width="24" height="24" style="display: inline-block;" />
            </a>
          `;
        }).join('');

        return `
          <tr>
            <td style="${styleString}">
              ${socialIconsHTML}
            </td>
          </tr>
        `;

      default:
        return '';
    }
  };

  const getSocialIconUrl = (platform: string): string => {
    // Using simple colored icons - in production, you'd use actual social media icons
    const icons = {
      facebook: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMTIiIGZpbGw9IiMxODc3RjIiLz4KPHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggNi43NUg2LjI1VjlIMTBWMTAuMjVIOC43NVYxMkg2LjI1VjEwLjI1SDQuNVY5SDYuMjVWNi43NUg0LjVWNS41SDEwVjYuNzVIOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K',
      twitter: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMTIiIGZpbGw9IiMxREE1RjIiLz4KPC9zdmc+',
      instagram: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMTIiIGZpbGw9IiNFNDQwNUYiLz4KPC9zdmc+',
      linkedin: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMTIiIGZpbGw9IiMwQTY2QzIiLz4KPC9zdmc+',
      youtube: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMTIiIGZpbGw9IiNGRjAwMDAiLz4KPC9zdmc+'
    };
    return icons[platform as keyof typeof icons] || icons.facebook;
  };

  const emailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        img { max-width: 100%; height: auto; }
      </style>
    </head>
    <body>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 680px; margin: 0 auto; background-color: #ffffff;">
        ${elements.map(renderElement).join('')}
      </table>
    </body>
    </html>
  `;

  return emailHTML;
}