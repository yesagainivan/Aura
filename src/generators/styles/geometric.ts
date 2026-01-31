import { Palette } from '../../core/colors';
import { getShapeType } from '../../core/geometry';
import { getSeededRandom } from '../utils';

export function generateGeometric(hash: number, palette: Palette, size: number): string {
    // Use semantic colors instead of random array access
    // We have: primary, secondary, accent, text, background
    const colors = [palette.primary, palette.secondary, palette.accent];

    let content = '';
    // Background fill
    content += `<rect width="${size}" height="${size}" fill="${palette.background}" />`;

    const numShapes = 3 + Math.floor(getSeededRandom(hash) * 3); // 3-5 shapes

    for (let i = 0; i < numShapes; i++) {
        const shapeHash = hash + i * 123;
        const shapeType = getShapeType(shapeHash);

        // Pick color from our semantic trio
        const colorIndex = Math.floor(getSeededRandom(shapeHash + 1) * colors.length);
        const color = colors[colorIndex];

        const x = getSeededRandom(shapeHash + 2) * size;
        const y = getSeededRandom(shapeHash + 3) * size;
        const shapeSize = 10 + getSeededRandom(shapeHash + 4) * (size / 2); // 10 to half-size
        const opacity = 0.5 + getSeededRandom(shapeHash + 5) * 0.5; // 0.5 - 1.0

        switch (shapeType) {
            case 'circle':
                content += `<circle cx="${x}" cy="${y}" r="${shapeSize / 2}" fill="${color}" opacity="${opacity}" />`;
                break;
            case 'square':
                content += `<rect x="${x - shapeSize / 2}" y="${y - shapeSize / 2}" width="${shapeSize}" height="${shapeSize}" fill="${color}" opacity="${opacity}" rx="${shapeSize / 4}" />`; // Soft squares
                break;
            case 'triangle':
                // Simple triangle
                const h = shapeSize * (Math.sqrt(3) / 2);
                const p1 = `${x},${y - h / 2}`;
                const p2 = `${x - shapeSize / 2},${y + h / 2}`;
                const p3 = `${x + shapeSize / 2},${y + h / 2}`;
                content += `<polygon points="${p1} ${p2} ${p3}" fill="${color}" opacity="${opacity}" />`;
                break;
            case 'ring':
                content += `
          <circle cx="${x}" cy="${y}" r="${shapeSize / 2}" stroke="${color}" stroke-width="${shapeSize / 5}" fill="none" opacity="${opacity}" />
        `;
                break;
        }
    }

    return content;
}
