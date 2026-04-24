import { EmailElement, LayoutElement, EmailTemplate } from '../types';
import { getThemeColors } from './helpers';

export function generateEmailHTML(
  elements: (EmailElement | LayoutElement)[],
  theme: string = 'purple',
  bodyBackgroundColor: string = '#ffffff'
): string {
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
                ${element.children.map((child) => `
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
        {
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
        }

      case 'link':
        {
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
        }

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
        {
          const spacerHeight = element.height || '20px';
          return `
            <tr>
              <td style="height: ${spacerHeight}; line-height: ${spacerHeight}; font-size: 1px;">&nbsp;</td>
            </tr>
          `;
        }

      case 'social':
        {
          const socialIcons = element.socialIcons || [];
          const socialIconsHTML = socialIcons
            .map((icon) => {
              const iconUrl = getSocialIconUrl(icon.platform);
              return `
                <a href="${icon.url}" style="text-decoration: none; margin-right: 10px;">
                  <img src="${iconUrl}" alt="${icon.platform}" width="24" height="24" style="display: inline-block;" />
                </a>
              `;
            })
            .join('');

          return `
            <tr>
              <td style="${styleString}">
                ${socialIconsHTML}
              </td>
            </tr>
          `;
        }

      default:
        return '';
    }
  };

  const getSocialIconUrl = (platform: string): string => {
    const colors: Record<string, string> = {
      facebook: '#1877F2',
      twitter: '#1DA1F2',
      instagram: '#E4405F',
      linkedin: '#0A66C2',
      youtube: '#FF0000',
      github: '#111827',
      pinterest: '#E60023',
      tiktok: '#000000',
      whatsapp: '#25D366',
      email: '#6B7280',
      website: '#3B82F6'
    };

    const bg = colors[platform] || '#6B7280';
    const label = (platform === 'website' ? 'W' : platform === 'email' ? '@' : platform[0]?.toUpperCase() || '?');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="${bg}"/><text x="12" y="16" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">${label}</text></svg>`;
    const encoded = btoa(svg);
    return `data:image/svg+xml;base64,${encoded}`;
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
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 680px; margin: 0 auto; background-color: ${bodyBackgroundColor};">
        ${elements.map(renderElement).join('')}
      </table>
    </body>
    </html>
  `;

  return emailHTML;
}

export function generateEmailHTMLFromTemplate(template: EmailTemplate): string {
  return generateEmailHTML(
    template.elements,
    template.theme,
    template.bodyBackgroundColor || '#ffffff'
  );
}
