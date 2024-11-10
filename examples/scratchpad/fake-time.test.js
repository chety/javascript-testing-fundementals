import { vi, describe, it, expect } from 'vitest';

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
