/**
 * FNV-1a hashing algorithm to generate a deterministic 32-bit integer from a string.
 * This is used to seed the random number generator for consistent avatar generation.
 */
export function getHash(str: string): number {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        // Use Math.imul for true 32-bit integer multiplication
        hash = Math.imul(hash, 16777619);
    }
    // Force unsigned 32-bit integer
    return hash >>> 0;
}
