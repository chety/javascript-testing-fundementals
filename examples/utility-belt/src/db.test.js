import { db, getUserById } from './db.js';
describe('db tests', () => {
  let findByUserIdSpy;

  beforeEach(() => {
    findByUserIdSpy = vi.spyOn(db, 'findByUserId');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error if the user is not found', async () => {
    findByUserIdSpy.mockResolvedValue(null);
    await expect(getUserById(1)).rejects.toThrow('User not found with id: 1');
  });

  it('should throw an error if there is a database error', async () => {
    findByUserIdSpy.mockRejectedValue(
      new Error('Unable to connect to database'),
    );
    await expect(getUserById(1)).rejects.toThrow(
      'Database error. Detail: Unable to connect to database',
    );
  });

  it('should return the user', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: '4x2Xc@example.com',
    };
    findByUserIdSpy.mockResolvedValue(mockUser);
    const user = await getUserById(49);
    expect(user).toEqual(mockUser);
  });
});
