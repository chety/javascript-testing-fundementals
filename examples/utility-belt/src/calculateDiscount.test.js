import { calculateDiscount } from './calculateDiscount';

describe('calculateDiscount test', () => {
  it(`should throw an error if the price is 0 or less than 0`, () => {
    expect(() => calculateDiscount(0)).toThrow('Price must be greater than 0');
    expect(() => calculateDiscount(-145)).toThrow(
      'Price must be greater than 0',
    );
  });

  it(`should return 20% off for prices over $1000`, () => {
    expect(calculateDiscount(1000)).toBe(200);
  });

  it(`should return 10% off otherwise`, () => {
    expect(calculateDiscount(500)).toBe(50);
  });
});
