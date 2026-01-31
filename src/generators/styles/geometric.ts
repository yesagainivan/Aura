import { Palette } from '../../core/colors';
import { getSeededRandom } from '../utils';



export function generateGeometric(hash: number, palette: Palette, size: number): string {
    // Bauhaus Composition Generator
    // Concept: A grid-based layout with large anchor shapes and smaller balance shapes.
    // Asymmetry is key.

    const content = [];

    // 1. Define Grid
    // 2x2 or 3x3 grid for bold simple forms
    const gridSize = (hash % 2) === 0 ? 2 : 3;
    const cellSize = size / gridSize;

    // Background Fill (Canvas)
    content.push(`<rect width="${size}" height="${size}" fill="${palette.background}" />`);

    // 2. Select Colors
    // We use Primary, Secondary, Accent, and Text (for high contrast elements)
    const colors = [palette.primary, palette.secondary, palette.accent, palette.text];

    // 3. Populate Grid
    // We iterate through cells, but with a chance to "skip" or "merge" to create negative space/asymmetry

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const seed = hash + row * 10 + col;
            const isFilled = getSeededRandom(seed) > 0.3; // 70% fill rate for minimalism

            if (!isFilled) continue;

            const x = col * cellSize;
            const y = row * cellSize;

            const typeSeed = getSeededRandom(seed + 1);
            const colorSeed = Math.floor(getSeededRandom(seed + 2) * colors.length);
            const color = colors[colorSeed]; // Use all semantic colors including dark text for contrast

            // Determine Shape
            let shapeHtml = '';

            // Bauhaus primitive distribution
            if (typeSeed < 0.4) {
                // Circle / Quarter Circle
                const isFull = getSeededRandom(seed + 3) > 0.5;
                if (isFull) {
                    shapeHtml = `<circle cx="${x + cellSize / 2}" cy="${y + cellSize / 2}" r="${cellSize / 2}" fill="${color}" />`;
                } else {
                    // Quarter Circle (Arc)
                    // Random rotation via transform or path definition
                    const corner = Math.floor(getSeededRandom(seed + 4) * 4); // 0,1,2,3
                    // 0: top-left, 1: top-right, ...
                    // Simplify: Always draw top-left arc at (x,y) and rotate group

                    // Path for Top-Left Quarter Circle fitting in cell


                    // Actually, standard Bauhaus arc is usually a stroke or a solid wedge.
                    // Let's do a simple circle clipped or a path.
                    // Path: Move to corner, Line to radius points, Arc between them.
                    // Clean quarter circle path (in top-left):
                    // M 0 0 L 100 0 A 100 100 0 0 1 0 100 Z

                    const r2 = cellSize;
                    // We need to handle rotation. Simplest is to rotate around center of cell.

                    const rotation = corner * 90;

                    // Path relative to cell origin 0,0
                    const d = `M 0 0 L ${r2} 0 A ${r2} ${r2} 0 0 1 0 ${r2} Z`;

                    shapeHtml = `
             <g transform="translate(${x}, ${y}) rotate(${rotation} ${cellSize / 2} ${cellSize / 2})">
               <path d="${d}" fill="${color}" />
             </g>
           `;
                }
            } else if (typeSeed < 0.8) {
                // Rectangle / Square
                // Sometimes full cell, sometimes smaller
                const isSmall = getSeededRandom(seed + 5) > 0.7;
                if (isSmall) {
                    const inset = cellSize * 0.2;
                    shapeHtml = `<rect x="${x + inset}" y="${y + inset}" width="${cellSize - inset * 2}" height="${cellSize - inset * 2}" fill="${color}" />`;
                } else {
                    shapeHtml = `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
                }
            } else {
                // Triangle
                const rotation = Math.floor(getSeededRandom(seed + 6) * 4) * 90;


                // Right-triangle filling half the cell
                const d = `M 0 0 L ${cellSize} 0 L 0 ${cellSize} Z`;

                shapeHtml = `
             <g transform="translate(${x}, ${y}) rotate(${rotation} ${cellSize / 2} ${cellSize / 2})">
               <path d="${d}" fill="${color}" />
             </g>
           `;
            }

            content.push(shapeHtml);
        }
    }

    // 4. "Eye": Add one focal point element on top (maybe a smaller circle or distinct color)
    // This adds that "poster" feel
    const eyeX = (Math.floor(getSeededRandom(hash + 99) * gridSize) * cellSize) + cellSize / 2;
    const eyeY = (Math.floor(getSeededRandom(hash + 100) * gridSize) * cellSize) + cellSize / 2;
    const eyeSize = cellSize * 0.25;
    const eyeColor = palette.background; // Negative space or distinct?
    if (getSeededRandom(hash + 101) > 0.5) {
        content.push(`<circle cx="${eyeX}" cy="${eyeY}" r="${eyeSize}" fill="${eyeColor}" />`);
    }

    return content.join('\n');
}
