export interface EmailElement {
  id: string;
  type: 'text' | 'button' | 'link' | 'logo' | 'image' | 'divider' | 'social' | 'heading' | 'spacer';
  content?: string;
  url?: string;
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  border?: string;
  socialIcons?: SocialIcon[];
}

export interface SocialIcon {
  platform:
    | 'facebook'
    | 'twitter'
    | 'instagram'
    | 'linkedin'
    | 'youtube'
    | 'github'
    | 'pinterest'
    | 'tiktok'
    | 'whatsapp'
    | 'email'
    | 'website';
  url: string;
}

export interface LayoutElement {
  id: string;
  type: 'row' | 'column';
  columns?: number;
  children: (EmailElement | LayoutElement)[];
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  width?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  elements: (EmailElement | LayoutElement)[];
  theme: ThemeColor;
  bodyBackgroundColor?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ThemeColor = 'purple' | 'blue' | 'red' | 'orange' | 'black' | `#${string}`;

export interface AppState {
  currentTemplate: EmailTemplate | null;
  selectedElement: EmailElement | LayoutElement | null;
  viewMode: 'desktop' | 'mobile';
  theme: ThemeColor;
  darkMode: boolean;
  history: EmailTemplate[];
  historyIndex: number;
}

export interface DragItem {
  type: 'element';
  elementType: EmailElement['type'] | 'row';
  id?: string;
}
