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
});
