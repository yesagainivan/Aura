import { Palette } from '../../core/colors';
import { getSeededRandom } from '../utils';

export function generateGradient(hash: number, palette: Palette): string {
  // V3: Semantic Gradient Generation
  // Uses the harmonious Primary/Secondary/Accent/Bg slots from the HSL system.

  const id = `grad-${hash}`;

  // Slot mapping for maximum depth:
  // Base: Primary (strongest)
  // Layer 1 (Big): Secondary (harmonious shift)
  // Layer 2 (Medium): Background (lightness injection for contrast)
  // Layer 3 (Small): Accent (pop)

  const c1 = palette.primary;
  const c2 = palette.secondary;
  const c3 = palette.background;
  const c4 = palette.accent;

  // Layer 1: Base background (Primary)
  const x1 = Math.floor(getSeededRandom(hash) * 20);
  const y1 = Math.floor(getSeededRandom(hash + 1) * 20);

  // Layer 2: Secondary (The wash)
  const x2 = 50 + Math.floor(getSeededRandom(hash + 2) * 40);
  const y2 = 50 + Math.floor(getSeededRandom(hash + 3) * 40);

  // Layer 3: Accent (The spark)
  const x3 = Math.floor(getSeededRandom(hash + 4) * 90);
  const y3 = Math.floor(getSeededRandom(hash + 5) * 90);

  // Unique IDs
  const g1 = `${id}-1`;
  const g2 = `${id}-2`;
  const g3 = `${id}-3`;

  return `
    <defs>
      <radialGradient id="${g1}" cx="${x1}%" cy="${y1}%" r="100%" fx="${x1}%" fy="${y1}%">
        <stop offset="0%" stop-color="${c2}" />
        <stop offset="100%" stop-color="${c2}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${g2}" cx="${x2}%" cy="${y2}%" r="80%" fx="${x2}%" fy="${y2}%">
        <stop offset="0%" stop-color="${c3}" />
        <stop offset="100%" stop-color="${c1}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${g3}" cx="${x3}%" cy="${y3}%" r="50%" fx="${x3}%" fy="${y3}%">
        <stop offset="0%" stop-color="${c4}" />
        <stop offset="100%" stop-color="${c4}" stop-opacity="0" />
      </radialGradient>
    </defs>
    
    <!-- Base Fill: Primary -->
    <rect width="100%" height="100%" fill="${c1}" />
    
    <!-- Overlays -->
    <rect width="100%" height="100%" fill="url(#${g1})" style="mix-blend-mode: hard-light;" opacity="0.8" />
    <rect width="100%" height="100%" fill="url(#${g2})" style="mix-blend-mode: overlay;" opacity="0.5" />
    <rect width="100%" height="100%" fill="url(#${g3})" style="mix-blend-mode: normal;" opacity="0.8" />
  `;
}
