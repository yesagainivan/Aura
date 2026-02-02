
import * as fs from 'fs';
import * as path from 'path';

const INPUT_FILE = path.join(__dirname, '../../ref/designs/Elegance.svg');

// Basic SVG Path Command Parser
type Point = { x: number, y: number };
type Command = { type: string, values: number[] };

function parsePath(d: string): Command[] {
    const commands: Command[] = [];
    const tokenizer = /([a-zA-Z])|([-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?)/g;
    let match;
    let currentCommand = '';
    let currentValues: number[] = [];

    while ((match = tokenizer.exec(d)) !== null) {
        if (match[1]) { // Command letter
            if (currentCommand) {
                commands.push({ type: currentCommand, values: currentValues });
            }
            currentCommand = match[1];
            currentValues = [];
        } else if (match[2]) { // Number
            currentValues.push(parseFloat(match[2]));
        }
    }
    if (currentCommand) {
        commands.push({ type: currentCommand, values: currentValues });
    }
    return commands;
}

// Minimal bbox calculator (Approximate for cubic beziers by using control points)
function getPathBBox(commands: Command[]): { minX: number, minY: number, maxX: number, maxY: number } {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let x = 0, y = 0;

    const update = (px: number, py: number) => {
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
    };

    for (const cmd of commands) {
        const v = cmd.values;
        switch (cmd.type) {
            case 'M': x = v[0]; y = v[1]; update(x, y); for (let i = 2; i < v.length; i += 2) { x = v[i]; y = v[i + 1]; update(x, y); } break;
            case 'm': x += v[0]; y += v[1]; update(x, y); for (let i = 2; i < v.length; i += 2) { x += v[i]; y += v[i + 1]; update(x, y); } break;
            case 'L': x = v[0]; y = v[1]; update(x, y); for (let i = 2; i < v.length; i += 2) { x = v[i]; y = v[i + 1]; update(x, y); } break;
            case 'l': x += v[0]; y += v[1]; update(x, y); for (let i = 2; i < v.length; i += 2) { x += v[i]; y += v[i + 1]; update(x, y); } break;
            case 'H': x = v[0]; update(x, y); break;
            case 'h': x += v[0]; update(x, y); break;
            case 'V': y = v[0]; update(x, y); break;
            case 'v': y += v[0]; update(x, y); break;
            case 'C':
                for (let i = 0; i < v.length; i += 6) {
                    update(v[i], v[i + 1]); // cp1
                    update(v[i + 2], v[i + 3]); // cp2
                    x = v[i + 4]; y = v[i + 5]; update(x, y); // end
                }
                break;
            case 'c':
                for (let i = 0; i < v.length; i += 6) {
                    update(x + v[i], y + v[i + 1]);
                    update(x + v[i + 2], y + v[i + 3]);
                    x += v[i + 4]; y += v[i + 5]; update(x, y);
                }
                break;
            case 'S':
                for (let i = 0; i < v.length; i += 4) {
                    update(v[i], v[i + 1]); // cp2
                    x = v[i + 2]; y = v[i + 3]; update(x, y);
                }
                break;
            case 's':
                for (let i = 0; i < v.length; i += 4) {
                    update(x + v[i], y + v[i + 1]);
                    x += v[i + 2]; y += v[i + 3]; update(x, y);
                }
                break;
            case 'Q':
                for (let i = 0; i < v.length; i += 4) {
                    update(v[i], v[i + 1]);
                    x = v[i + 2]; y = v[i + 3]; update(x, y);
                }
                break;
            case 'q':
                for (let i = 0; i < v.length; i += 4) {
                    update(x + v[i], y + v[i + 1]);
                    x += v[i + 2]; y += v[i + 3]; update(x, y);
                }
                break;
            case 'Z': case 'z': break;
            default: console.warn('Unknown command', cmd.type);
        }
    }
    return { minX, minY, maxX, maxY };
}

function stringifyCommands(commands: Command[]): string {
    return commands.map(c => `${c.type}${c.values.join(' ')}`).join('');
}

function normalizeCommands(commands: Command[], ox: number, oy: number, scale: number): Command[] {
    const newCmds = JSON.parse(JSON.stringify(commands)); // Deep copy

    // Check if first command is lowercase m, if so, treat it as absolute M for the very first move to properly anchor the shape?
    // Actually, usually paths start with M.
    if (newCmds[0].type === 'm') {
        newCmds[0].type = 'M';
        newCmds[0].values[0] += 0; // It was relative to 0,0 anyway if it's the first cmd
        newCmds[0].values[1] += 0;
    }

    // Since we are normalizing, we need to apply the translation to all absolute coordinates,
    // and scaling to ALL coordinates (relative and absolute).
    // HOWEVER, for relative coordinates (lowercase), we do NOT apply translation, only scaling.

    for (const cmd of newCmds) {
        const v = cmd.values;
        const isAbs = cmd.type === cmd.type.toUpperCase();

        // Helper to scale X/Y
        // If absolute: (val - ox) * scale
        // If relative: val * scale
        const trX = (val: number) => isAbs ? (val - ox) * scale : val * scale;
        const trY = (val: number) => isAbs ? (val - oy) * scale : val * scale;

        switch (cmd.type) {
            case 'A': case 'a':
                // rx ry x-axis-rotation large-arc-flag sweep-flag x y
                v[0] *= scale; // rx
                v[1] *= scale; // ry
                // v[2] rotation unchanged
                // v[3], v[4] flags unchanged
                v[5] = trX(v[5]);
                v[6] = trY(v[6]);
                break;
            case 'V': v[0] = trY(v[0]); break;
            case 'v': v[0] = trY(v[0]); break;
            case 'H': v[0] = trX(v[0]); break;
            case 'h': v[0] = trX(v[0]); break;
            default:
                // Pairs of X,Y
                for (let i = 0; i < v.length; i += 2) {
                    v[i] = trX(v[i]);
                    v[i + 1] = trY(v[i + 1]);
                }
        }
    }
    return newCmds;
}

function process() {
    const svgContent = fs.readFileSync(INPUT_FILE, 'utf-8');

    // Extract groups.
    // Simplifying assumption: We extract all unique paths.
    // If they are separate paths, we treat them as separate elements unless they are very close?
    // Actually, looking at the file, complex shapes are made of multiple paths in a group.

    // Regex to find <path d="..."> and <polygon points="..."> inside <g> blocks would be hard.
    // Let's just find ALL `d="..."` attributes.
    // And for polygons, convert points to path data (M x y L x y ... Z).

    const dRegex = /d="([^"]+)"/g;
    const pointsRegex = /points="([^"]+)"/g;

    const allPaths: string[] = [];

    let match;
    while ((match = dRegex.exec(svgContent)) !== null) {
        allPaths.push(match[1]);
    }

    while ((match = pointsRegex.exec(svgContent)) !== null) {
        // Convert polygon/polyline points to path
        const pts = match[1].trim().split(/\s+|,/).map(Number);
        let d = `M${pts[0]} ${pts[1]}`;
        for (let i = 2; i < pts.length; i += 2) {
            d += ` L${pts[i]} ${pts[i + 1]}`;
        }
        d += " Z";
        allPaths.push(d);
    }

    console.log(`Found ${allPaths.length} paths.`);

    // To merge paths that belong to the same "Group", we'd need hierarchical parsing.
    // For now, let's output them individualy but filtered by complexity.
    // Tiny paths might be just noise or small details.

    const outputElements = [];

    // Deduplicate identical paths
    const uniquePaths = Array.from(new Set(allPaths));
    console.log(`Unique paths: ${uniquePaths.length}`);

    let count = 0;
    for (const d of uniquePaths) {
        try {
            const commands = parsePath(d);
            const bbox = getPathBBox(commands);
            const width = bbox.maxX - bbox.minX;
            const height = bbox.maxY - bbox.minY;

            // Filter out tiny specks (noise or invisible dots)
            if (width < 2 || height < 2) continue;

            const maxDim = Math.max(width, height);
            const scale = 100 / maxDim; // Normalize to 100x100

            // Add some padding? No, let's fit tight.

            const normalizedCmds = normalizeCommands(commands, bbox.minX, bbox.minY, scale);
            const newD = stringifyCommands(normalizedCmds);

            // Heuristic to name/classify?
            // Just use generic names.

            outputElements.push({
                d: newD,
                viewBox: "0 0 100 100", // Normalized
                type: "ornament_extracted_" + count++,
                originalBBox: bbox
            });
        } catch (e) {
            console.error("Failed to parse path:", d.substring(0, 50) + "...", e);
        }
    }

    // Generate TS code
    console.log(`\n// Generated ${outputElements.length} elements\n`);

    console.log("const EXTRA_PATHS = [");
    // Limit to avoiding massive file? The user said "ALL elements".
    // Let's print them all.
    outputElements.forEach(el => {
        console.log(`    {`);
        console.log(`        d: "${el.d}",`);
        console.log(`        viewBox: "${el.viewBox}",`);
        console.log(`        type: "${el.type}"`);
        console.log(`    },`);
    });
    console.log("];");
}

process();
