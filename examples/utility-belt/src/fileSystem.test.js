import { readFile, writeFile } from 'fs/promises';
import { processFile } from './fileSystem';

describe('node file system functions', () => {
  vi.mock('fs/promises');

  it('should read a file and update the file', async () => {
    const mockFilePath = 'test.txt';
    const existingMockContent = 'Hello, world!';
    const updatedMockContent = 'Hello, updated world!';

    readFile.mockResolvedValue(existingMockContent);

    const result = await processFile(mockFilePath, updatedMockContent);
    expect(readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    expect(writeFile).toHaveBeenCalledWith(
      mockFilePath,
      `${existingMockContent}\n${updatedMockContent}`,
    );
    expect(result).toBe(`${existingMockContent}\n${updatedMockContent}`);
  });
});
