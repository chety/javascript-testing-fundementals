import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from './arithmetic';

describe('add', () => {
  it('should add 2 numbers', () => {
    expect(add(2, 4)).toBe(6);
  });

  it('should add 2 negative numbers', () => {
    expect(add(-2, -4)).toBe(-6);
  });

  it('should convert string to numbers if available', () => {
    expect(add('2', '4')).toBe(6);
  });

  it('should throw an error if given  first argument string that is not a number', () => {
    expect(() => add('potato', '2')).toThrowError('not a number');
  });

  it('should throw an error if given  second argument string that is not a number', () => {
    expect(() => add('2', 'potato')).toThrowError('not a number');
  });
});

describe('subtract', () => {
  it('should subtract 2 numbers', () => {
    expect(subtract(2, 4)).toBe(-2);
  });
});

describe('multiply', () => {
  it('should multiply 2 numbers', () => {
    expect(multiply(2, 4)).toBe(8);
  });
});

describe('divide', () => {
  it('should divide 2 numbers', () => {
    expect(divide(12, 4)).toBe(3);
  });

  it('should throw the error if the second argument is zero', () => {
    expect(() => divide(12, 0)).toThrowError('divide by zero');
  });
});

describe('tryings', () => {
  it('should work', () => {
    expect({}).toStrictEqual({});
  });
});
