import { test, expect, vi, describe, beforeAll, afterAll } from 'vitest';

describe('Spy tests', () => {
  let logSpy, randomSpy;

  beforeAll(() => {
    logSpy = vi.spyOn(console, 'log');
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.9);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
  test('a super simple test', () => {
    console.log('Chety is awsome');

    expect(logSpy).toHaveBeenNthCalledWith(1, 'Chety is awsome');
    expect(logSpy).toHaveBeenLastCalledWith('Chety is awsome');
    expect(logSpy).toHaveBeenCalledOnce();
  });

  test('another super simple test', () => {
    const randomValue = Math.random();

    expect(randomSpy).toHaveBeenCalledTimes(1);
    expect(randomSpy).toHaveBeenCalledOnce();
    expect(randomValue).toBe(0.9);
  });
});
