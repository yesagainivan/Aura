export type ShapeType = 'circle' | 'square' | 'triangle' | 'ring';

export interface Shape {
    type: ShapeType;
    x: number;
    y: number;
    size: number;
    color: string;
    rotation?: number;
    opacity?: number;
}

/**
 * Maps a hash value to a specific shape type.
 */
export function getShapeType(hash: number): ShapeType {
    const types: ShapeType[] = ['circle', 'square', 'triangle', 'ring'];
    return types[Math.abs(hash) % types.length];
}

/**
 * Generates a random number between min and max deterministically based on a seed.
 */
export function pseudoRandom(seed: number, min: number, max: number): number {
    const x = Math.sin(seed) * 10000;
    const random = x - Math.floor(x); // 0..1
    return min + random * (max - min);
}
