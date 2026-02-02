import { Palette } from '../../core/colors';
import { getSeededRandom } from '../utils';

export function generateBrutalist(hash: number, palette: Palette, size: number): string {
    // Neo-Brutalism Generator
    // Characteristics:
    // - High contrast
    // - Thick black (or dark) borders
    // - Hard, solid shadows
    // - Raw geometric primitives overlapping
    // - "Glitch" or pattern elements

    // Config
    const strokeWidth = Math.max(2, size / 40); // Scaling thick stroke
    const shadowOffset = strokeWidth * 2;
    const strokeColor = palette.text; // Usually dark/black

    let content = '';

    // 1. Background
    content += `<rect width="${size}" height="${size}" fill="${palette.background}" />`;

    // 2. Optional Pattern (Stripes or Grid)
    if (getSeededRandom(hash) > 0.5) {
        // Stripe pattern definition
        const patternId = `stripe-${hash}`;
        // Create a pattern def
        content += `
        <defs>
            <pattern id="${patternId}" width="${strokeWidth * 4}" height="${strokeWidth * 4}" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="${strokeWidth * 4}" stroke="${palette.text}" stroke-width="${strokeWidth / 2}" opacity="0.1" />
            </pattern>
        </defs>
        <rect width="${size}" height="${size}" fill="url(#${patternId})" />
        `;
    }

    // 3. Main Shapes (1-3 shapes, less clustered)
    const numShapes = 1 + Math.floor(getSeededRandom(hash + 1) * 2.5);
    const colors = [palette.primary, palette.secondary, palette.accent];

    for (let i = 0; i < numShapes; i++) {
        const seed = hash + i * 50;
        const color = colors[Math.floor(getSeededRandom(seed) * colors.length)];
        const shapeType = getSeededRandom(seed + 1); // <0.3 rect, <0.6 circle, <1 star/poly

        // Random Position & Size
        const s = size * (0.2 + getSeededRandom(seed + 2) * 0.3); // 20-50% size (smaller to avoid crowd)
        const x = getSeededRandom(seed + 3) * (size - s);
        const y = getSeededRandom(seed + 4) * (size - s);



        // Draw Shadow first (offset)
        const drawShape = (ox: number, oy: number, fill: string, stroke: string = 'none') => {
            if (shapeType < 0.4) {
                // Rect
                return `<rect x="${x + ox}" y="${y + oy}" width="${s}" height="${s}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
            } else if (shapeType < 0.7) {
                // Circle
                return `<circle cx="${x + s / 2 + ox}" cy="${y + s / 2 + oy}" r="${s / 2}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
            } else {
                // Ugly Polygon/Triangle (Brutalist style)
                const p1 = `${x + ox},${y + s + oy}`;
                const p2 = `${x + s / 2 + ox},${y + oy}`;
                const p3 = `${x + s + ox},${y + s + oy}`;
                return `<polygon points="${p1} ${p2} ${p3}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
            }
        };

        // Solid Shadow
        content += drawShape(shadowOffset, shadowOffset, strokeColor, 'none');
        // Main Shape
        content += drawShape(0, 0, color, strokeColor);
    }

    // 4. Glitch / Noise elements (Small erratic strokes)
    const numGlitches = Math.floor(getSeededRandom(hash + 99) * 3);
    for (let j = 0; j < numGlitches; j++) {
        const gx = getSeededRandom(hash + 100 + j) * size;
        const gy = getSeededRandom(hash + 200 + j) * size;
        const gw = size * 0.2;
        const gh = strokeWidth * 2;
        content += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="${strokeColor}" />`;
    }

    return content;
}
