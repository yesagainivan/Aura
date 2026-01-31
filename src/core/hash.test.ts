import { describe, it, expect } from 'vitest';
import { getHash } from './hash';

describe('getHash', () => {
    it('should return the same hash for the same input', () => {
        const input = 'test-string';
        const hash1 = getHash(input);
        const hash2 = getHash(input);
        expect(hash1).toBe(hash2);
    });

    it('should return different hashes for different inputs', () => {
        expect(getHash('user1')).not.toBe(getHash('user2'));
    });

    it('should always return a positive integer', () => {
        const hash = getHash('some-long-string-to-test-overflow');
        expect(hash).toBeGreaterThanOrEqual(0);
    });

    it('should handle empty strings', () => {
        expect(getHash('')).toBeDefined();
    });
});
