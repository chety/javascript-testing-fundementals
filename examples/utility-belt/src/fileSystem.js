import { readFile, writeFile } from 'fs/promises';

export async function processFile(filePath, content) {
  const existingContent = await readFile(filePath, 'utf-8');
  const updatedContent = `${existingContent}\n${content}`;
  await writeFile(filePath, updatedContent);
  return updatedContent;
}
