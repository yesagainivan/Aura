import { Palette } from '../../core/colors';
import { getSeededRandom } from '../utils';

export function generateRetro(hash: number, palette: Palette, size: number): string {
    // 5x5 Grid (GitHub Identicon style)
    // Mirror vertically
    const gridSize = 5;
    const cellSize = size / gridSize;

    // Use Primary for the pattern, on the generated Background
    const color = palette.primary;
    const bg = palette.background;

    let rects = '';

    // Draw background
    rects += `<rect width="${size}" height="${size}" fill="${bg}" />`;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < Math.ceil(gridSize / 2); col++) {
            // Deterministic ON/OFF
            const isFilled = getSeededRandom(hash + row * gridSize + col) > 0.5;

            if (isFilled) {
                // Left side
                rects += `<rect x="${col * cellSize}" y="${row * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;

                // Mirror right side
                if (col < Math.floor(gridSize / 2)) {
                    const mirrorCol = gridSize - 1 - col;
                    rects += `<rect x="${mirrorCol * cellSize}" y="${row * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
                }
            }
        }
    }

    return rects;
}
