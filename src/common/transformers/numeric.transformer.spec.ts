import { ColumnNumericTransformer } from './numeric.transformer';

describe('ColumnNumericTransformer', () => {
  let transformer: ColumnNumericTransformer;

  beforeEach(() => {
    transformer = new ColumnNumericTransformer();
  });

  it('should be defined', () => {
    expect(transformer).toBeDefined();
  });

  describe('to', () => {
    it('should return the value passed', () => {
      const value = 100.5;
      expect(transformer.to(value)).toBe(value);
    });

    it('should handle null/undefined passively (runtime)', () => {
      expect(transformer.to(null)).toBeNull();
      expect(transformer.to(undefined)).toBeUndefined();
    });
  });

  describe('from', () => {
    it('should parse a string to a number', () => {
      const value = '100.50';
      expect(transformer.from(value)).toBe(100.5);
    });

    it('should parse an integer string to a number', () => {
      const value = '100';
      expect(transformer.from(value)).toBe(100);
    });
  });
});
