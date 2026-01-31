import { Palette } from '../../core/colors';
import { getSeededRandom } from '../utils';

export function generateRetro(hash: number, palette: Palette): string {
    const size = 5; // 5x5 grid
    const cellSize = 80 / size; // Viewbox is 80x80
    const color = palette.colors[palette.colors.length - 1]; // Use a strong color

    let rects = '';

    // Fill background with light color
    rects += `<rect width="100%" height="100%" fill="${palette.background}" />`;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < Math.ceil(size / 2); col++) {
            // Deterministic check if cell is active
            // Using bits from hash or pseudo random
            // seed logic: hash + position
            const isFilled = getSeededRandom(hash + row * size + col) > 0.5;

            if (isFilled) {
                // Draw left side
                rects += `<rect x="${col * cellSize}" y="${row * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;

                // Mirror to right side if not center column or if size is even (not here)
                if (col < Math.floor(size / 2)) {
                    const mirrorCol = size - 1 - col;
                    rects += `<rect x="${mirrorCol * cellSize}" y="${row * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
                }
            }
        }
    }

    return rects;
}
