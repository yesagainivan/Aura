// Premium "Zinc" based neutral theme for a clean, pro look.
// No blue tinges in dark mode.

export const theme = {
    light: {
        bg: '#ffffff',
        text: '#18181b', // Zn-900
        secondaryText: '#71717a', // Zn-500
        border: '#e4e4e7', // Zn-200
        panelBg: '#fafafa', // Zn-50
        panelBorder: '#f4f4f5', // Zn-100
        accent: '#18181b', // Black accent
        accentText: '#ffffff',
        hover: '#f4f4f5',
    },
    dark: {
        bg: '#09090b', // Zn-950 (Deep dark, barely distinct from black)
        text: '#f4f4f5', // Zn-100
        secondaryText: '#a1a1aa', // Zn-400
        border: '#27272a', // Zn-800
        panelBg: '#18181b', // Zn-900
        panelBorder: '#27272a', // Zn-800
        accent: '#fafafa', // White accent
        accentText: '#000000',
        hover: '#27272a',
    }
};

export type ThemeMode = 'light' | 'dark';

export const getTheme = (mode: ThemeMode) => theme[mode];
