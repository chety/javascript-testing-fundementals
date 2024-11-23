describe('DOM tests', () => {
  let domSpy;
  beforeAll(() => {
    domSpy = vi.spyOn(document, 'getElementById').mockReturnValue({
      textContent: 'hello there',
    });
  });
  it('should return correct text content', () => {
    const button = global.document.getElementById('button');
    expect(button.textContent).toBe('hello there');
    expect(domSpy).toHaveBeenCalledTimes(1);
  });
});
