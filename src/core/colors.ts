export interface Palette {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    isDark: boolean;
}

export interface PaletteOverrides {
    colorMode?: 'light' | 'dark';
    primaryHex?: string;
}

// Convert Hex to HSL
function hexToHsl(hex: string): { h: number, s: number, l: number } {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt("0x" + hex[1] + hex[1]);
        g = parseInt("0x" + hex[2] + hex[2]);
        b = parseInt("0x" + hex[3] + hex[3]);
    } else if (hex.length === 7) {
        r = parseInt("0x" + hex[1] + hex[2]);
        g = parseInt("0x" + hex[3] + hex[4]);
        b = parseInt("0x" + hex[5] + hex[6]);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin;
    let h = 0,
        s = 0,
        l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

// Convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

export function generatePalette(hash: number, overrides?: PaletteOverrides): Palette {
    // 1. Base Hue
    let hue = hash % 360;

    // Override: If primaryHex is provided, use its hue as the base
    if (overrides?.primaryHex) {
        const hsl = hexToHsl(overrides.primaryHex);
        hue = hsl.h;
    }

    // 2. Determine "Mode" (Light vs Dark)
    let isDark = (hash % 4) === 0; // Default 25% chance

    // Override: Force mode
    if (overrides?.colorMode) {
        isDark = overrides.colorMode === 'dark';
    }

    // 3. Harmony (Strict Analogous)
    const secondaryHue = (hue + 30) % 360;
    const accentHue = (hue - 30 + 360) % 360;

    let bg, text, primary, secondary, accent;

    if (isDark) {
        // Dark Mode Palette
        bg = hslToHex(hue, 40, 8);
        text = hslToHex(hue, 20, 95);
        primary = hslToHex(hue, 80, 65);
        secondary = hslToHex(secondaryHue, 70, 40);
        accent = hslToHex(accentHue, 90, 70);
    } else {
        // Light Mode Palette
        bg = hslToHex(hue, 25, 97);
        text = hslToHex(hue, 40, 12);
        primary = hslToHex(hue, 85, 60);
        secondary = hslToHex(secondaryHue, 80, 65);
        accent = hslToHex(accentHue, 90, 55);
    }

    return {
        background: bg,
        text: text,
        primary: primary,
        secondary: secondary,
        accent: accent,
        isDark: isDark
    };
}
