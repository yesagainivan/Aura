import { Palette } from '../../core/colors';
import { getSeededRandom } from '../utils';

export function generateGradient(hash: number, palette: Palette): string {
    const isLinear = getSeededRandom(hash) > 0.5;

    const c1 = palette.colors[0];
    const c2 = palette.colors[1] || c1;
    const c3 = palette.colors[2] || c2; // Optional third stop

    const id = `grad-${hash}`;

    let gradientDef = '';

    if (isLinear) {
        // Simple diagonal gradient
        gradientDef = `
      <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="50%" stop-color="${c2}" />
        <stop offset="100%" stop-color="${c3}" />
      </linearGradient>
    `;
    } else {
        gradientDef = `
      <radialGradient id="${id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="100%" stop-color="${c2}" />
      </radialGradient>
    `;
    }

    return `
    <defs>${gradientDef}</defs>
    <rect width="100%" height="100%" fill="url(#${id})" />
  `;
}
