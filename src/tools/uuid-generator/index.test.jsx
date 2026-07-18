import { describe, test, expect } from 'vitest';
import { generateUUIDv4, generateUUIDv1, generateMultipleUUIDs } from './utils';

describe('UUID Generator', () => {

  describe('generateUUIDv4', () => {
    test('should always generate 36-character string', () => {
      for (let i = 0; i < 100; i++) {
        const uuid = generateUUIDv4();
        expect(uuid.length).toBe(36);
      }
    });

    test('should match RFC 4122 v4 pattern', () => {
      const uuid = generateUUIDv4();
      const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuid).toMatch(pattern);
    });

    test('should have all unique UUIDs (no collisions in 1000 samples)', () => {
      const uuids = new Set();
      for (let i = 0; i < 1000; i++) {
        uuids.add(generateUUIDv4());
      }
      expect(uuids.size).toBe(1000);
    });
  });

  describe('generateUUIDv1', () => {
    test('should always generate 36-character string', () => {
      for (let i = 0; i < 100; i++) {
        const uuid = generateUUIDv1();
        expect(uuid.length).toBe(36);
      }
    });

    test('should match RFC 4122 v1 pattern', () => {
      const uuid = generateUUIDv1();
      const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuid).toMatch(pattern);
    });

    test('should NOT match the buggy v1 pattern', () => {
      const uuid = generateUUIDv1();
      const buggyPattern = /-\d{1}-|-\w{13,}$/;
      expect(uuid).not.toMatch(buggyPattern);
    });

    test('should have all unique UUIDs', () => {
      const uuids = new Set();
      for (let i = 0; i < 1000; i++) {
        uuids.add(generateUUIDv1());
      }
      expect(uuids.size).toBe(1000);
    });
  });

  describe('generateMultipleUUIDs', () => {
    test('should generate correct count of v4 UUIDs', () => {
      const uuids = generateMultipleUUIDs(5, 4);
      expect(uuids).toHaveLength(5);
      uuids.forEach(uuid => {
        expect(uuid.length).toBe(36);
        expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      });
    });

    test('should generate correct count of v1 UUIDs', () => {
      const uuids = generateMultipleUUIDs(5, 1);
      expect(uuids).toHaveLength(5);
      uuids.forEach(uuid => {
        expect(uuid.length).toBe(36);
        expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      });
    });
  });
});
