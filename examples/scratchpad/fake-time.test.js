import { vi, describe, it, expect, beforeAll } from 'vitest';

vi.useFakeTimers();

function delay(callback) {
  setTimeout(() => {
    callback('Delayed');
  }, 1000);
}

describe('delay function', () => {
  it('should call callback after delay', () => {
    const mockCallback = vi.fn();
    delay(mockCallback);
    vi.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalledWith('Delayed');
  });
});

describe('Date mocks', () => {
  const mockedDate = new Date(2024, 0, 1);
  beforeAll(() => {
    vi.setSystemTime(mockedDate);
  });

  it('should return current date', () => {
    const today = new Date();
    expect(today).toEqual(mockedDate);
  });
});
