import { Palette } from '../../core/colors';
import { getSeededRandom } from '../utils'; // Ensure this is imported
import { ELEGANT_PATHS_EXT } from './elegant_paths';

// Extracted paths from the Elegance.svg reference.
// These are normalized to a roughly 0-100 coordinate system relative to their own center for easier composition.
const ELEGANT_PATHS = [
    // 1. Fleur-de-lis / Royal ornament style
    {
        d: "M50 85 C48 85 46.5 84.5 45.5 83.5 C41 79 46 67 56 57 C66 47 78 42 82 46 C84 48 84 52 82 57 C80 62 76 67 71 72 M78 45 C73 45 64 50 56 57 C46 67 41 79 45 83 C49 87 60 82 70 72 C75 67 79 62 81 57 C83 52 83 48 81 46 C79 44 78 45 78 45 Z",
        viewBox: "0 0 100 100",
        type: "ornament"
    },
    // 2. Wing/Leaf shape
    {
        d: "M80 50 C78 50 76 50 74 50 C63 49 49 47 34 44 C7 38 -20 28 -21 22 C-20 19 -12 18 -5 18 C-5 18 -5 18 -5 18 C-18 18 -20 20 -20 21 C-21 25 0 35 33 42 C47 45 61 47 72 48 C82 49 88 48 89 46 C89 44 86 41 79 38",
        viewBox: "-25 0 120 60", // Rough approximation
        type: "wing"
    },
    // 3. Swirl
    {
        d: "M50 50 C40 50 30 40 30 30 C30 20 40 10 50 10 C60 10 70 20 70 30 C70 40 60 50 50 50 Z M50 20 C45 20 40 25 40 30 C40 35 45 40 50 40 C55 40 60 35 60 30 C60 25 55 20 50 20 Z",
        viewBox: "0 0 100 100",
        type: "swirl"
    },
    // 4. StarFlower (Extracted from reference, low-coordinate)
    {
        d: "M47.387,47.36c2.975-1.919,7.728-2.523,15.645-3.176c-7.916-0.653-12.67-1.258-15.645-3.176c1.059-2.375,3.246-5.122,6.566-9.039c-3.917,3.32-6.664,5.507-9.039,6.566c-1.919-2.975-2.523-7.728-3.176-15.645c-0.653,7.916-1.258,12.67-3.176,15.645c-2.375-1.059-5.122-3.246-9.039-6.566c3.32,3.917,5.506,6.664,6.566,9.039c-2.975,1.919-7.728,2.523-15.645,3.176c7.916,0.653,12.67,1.258,15.645,3.176c-1.059,2.375-3.246,5.122-6.566,9.039c3.917-3.32,6.664-5.507,9.039-6.566c1.919,2.975,2.523,7.728,3.176,15.645c0.653-7.916,1.258-12.67,3.176-15.645c2.375,1.059,5.122,3.246,9.039,6.566C50.633,52.482,48.446,49.735,47.387,47.36z",
        viewBox: "0 0 100 100",
        type: "star"
    },
    // 5. Royal Lotus
    {
        d: "M50 20 C 60 20 70 40 80 45 C 90 50 80 60 70 70 C 60 80 50 90 50 90 C 50 90 40 80 30 70 C 20 60 10 50 20 45 C 30 40 40 20 50 20 Z",
        viewBox: "0 0 100 100",
        type: "lotus"
    },
    ...ELEGANT_PATHS_EXT
];

/**
 * Dispatcher function for Elegance style.
 * Defaults to 'detailed' mode.
 */
export function generateElegance(hash: number, palette: Palette, size: number, detail: 'basic' | 'detailed' = 'detailed'): string {
    if (detail === 'basic') {
        return generateEleganceBasic(hash, palette, size);
    }
    return generateEleganceDetailed(hash, palette, size);
}

/**
 * Original "Basic" implementation.
 * Simple Radial Bloom or Emblem logic.
 */
function generateEleganceBasic(hash: number, palette: Palette, size: number): string {
    // Strategy:
    // 1. Determine Composition (Radial Bloom, Emblem, or Pattern)
    // 2. Select Elements (Procedural or Extracted Assets)
    // 3. Render with high-quality transforms

    const center = size / 2;
    const strokeWidth = Math.max(1, size / 120);
    const compositionType = getSeededRandom(hash) > 0.4 ? 'radial' : 'emblem';

    let content = '';

    // -- Background --
    content += `<rect width="${size}" height="${size}" fill="${palette.background}" />`;

    // -- Layer 1: Texture/Subtle Pattern (Implementation Quality: Delight) --
    // A very subtle ring or cross
    // A very subtle ring, cross, or lattice
    const texType = getSeededRandom(hash + 1);
    if (texType > 0.7) {
        content += `<circle cx="${center}" cy="${center}" r="${size * 0.4}" fill="none" stroke="${palette.text}" stroke-width="${strokeWidth * 0.5}" opacity="0.1" />`;
    } else if (texType > 0.4) {
        // Lattice / Grid
        const step = size / 8;
        let lattice = '';
        for (let i = 1; i < 8; i++) {
            lattice += `<line x1="${i * step}" y1="0" x2="${i * step}" y2="${size}" stroke="${palette.text}" stroke-width="${strokeWidth * 0.2}" opacity="0.05" />`;
            lattice += `<line x1="0" y1="${i * step}" x2="${size}" y2="${i * step}" stroke="${palette.text}" stroke-width="${strokeWidth * 0.2}" opacity="0.05" />`;
        }
        content += lattice;
    }

    // -- Layer 2: Main Motif --

    if (compositionType === 'radial') {
        // RADIAL BLOOM (Procedural or Asset-based)
        const petals = 6 + Math.floor(getSeededRandom(hash + 2) * 3) * 2; // 6, 8, 10
        const radius = size * 0.35;

        // Procedural Petal Path
        const tipY = -radius;
        const cpW = radius * (0.2 + getSeededRandom(hash + 3) * 0.3);
        const cpH = radius * (0.3 + getSeededRandom(hash + 4) * 0.3);

        // Variation: Round vs Sharp petals
        const isSharp = getSeededRandom(hash + 9) > 0.5;
        let d = '';
        if (isSharp) {
            d = `M 0 0 Q ${cpW} ${-cpH} 0 ${tipY} Q ${-cpW} ${-cpH} 0 0`;
        } else {
            d = `M 0 0 C ${cpW} ${-cpH}, ${cpW} ${tipY + cpH}, 0 ${tipY} C ${-cpW} ${tipY + cpH}, ${-cpW} ${-cpH}, 0 0`;
        }

        const groupContent = [];
        const useFill = getSeededRandom(hash + 5) > 0.3;

        for (let i = 0; i < petals; i++) {
            const angle = (360 / petals) * i;
            const color = (i % 2 === 0) ? palette.primary : palette.accent;

            groupContent.push(`
                <g transform="rotate(${angle})">
                    <path d="${d}" fill="${useFill ? color : 'none'}" fill-opacity="0.2" stroke="${color}" stroke-width="${strokeWidth}" />
                </g>
            `);
        }

        // Center Piece
        groupContent.push(`<circle cx="0" cy="0" r="${size * 0.05}" fill="${palette.secondary}" />`);

        content += `<g transform="translate(${center}, ${center})">${groupContent.join('')}</g>`;

    } else {
        // EMBLEM (Asset-based)
        // Use one of the predefined shapes
        const shapeIdx = Math.floor(getSeededRandom(hash + 6) * ELEGANT_PATHS.length);
        const shape = ELEGANT_PATHS[shapeIdx];

        // We typically want to mirror these or arrange them
        // Let's create a symmetrical emblem: 4 copies rotated 90deg, or 2 mirrored
        const symmetry = getSeededRandom(hash + 7) > 0.5 ? 4 : 2;
        const scale = (size * 0.25) / 50; // Normalize approx 100px shape to quarter size
        const offset = size * 0.1;

        const groupContent = [];

        for (let k = 0; k < symmetry; k++) {
            const angle = (360 / symmetry) * k;
            groupContent.push(`
                <g transform="rotate(${angle}) translate(0, ${-offset}) scale(${scale})">
                    <path d="${shape.d}" fill="${palette.primary}" fill-opacity="0.9" stroke="${palette.text}" stroke-width="1" />
                </g>
            `);
        }

        // Add a central anchor
        if (symmetry === 4) {
            groupContent.push(`<circle cx="0" cy="0" r="${size * 0.08}" fill="none" stroke="${palette.accent}" stroke-width="${strokeWidth * 2}" />`);
        }

        content += `<g transform="translate(${center}, ${center})">${groupContent.join('')}</g>`;
    }

    // -- Layer 3: Frame / Border (Polished look) --
    const frameType = Math.floor(getSeededRandom(hash + 8) * 3);
    if (frameType === 0) {
        // Double Ring
        content += `
            <circle cx="${center}" cy="${center}" r="${size * 0.48}" fill="none" stroke="${palette.text}" stroke-width="${strokeWidth}" opacity="0.5" />
            <circle cx="${center}" cy="${center}" r="${size * 0.46}" fill="none" stroke="${palette.text}" stroke-width="${strokeWidth * 0.5}" opacity="0.3" />
        `;
    } else if (frameType === 1) {
        // Corner accents
        const cLen = size * 0.1;
        const cInset = size * 0.05;
        const corners = [
            `M ${cInset} ${cInset + cLen} L ${cInset} ${cInset} L ${cInset + cLen} ${cInset}`, // TL
            `M ${size - cInset - cLen} ${cInset} L ${size - cInset} ${cInset} L ${size - cInset} ${cInset + cLen}`, // TR
            `M ${size - cInset} ${size - cInset - cLen} L ${size - cInset} ${size - cInset} L ${size - cInset - cLen} ${size - cInset}`, // BR
            `M ${cInset + cLen} ${size - cInset} L ${cInset} ${size - cInset} L ${cInset} ${size - cInset - cLen}` // BL
        ];
        content += corners.map(d => `<path d="${d}" fill="none" stroke="${palette.secondary}" stroke-width="${strokeWidth * 1.5}" />`).join('');
    }

    return content;
}

/**
 * Detailed / Intricate implementation.
 * Supports Emblem, Mandala, and Radial Bloom with complex compositions.
 */
function generateEleganceDetailed(hash: number, palette: Palette, size: number): string {
    const center = size / 2;
    const strokeWidth = Math.max(1, size / 150);

    // Seeded random helpers
    let rngState = hash;
    const random = () => {
        const x = Math.sin(rngState++) * 10000;
        return x - Math.floor(x);
    };

    // Pick a composition style
    const compositionType = random(); // 0.0-0.3: Emblem, 0.3-0.7: Mandala, 0.7-1.0: Radial Bloom

    let content = '';

    // -- Background --
    content += `<rect width="${size}" height="${size}" fill="${palette.background}" />`;

    // -- Texture --
    if (random() > 0.5) {
        const steps = 4 + Math.floor(random() * 4) * 2;
        const radiusStep = (size * 0.6) / steps;
        for (let i = 1; i <= steps; i++) {
            const r = i * radiusStep;
            const opacity = 0.05 + random() * 0.1;
            content += `<circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="${palette.text}" stroke-width="${strokeWidth * 0.5}" opacity="${opacity}" />`;
        }
    }

    // Helper to get a random path
    const getRandomPath = () => ELEGANT_PATHS[Math.floor(random() * ELEGANT_PATHS.length)];

    if (compositionType < 0.3) {
        // --- EMBLEM: Central complex shape with possible mirroring ---
        const shape = getRandomPath();
        const baseScale = (size * 0.45) / 50;

        // Mirroring?
        const mirror = random() > 0.5;

        if (mirror) {
            // Left/Right mirror (Flanking)
            const d = shape.d;

            // Translate(-50,-50) centers the 100x100 path at local 0,0
            // Translate(25, 0) moves it to the right
            // Scale and Translate to canvas center

            // Right Side
            content += `<g transform="translate(${center}, ${center}) scale(${baseScale}) translate(20, 0) translate(-50, -50)">
                <path d="${d}" fill="${palette.primary}" stroke="${palette.text}" stroke-width="0.5" />
            </g>`;

            // Left Side (Mirrored)
            content += `<g transform="translate(${center}, ${center}) scale(${-baseScale}, ${baseScale}) translate(20, 0) translate(-50, -50)">
                <path d="${d}" fill="${palette.primary}" stroke="${palette.text}" stroke-width="0.5" opacity="0.9" />
            </g>`;

            // Central small accent connecting them
            content += `<circle cx="${center}" cy="${center}" r="${size * 0.03}" fill="${palette.accent}" />`;

        } else {
            // Single centerpiece
            content += `<g transform="translate(${center}, ${center}) scale(${baseScale}) translate(-50, -50)">
                <path d="${shape.d}" fill="${palette.primary}" stroke="${palette.text}" stroke-width="0.5" />
            </g>`;
        }

    } else if (compositionType < 0.7) {
        // --- MANDALA: Layered rings of symbols ---
        const layers = 2 + Math.floor(random() * 3); // 2 to 4 layers

        for (let l = 0; l < layers; l++) {
            const layerShape = getRandomPath();
            const count = [4, 6, 8, 12][Math.floor(random() * 4)];
            const dist = (size * 0.1) + (l * (size * 0.12));
            const scale = (size * 0.15) / 100; // Smaller elements
            const layerColor = (l % 2 === 0) ? palette.primary : palette.secondary;

            for (let i = 0; i < count; i++) {
                const angle = (360 / count) * i;
                content += `<g transform="translate(${center}, ${center}) rotate(${angle}) translate(0, ${-dist}) scale(${scale}) translate(-50,-50)">
                    <path d="${layerShape.d}" fill="${layerColor}" stroke="${palette.text}" stroke-width="2" />
                </g>
                </g>`;
            }
        }

        // Center dot
        content += `<circle cx="${center}" cy="${center}" r="${size * 0.06}" fill="${palette.accent}" />`;

    } else {
        // --- RADIAL BLOOM: Procedural + Ornament ---
        const petals = 6 + Math.floor(random() * 4) * 2;
        const outerR = size * 0.35;
        const innerR = size * 0.1;

        const cpW = (outerR - innerR) * 0.5;

        // Procedural petals in background
        for (let i = 0; i < petals; i++) {
            const angle = (360 / petals) * i;
            // Draw petal
            content += `<g transform="translate(${center}, ${center}) rotate(${angle})">
                <path d="M 0 ${-innerR} Q ${cpW} ${-outerR} 0 ${-outerR} Q ${-cpW} ${-outerR} 0 ${-innerR}" fill="${palette.primary}" fill-opacity="0.3" stroke="none" />
            </g>`;
        }

        // Ornament overlaid
        const ornament = getRandomPath();
        const ornScale = (size * 0.1) / 100;
        const ornDist = size * 0.25;

        for (let i = 0; i < petals; i++) {
            const angle = (360 / petals) * i + (180 / petals); // Offset
            content += `<g transform="translate(${center}, ${center}) rotate(${angle}) translate(0, ${-ornDist}) scale(${ornScale}) translate(-50,-50)">
                <path d="${ornament.d}" fill="${palette.secondary}" />
            </g>`;
        }
    }

    // -- Frame / Border (Polished look) --
    // We favor circular frames to fit standard avatars, but occasionally use inscribed ornaments.

    const frameType = random();

    if (frameType < 0.4) {
        // Simple Double Ring
        content += `
            <circle cx="${center}" cy="${center}" r="${size * 0.48}" fill="none" stroke="${palette.text}" stroke-width="${strokeWidth}" opacity="0.6" />
            <circle cx="${center}" cy="${center}" r="${size * 0.46}" fill="none" stroke="${palette.text}" stroke-width="${strokeWidth * 0.5}" opacity="0.3" />
        `;
    } else if (frameType < 0.7) {
        // Dashed / Decorated Ring
        const dashArray = `${size * 0.05} ${size * 0.05}`;
        content += `
            <circle cx="${center}" cy="${center}" r="${size * 0.47}" fill="none" stroke="${palette.secondary}" stroke-width="${strokeWidth * 1.5}" stroke-dasharray="${dashArray}" opacity="0.8" />
        `;
    } else if (frameType < 0.9) {
        // Inscribed Square Accents (Corner pieces, but strictly inside the circle)
        // The inscribed square of a circle with radius R has a half-side of R/sqrt(2).
        // R = size/2. Or ~0.35 * size from center.
        // Center is 0.5. 0.5 +/- 0.35 is 0.15 and 0.85.

        const ornament = getRandomPath();
        const cScale = (size * 0.12) / 100; // Small
        const inset = size * 0.18; // Safe zone (approx inside inscribed square)

        const safeCorners = [
            `translate(${inset}, ${inset}) scale(${cScale}) translate(-50, -50)`,
            `translate(${size - inset}, ${inset}) scale(-${cScale}, ${cScale}) translate(-50, -50)`,
            `translate(${size - inset}, ${size - inset}) scale(-${cScale}, -${cScale}) translate(-50, -50)`,
            `translate(${inset}, ${size - inset}) scale(${cScale}, -${cScale}) translate(-50, -50)`
        ];

        safeCorners.forEach(t => {
            content += `<g transform="${t}">
                <path d="${ornament.d}" fill="${palette.accent}" />
            </g>`;
        });

        // Add a subtle ring behind to bound them
        content += `<circle cx="${center}" cy="${center}" r="${size * 0.48}" fill="none" stroke="${palette.text}" stroke-width="${strokeWidth}" opacity="0.2" />`;
    }
    // Else: No frame (clean look)

    return content;
}
