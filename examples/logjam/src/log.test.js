import { expect, it, vi, beforeEach, afterEach, describe } from 'vitest';
import { log } from './log';

describe('logger', () => {
  describe('Development', () => {
    beforeAll(() => {
      vi.stubEnv('MODE', 'development');
    });

    afterAll(() => {
      vi.unstubAllEnvs();
    });
    it('should log to the console', () => {
      const logSpy = vi.spyOn(console, 'log');
      log('Hello, world!');
      expect(logSpy).toHaveBeenCalledWith('Hello, world!');
    });
  });

  describe('Production', () => {
    it('should NOT log to the console', () => {
      const logSpy = vi.spyOn(console, 'log');
      log('Hello, world!', { mode: 'production' });
      expect(logSpy).not.toHaveBeenCalled();
    });

    it('should call sendToServer', () => {
      const sendToServerMock = vi.fn();
      log('Hello, world!', {
        mode: 'production',
        level: 'info',
        callback: sendToServerMock,
      });
      expect(sendToServerMock).toHaveBeenCalled();
      expect(sendToServerMock).toHaveBeenCalledWith('info', 'Hello, world!');
    });
  });
});
