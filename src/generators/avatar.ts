import { getHash } from '../core/hash';
import { generatePalette } from '../core/colors';
import { generateGeometric } from './styles/geometric';
import { generateGradient } from './styles/gradient';
import { generateRetro } from './styles/retro';
import { generateBrutalist } from './styles/brutalist';
import { generateElegance } from './styles/elegance';
import { AvatarOptions } from './types';
import { createSvg } from './utils';

/**
 * Generates an SVG avatar from a username or any string.
 */
export function generateAvatar(input: string, options: AvatarOptions = {}): string {
    const hash = getHash(input);
    const palette = options.palette || generatePalette(hash, {
        colorMode: options.colorMode,
        primaryHex: options.primaryColor
    });
    const size = options.size || 80;
    const variant = options.variant || 'geometric';

    let svgContent = '';
    // ViewBox must match the size used for generation to ensure shapes are visible
    const viewBox = `0 0 ${size} ${size}`;

    switch (variant) {
        case 'gradient':
            svgContent = generateGradient(hash, palette);
            break;
        case 'retro':
            svgContent = generateRetro(hash, palette, size);
            break;
        case 'geometric':
            svgContent = generateGeometric(hash, palette, size);
            break;
        case 'brutalist':
            svgContent = generateBrutalist(hash, palette, size);
            break;
        case 'elegance':
            svgContent = generateElegance(hash, palette, size, options.detail);
            break;
        default:
            svgContent = generateGeometric(hash, palette, size);
            break;
    }

    return createSvg(svgContent, size, viewBox);
}
