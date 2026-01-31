import { getHash } from '../core/hash';
import { getPalette } from '../core/colors';
import { generateGeometric } from './styles/geometric';
import { generateGradient } from './styles/gradient';
import { generateRetro } from './styles/retro';
import { AvatarOptions } from './types';
import { createSvg } from './utils';

/**
 * Generates an SVG avatar from a username or any string.
 */
export function generateAvatar(input: string, options: AvatarOptions = {}): string {
    const hash = getHash(input);
    const palette = options.palette || getPalette(hash);

    const variant = options.variant || 'geometric';

    let svgContent = '';
    // ViewBox is fixed to 80x80 for all generators
    const viewBox = '0 0 80 80';

    switch (variant) {
        case 'gradient':
            svgContent = generateGradient(hash, palette);
            break;
        case 'retro':
            svgContent = generateRetro(hash, palette);
            break;
        case 'geometric':
        default:
            // For geometric, we might want a background color too
            svgContent = `<rect width="100%" height="100%" fill="${palette.background}" />` +
                generateGeometric(hash, palette);
            break;
    }

    return createSvg(svgContent, options.size || 80, viewBox);
}
