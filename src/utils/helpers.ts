export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getThemeColors(theme: string) {
  const normalizeHex = (hex: string) => {
    const cleaned = hex.trim();
    if (!cleaned.startsWith('#')) return null;
    const value = cleaned.slice(1);
    if (value.length === 3 && /^[0-9a-fA-F]{3}$/.test(value)) {
      return `#${value.split('').map(c => c + c).join('')}`.toUpperCase();
    }
    if (value.length === 6 && /^[0-9a-fA-F]{6}$/.test(value)) {
      return `#${value}`.toUpperCase();
    }
    return null;
  };

  const clamp = (n: number) => Math.max(0, Math.min(255, n));

  const adjustHex = (hex: string, amount: number) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return hex;
    const r = parseInt(normalized.slice(1, 3), 16);
    const g = parseInt(normalized.slice(3, 5), 16);
    const b = parseInt(normalized.slice(5, 7), 16);
    const adjust = (c: number) => clamp(Math.round(c + amount));
    const toHex = (c: number) => c.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(adjust(r))}${toHex(adjust(g))}${toHex(adjust(b))}`;
  };

  const custom = normalizeHex(theme);
  if (custom) {
    return {
      primary: custom,
      primaryHover: adjustHex(custom, -18),
      primaryLight: adjustHex(custom, 120),
      primaryDark: adjustHex(custom, -70)
    };
  }

  const themes = {
    purple: {
      primary: '#8B5CF6',
      primaryHover: '#7C3AED',
      primaryLight: '#EDE9FE',
      primaryDark: '#5B21B6'
    },
    blue: {
      primary: '#3B82F6',
      primaryHover: '#2563EB',
      primaryLight: '#DBEAFE',
      primaryDark: '#1D4ED8'
    },
    red: {
      primary: '#EF4444',
      primaryHover: '#DC2626',
      primaryLight: '#FEE2E2',
      primaryDark: '#B91C1C'
    },
    orange: {
      primary: '#F97316',
      primaryHover: '#EA580C',
      primaryLight: '#FED7AA',
      primaryDark: '#C2410C'
    },
    black: {
      primary: '#1F2937',
      primaryHover: '#111827',
      primaryLight: '#F3F4F6',
      primaryDark: '#000000'
    }
  };
  return themes[theme as keyof typeof themes] || themes.purple;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadFile(content: string, filename: string, contentType: string = 'text/html') {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
