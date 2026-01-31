export interface Palette {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
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
    // 1. Base Hue: 0-360
    const hue = hash % 360;

    // 2. Harmony Strategy: STRICTLY ANALOGOUS per user request.
    // Analogous colors are adjacent on the wheel.
    // This creates a smooth, harmonious blend without jarring contrasts.

    const secondaryHue = (hue + 30) % 360; // 30 degrees offset
    const accentHue = (hue - 30 + 360) % 360; // -30 degrees offset (other side)

    // 3. Generate Semantic Colors

    // Background: Pastel tint of the base hue
    const bg = hslToHex(hue, 25, 97);

    // Text: Deep, almost black version of base hue
    const text = hslToHex(hue, 40, 12);

    // Primary: The main anchor
    const primary = hslToHex(hue, 85, 60);

    // Secondary: Neighboring hue, slightly diff lightness for depth
    const secondary = hslToHex(secondaryHue, 80, 65);

    // Accent: The other neighbor, slightly more punchy
    const accent = hslToHex(accentHue, 90, 55);

    return {
        background: bg,
        text: text,
        primary: primary,
        secondary: secondary,
        accent: accent
    };
}
