import { test, expect, vi } from 'vitest';

const logSpy = vi.spyOn(console, 'log');
test('a super simple test', () => {
  console.log('Chety is awsome');

  expect(logSpy).toHaveBeenCalledWith('Chety is awsome');
  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalledOnce();

  expect(true).toBe(true);
});

const randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.9);
test('another super simple test', () => {
  const randomValue = Math.random();
  expect(randomValue).toBe(0.9);
});
