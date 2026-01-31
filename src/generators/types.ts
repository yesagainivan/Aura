import { Palette } from '../core/colors';

export type AvatarStyle = 'geometric' | 'gradient' | 'retro';

export interface AvatarOptions {
    size?: number;
    variant?: AvatarStyle;
    // If provided, overrides the deterministic palette selection
    palette?: Palette;
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
