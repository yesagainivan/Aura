/**
 * Helper to construct an SVG string.
 */
export function createSvg(
    content: string,
    size: number = 80,
    viewBox: string = '0 0 80 80',
    backgroundColor?: string
): string {
    const bg = backgroundColor
        ? `<rect width="100%" height="100%" fill="${backgroundColor}" />`
        : '';

    return `
<svg 
  viewBox="${viewBox}" 
  width="${size}" 
  height="${size}" 
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid meet"
>
  ${bg}
  ${content}
</svg>
`.trim();
}

/**
 * Deterministically pick a seeded random value.
 */
export function getSeededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}
