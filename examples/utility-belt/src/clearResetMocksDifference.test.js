const obj = {
  method: () => 'original obj method',
};

describe('clearAllMocks vs. restoreAllMocks', () => {
  it('clearAllMocks keeps the mock implementation, remove mock data', () => {
    const spy = vi
      .spyOn(obj, 'method')
      .mockImplementation(() => 'clearAllMocks mocked data');
    obj.method();
    expect(obj.method()).toBe('clearAllMocks mocked data');
    expect(spy).toHaveBeenCalledTimes(2);

    //clearAllMocks keeps the mock implementation,resets all mock data (call history, return values)
    vi.clearAllMocks();

    expect(obj.method()).toBe('clearAllMocks mocked data');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('restoreAllMocks resets everything to the original state', () => {
    const spy = vi
      .spyOn(obj, 'method')
      .mockImplementation(() => 'resetAllMocks mocked data');

    obj.method();
    expect(obj.method()).toBe('resetAllMocks mocked data');
    expect(spy).toHaveBeenCalledTimes(2);

    //restoreAllMocks completely undoes the spying/mocking
    vi.restoreAllMocks();

    expect(obj.method()).toBe('original obj method');
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
