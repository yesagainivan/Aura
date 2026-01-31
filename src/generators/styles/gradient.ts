import { Palette } from '../../core/colors';
import { getSeededRandom } from '../utils';

export function generateGradient(hash: number, palette: Palette): string {
  // Deterministic choices
  const isLinear = getSeededRandom(hash) > 0.4; // 60% Linear, 40% Radial
  const angle = Math.floor(getSeededRandom(hash + 1) * 360);

  // Pick 3 colors deterministically, wrapping around if needed
  const c1 = palette.colors[hash % palette.colors.length];
  const c2 = palette.colors[(hash + 1) % palette.colors.length];
  const c3 = palette.colors[(hash + 2) % palette.colors.length];

  const id = `grad-${hash}`;
  let gradientDef = '';

  if (isLinear) {
    // Calculate simple coords based on angle (approximate)
    // For a cleaner look, we can just use set directions or keep it simple
    const rad = (angle * Math.PI) / 180;
    const x1 = 50 + 50 * Math.cos(rad + Math.PI);
    const y1 = 50 + 50 * Math.sin(rad + Math.PI);
    const x2 = 50 + 50 * Math.cos(rad);
    const y2 = 50 + 50 * Math.sin(rad);

    gradientDef = `
      <linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="50%" stop-color="${c2}" />
        <stop offset="100%" stop-color="${c3}" />
      </linearGradient>
    `;
  } else {
    // Radial with offset focal point for "organic" feel
    // Randomize focal point slightly
    const fx = 30 + Math.floor(getSeededRandom(hash + 2) * 40); // 30-70%
    const fy = 30 + Math.floor(getSeededRandom(hash + 3) * 40); // 30-70%

    gradientDef = `
      <radialGradient id="${id}" cx="50%" cy="50%" r="75%" fx="${fx}%" fy="${fy}%">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="60%" stop-color="${c2}" />
        <stop offset="100%" stop-color="${c3}" />
      </radialGradient>
    `;
  }

  // Adding a subtle noise/texture overlay could be nice, but keeping it clean for v1 as planned.

  return `
    <defs>${gradientDef}</defs>
    <rect width="100%" height="100%" fill="url(#${id})" />
  `;
}
