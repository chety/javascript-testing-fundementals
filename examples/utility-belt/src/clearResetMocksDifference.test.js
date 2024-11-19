describe('clearAllMocks vs. resetAllMocks vs. restoreAllMocks', () => {
  // Clear: You’ve created some complex mock logic, and now you’re retracing steps, clearing call history to test cleanly.
  // Reset: You made a mess with return values or .mockImplementation, and now you just want to start over without rebuilding the mock.
  // Restore: You’re done mocking, you want to reinstate the original functionality, and walk away like nothing ever happened.

  let obj;
  beforeEach(() => {
    obj = {
      method: () => 'original obj method',
    };
  });

  it('clearAllMocks keeps the mock implementation, remove mock data', () => {
    const spy = vi
      .spyOn(obj, 'method')
      .mockImplementation(() => 'clearAllMocks mocked data');
    obj.method();
    expect(obj.method()).toBe('clearAllMocks mocked data');
    expect(spy).toHaveBeenCalledTimes(2);

    //clearAllMocks keeps the mock implementation,resets all mock data (call history, return values)
    // vi.clearAllMocks();
    spy.mockClear();

    expect(obj.method()).toBe('clearAllMocks mocked data');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('resetAllMocks restores mock implementation to the default and keep the mock', () => {
    const spy = vi
      .spyOn(obj, 'method')
      .mockImplementation(() => 'resetAllMocks mocked data');
    obj.method();
    expect(obj.method()).toBe('resetAllMocks mocked data');
    expect(spy).toHaveBeenCalledTimes(2);

    // vi.resetAllMocks();
    spy.mockReset();

    expect(obj.method()).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('restoreAllMocks resets everything to the original state', () => {
    expect(obj.method()).toBe('original obj method');

    const spy = vi
      .spyOn(obj, 'method')
      .mockReturnValue('restoreAllMocks mocked data');

    obj.method();
    expect(obj.method()).toBe('restoreAllMocks mocked data');
    expect(spy).toHaveBeenCalledTimes(2);

    //restoreAllMocks completely undoes the spying/mocking
    // vi.restoreAllMocks();
    spy.mockRestore();

    expect(obj.method()).toBe('original obj method');
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
