import { Palette } from '../../core/colors';
import { getShapeType, pseudoRandom } from '../../core/geometry';
import { getSeededRandom } from '../utils';

export function generateGeometric(hash: number, palette: Palette): string {
    let content = '';
    // Deterministic number of shapes (3 to 6)
    const numShapes = 3 + Math.floor(getSeededRandom(hash) * 4);

    for (let i = 0; i < numShapes; i++) {
        // Re-hash for each shape to get different properties
        const shapeHash = (hash + i * 123456) | 0;
        const shapeType = getShapeType(shapeHash);

        // Pick a color from palette
        const colorIndex = Math.floor(getSeededRandom(shapeHash) * palette.colors.length);
        const color = palette.colors[colorIndex];

        // Position and size (viewbox is 0-80)
        const x = pseudoRandom(shapeHash, 0, 80);
        const y = pseudoRandom(shapeHash + 1, 0, 80);
        const size = pseudoRandom(shapeHash + 2, 10, 40);

        // Opacity for layering effect
        const opacity = 0.5 + pseudoRandom(shapeHash + 3, 0, 0.5);

        switch (shapeType) {
            case 'circle':
                content += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${color}" opacity="${opacity}" />`;
                break;
            case 'square':
                content += `<rect x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" fill="${color}" opacity="${opacity}" rx="${size / 4}" />`;
                break;
            case 'triangle': {
                const half = size / 2;
                // Simple distinct triangle
                const points = `${x},${y - half} ${x - half},${y + half} ${x + half},${y + half}`;
                content += `<polygon points="${points}" fill="${color}" opacity="${opacity}" />`;
                break;
            }
            case 'ring':
                content += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="none" stroke="${color}" stroke-width="${size / 6}" opacity="${opacity}" />`;
                break;
        }
    }

    return content;
}
