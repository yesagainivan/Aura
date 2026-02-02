
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../../ref/designs/Elegance.svg');

function parsePath(d) {
    const commands = [];
    const tokenizer = /([a-zA-Z])|([-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?)/g;
    let match;
    let currentCommand = '';
    let currentValues = [];

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

function getPathBBox(commands) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let x = 0, y = 0;

    const update = (px, py) => {
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
            // Warning: Does not handle A/a perfectly for bbox, assumes endpoints are good enough approximation for now
            default: break;
        }
    }
    return { minX, minY, maxX, maxY };
}

function stringifyCommands(commands) {
    return commands.map(c => `${c.type}${c.values.map(n => Math.round(n * 100) / 100).join(' ')}`).join('');
}

function normalizeCommands(commands, ox, oy, scale) {
    const newCmds = JSON.parse(JSON.stringify(commands)); // Deep copy

    if (newCmds[0].type === 'm') {
        newCmds[0].type = 'M';
        newCmds[0].values[0] += 0;
        newCmds[0].values[1] += 0;
    }

    for (const cmd of newCmds) {
        const v = cmd.values;
        const isAbs = cmd.type === cmd.type.toUpperCase();

        const trX = (val) => isAbs ? (val - ox) * scale : val * scale;
        const trY = (val) => isAbs ? (val - oy) * scale : val * scale;

        switch (cmd.type) {
            case 'A': case 'a':
                v[0] *= scale; // rx
                v[1] *= scale; // ry
                v[5] = trX(v[5]);
                v[6] = trY(v[6]);
                break;
            case 'V': v[0] = trY(v[0]); break;
            case 'v': v[0] = trY(v[0]); break;
            case 'H': v[0] = trX(v[0]); break;
            case 'h': v[0] = trX(v[0]); break;
            default:
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

    const dRegex = /d="([^"]+)"/g;
    const pointsRegex = /points="([^"]+)"/g;

    const allPaths = [];

    let match;
    while ((match = dRegex.exec(svgContent)) !== null) {
        allPaths.push(match[1]);
    }

    while ((match = pointsRegex.exec(svgContent)) !== null) {
        const pts = match[1].trim().split(/\s+|,/).map(Number);
        let d = `M${pts[0]} ${pts[1]}`;
        for (let i = 2; i < pts.length; i += 2) {
            d += ` L${pts[i]} ${pts[i + 1]}`;
        }
        d += " Z";
        allPaths.push(d);
    }

    const uniquePaths = Array.from(new Set(allPaths));
    const outputElements = [];

    let count = 6; // Start after existing 5
    for (const d of uniquePaths) {
        try {
            const commands = parsePath(d);
            const bbox = getPathBBox(commands);
            const width = bbox.maxX - bbox.minX;
            const height = bbox.maxY - bbox.minY;

            if (width < 5 || height < 5) continue; // Filter explicit noise

            const maxDim = Math.max(width, height);
            const scale = 80 / maxDim; // Normalize to 80x80 (leaving margin in 100x100)
            const ox = bbox.minX - (100 - width * scale) / 2; // Center it x
            const oy = bbox.minY - (100 - height * scale) / 2; // Center it y

            // Actually, simpler: normalize to 0..100 based on bbox
            // newX = (x - minX) * (100/maxDim)
            // Centering: offset = (100 - dim*scale)/2

            const finalScale = 100 / maxDim;
            const offsetX = bbox.minX - (100 - width * finalScale) / 2 / finalScale; // Adjust origin so that when scaled it centers? 
            // Let's just normalize to top-left 0,0 then simplistic center in code?
            // ELEGANT_PATHS usually have viewBox "0 0 100 100".
            // So we want the path to fit nicely in that box.

            const padding = 10;
            const targetSize = 100 - padding * 2;
            const fitScale = targetSize / maxDim;

            const finalOx = bbox.minX - padding / fitScale;
            const finalOy = bbox.minY - padding / fitScale;

            // Shift so that (minX, minY) -> (padding, padding)
            // (x - minX) * fitScale + padding
            // = (x - (minX - padding/fitScale)) * fitScale

            const normalizedCmds = normalizeCommands(commands, finalOx, finalOy, fitScale);
            const newD = stringifyCommands(normalizedCmds);

            outputElements.push({
                d: newD,
                viewBox: "0 0 100 100",
                type: "extracted_" + count++
            });
        } catch (e) {
            // Ignore parse errors for complex paths
        }
    }

    console.log("const EXTRA_PATHS = [");
    // Only output the first 20 to avoid overwhelming file size if there are too many
    // User asked for "ALL", but let's see how many there are.
    // I'll output all of them.
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
