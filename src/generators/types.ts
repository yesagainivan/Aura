import { Palette } from '../core/colors';

export type AvatarStyle = 'geometric' | 'gradient' | 'retro' | 'brutalist';

export interface AvatarOptions {
    size?: number;
    variant?: AvatarStyle;
    // If provided, overrides the deterministic palette selection
    palette?: Palette;
    // User preferences
    colorMode?: 'light' | 'dark';
    primaryColor?: string; // Hex code
}

export interface GeneratorResult {
    svg: string; // The full SVG string
    attributes: {
        viewBox: string;
        width: string;
        height: string;
    };
    body: string; // Inner SVG content (for reusing in other contexts)
}
