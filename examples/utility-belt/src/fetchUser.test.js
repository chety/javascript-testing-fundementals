import { vi } from 'vitest';
import { fetchUser } from './fetchUser.js';

describe('fetchTestUser tests', () => {
  beforeAll(() => {
    global.fetch = vi.fn();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
  it('should throw an error if the user ID is missing', async () => {
    await expect(fetchUser()).rejects.toThrow('User ID is required');
  });

  it('should throw an error if the API is down', async () => {
    global.fetch.mockRejectedValue(new Error('API is down'));
    // global.fetch = vi.fn(() => Promise.reject(new Error('API is down')));
    await expect(fetchUser(1)).rejects.toThrow('API is down');
  });

  it('should throw an error if the response is not OK', async () => {
    global.fetch.mockResolvedValue({ ok: false });

    await expect(fetchUser(1)).rejects.toThrow('Failed to fetch user');
  });

  it('should return the user if the response is OK', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: 'Rodik' }),
    });

    const user = await fetchUser(1);
    expect(user).toEqual({ id: 1, name: 'Rodik' });
  });

  it('should return the user if the response is OK - without async', () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: 'Rodik' }),
    });

    return expect(fetchUser(1)).resolves.toEqual({ id: 1, name: 'Rodik' });
  });
});

describe('vitest hooks', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should get the user', () => {
    const user = getUserAsync();
    vi.advanceTimersByTime(5000);
    expect(user).resolves.toEqual({ id: 1, name: 'Mirko' });
  });
});

const getUserAsync = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Mirko' });
    }, 5000);
  });
};
