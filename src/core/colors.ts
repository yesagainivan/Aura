export interface Palette {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    isDark: boolean; // Flag to help UI adapters if needed
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

export function generatePalette(hash: number): Palette {
    // 1. Base Hue
    const hue = hash % 360;

    // 2. Determine "Mode" (Light vs Dark)
    // 25% chance of a Dark Mode palette for variety and "premium" feel
    const isDark = (hash % 4) === 0;

    // 3. Harmony (Strict Analogous)
    const secondaryHue = (hue + 30) % 360;
    const accentHue = (hue - 30 + 360) % 360;

    let bg, text, primary, secondary, accent;

    if (isDark) {
        // Dark Mode Palette
        // Background: Rich, deep dark (almost black)
        bg = hslToHex(hue, 40, 8);

        // Text: Very light (off-white)
        text = hslToHex(hue, 20, 95);

        // Primary: Bright, neon-like for contrast against dark
        primary = hslToHex(hue, 80, 65);

        // Secondary: Deep but visible
        secondary = hslToHex(secondaryHue, 70, 40);

        // Accent: Very bright pop
        accent = hslToHex(accentHue, 90, 70);
    } else {
        // Light Mode Palette
        // Background: Pastel tint
        bg = hslToHex(hue, 25, 97);

        // Text: Deep dark
        text = hslToHex(hue, 40, 12);

        // Primary: Standard vibrant
        primary = hslToHex(hue, 85, 60);

        // Secondary: Slightly lighter
        secondary = hslToHex(secondaryHue, 80, 65);

        // Accent: Punchy
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
