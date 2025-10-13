export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getThemeColors(theme: string) {
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