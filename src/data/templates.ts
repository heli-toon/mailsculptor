import { EmailTemplate } from '../types';
import { generateId } from '../utils/helpers';

export const sampleTemplates: EmailTemplate[] = [
  {
    id: generateId(),
    name: 'Welcome Newsletter',
    theme: 'purple',
    bodyBackgroundColor: '#ffffff',
    createdAt: new Date(),
    updatedAt: new Date(),
    elements: [
      {
        id: generateId(),
        type: 'row',
        columns: 1,
        backgroundColor: '#8B5CF6',
        padding: '40px 20px',
        children: [
          {
            id: generateId(),
            type: 'heading',
            content: 'Welcome to Our Newsletter!',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            margin: '0'
          }
        ]
      },
      {
        id: generateId(),
        type: 'row',
        columns: 1,
        padding: '40px 20px',
        children: [
          {
            id: generateId(),
            type: 'text',
            content:
              "Thanks for subscribing! We're excited to have you on board. You'll receive our latest updates, tips, and exclusive content right in your inbox.",
            fontSize: '16px',
            textAlign: 'center',
            padding: '0 0 20px 0'
          },
          {
            id: generateId(),
            type: 'button',
            content: 'Get Started',
            url: 'https://example.com',
            backgroundColor: '#8B5CF6',
            color: '#ffffff',
            borderRadius: '8px',
            textAlign: 'center'
          }
        ]
      },
      {
        id: generateId(),
        type: 'divider',
        color: '#e5e7eb',
        margin: '20px 0'
      },
      {
        id: generateId(),
        type: 'social',
        textAlign: 'center',
        padding: '20px',
        socialIcons: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'twitter', url: 'https://twitter.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'youtube', url: 'https://youtube.com' }
        ]
      }
    ]
  },
  {
    id: generateId(),
    name: 'Product Announcement',
    theme: 'blue',
    bodyBackgroundColor: '#ffffff',
    createdAt: new Date(),
    updatedAt: new Date(),
    elements: [
      {
        id: generateId(),
        type: 'row',
        columns: 1,
        padding: '20px',
        children: [
          {
            id: generateId(),
            type: 'logo',
            src: 'https://via.placeholder.com/200x80/3B82F6/ffffff?text=LOGO',
            alt: 'Company Logo',
            width: '200px',
            height: '80px',
            textAlign: 'center'
          }
        ]
      },
      {
        id: generateId(),
        type: 'row',
        columns: 2,
        padding: '20px',
        children: [
          {
            id: generateId(),
            type: 'image',
            src: 'https://images.pexels.com/photos/341088/pexels-photo-341088.jpeg?auto=compress&cs=tinysrgb&w=400',
            alt: 'Product Image',
            width: '100%',
            borderRadius: '8px'
          },
          {
            id: generateId(),
            type: 'text',
            content:
              '<h3>New Product Launch</h3><p>Introducing our latest innovation that will revolutionize the way you work. Built with cutting-edge technology and user-centered design.</p>',
            fontSize: '16px',
            padding: '20px'
          }
        ]
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Learn More',
        url: 'https://example.com',
        backgroundColor: '#3B82F6',
        color: '#ffffff',
        borderRadius: '6px',
        textAlign: 'center',
        margin: '20px 0'
      }
    ]
  },
  {
    id: generateId(),
    name: 'Minimal Newsletter',
    theme: 'black',
    bodyBackgroundColor: '#ffffff',
    createdAt: new Date(),
    updatedAt: new Date(),
    elements: [
      {
        id: generateId(),
        type: 'spacer',
        height: '40px'
      },
      {
        id: generateId(),
        type: 'heading',
        content: 'Weekly Update',
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1F2937',
        margin: '0 0 20px 0'
      },
      {
        id: generateId(),
        type: 'text',
        content: "A curated selection of the week's most interesting stories and insights.",
        fontSize: '16px',
        textAlign: 'center',
        color: '#6B7280',
        margin: '0 0 40px 0'
      },
      {
        id: generateId(),
        type: 'row',
        columns: 1,
        backgroundColor: '#F9FAFB',
        padding: '30px 20px',
        margin: '20px 0',
        children: [
          {
            id: generateId(),
            type: 'text',
            content:
              '<h4 style="margin: 0 0 10px 0;">Article Title</h4><p style="margin: 0; color: #6B7280;">Brief description of the article content and why it matters to your audience.</p>',
            fontSize: '16px'
          }
        ]
      },
      {
        id: generateId(),
        type: 'link',
        content: 'Read the full newsletter →',
        url: 'https://example.com',
        color: '#1F2937',
        textAlign: 'center',
        margin: '40px 0'
      }
    ]
  },
  {
    id: generateId(),
    name: 'Sale Promotion',
    theme: '#F97316',
    bodyBackgroundColor: '#FFF7ED',
    createdAt: new Date(),
    updatedAt: new Date(),
    elements: [
      {
        id: generateId(),
        type: 'row',
        columns: 1,
        backgroundColor: '#FFF7ED',
        padding: '32px 20px',
        children: [
          {
            id: generateId(),
            type: 'heading',
            content: 'Weekend Sale: Up to 40% Off',
            fontSize: '30px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#111827',
            margin: '0 0 12px 0'
          },
          {
            id: generateId(),
            type: 'text',
            content:
              'Shop our best sellers with limited-time discounts. Ends Sunday at 11:59 PM.',
            textAlign: 'center',
            color: '#374151',
            padding: '0 0 18px 0'
          },
          {
            id: generateId(),
            type: 'button',
            content: 'Shop Now',
            url: 'https://example.com',
            backgroundColor: '#F97316',
            color: '#ffffff',
            borderRadius: '10px',
            textAlign: 'center',
            margin: '0'
          }
        ]
      },
      {
        id: generateId(),
        type: 'divider',
        color: '#FED7AA',
        margin: '20px 0'
      },
      {
        id: generateId(),
        type: 'social',
        textAlign: 'center',
        padding: '16px',
        socialIcons: [
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'tiktok', url: 'https://tiktok.com' },
          { platform: 'website', url: 'https://example.com' }
        ]
      }
    ]
  },
  {
    id: generateId(),
    name: 'Event Invitation',
    theme: '#3B82F6',
    bodyBackgroundColor: '#EFF6FF',
    createdAt: new Date(),
    updatedAt: new Date(),
    elements: [
      {
        id: generateId(),
        type: 'row',
        columns: 1,
        backgroundColor: '#3B82F6',
        padding: '28px 20px',
        children: [
          {
            id: generateId(),
            type: 'heading',
            content: 'You’re Invited',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            margin: '0'
          }
        ]
      },
      {
        id: generateId(),
        type: 'row',
        columns: 1,
        padding: '24px 20px',
        children: [
          {
            id: generateId(),
            type: 'text',
            content:
              '<p style="margin: 0 0 10px 0;"><strong>Thursday, May 14</strong> · 6:00 PM</p><p style="margin: 0;">123 Main St, Springfield</p>',
            textAlign: 'center',
            color: '#111827'
          },
          {
            id: generateId(),
            type: 'button',
            content: 'RSVP',
            url: 'https://example.com',
            backgroundColor: '#3B82F6',
            color: '#ffffff',
            borderRadius: '8px',
            textAlign: 'center',
            margin: '18px 0 0 0'
          }
        ]
      },
      {
        id: generateId(),
        type: 'social',
        textAlign: 'center',
        padding: '16px',
        socialIcons: [
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'website', url: 'https://example.com' },
          { platform: 'email', url: 'mailto:hello@example.com' }
        ]
      }
    ]
  }
];

