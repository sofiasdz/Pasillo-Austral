import fs from 'fs';
import path from 'path';

export function getLatestUpload() {
  const uploadsDir = path.join(process.cwd(), 'uploads');

  const files = fs.readdirSync(uploadsDir)
    .filter(file => !file.startsWith('.'))
    .map(file => {
      const fullPath = path.join(uploadsDir, file);
      return { file, time: fs.statSync(fullPath).mtime };
    })
    .sort((a, b) => b.time - a.time);

  return files[0]?.file ?? null;
}
