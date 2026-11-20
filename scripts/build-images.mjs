import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artDir = path.join(root, 'src', 'art');
const outDir = path.join(root, 'public', 'images');

const jobs = [
  { src: 'hero-room.svg', out: 'hero-room.webp', width: 1400, quality: 84 },
  { src: 'hypnotherapy.svg', out: 'hypnotherapy.webp', width: 1000, quality: 84 },
  { src: 'regression.svg', out: 'regression.webp', width: 1000, quality: 84 },
  { src: 'constellation.svg', out: 'constellation.webp', width: 1000, quality: 84 },
  { src: 'soul-regression.svg', out: 'soul-regression.webp', width: 1000, quality: 84 },
  { src: 'about.svg', out: 'about.webp', width: 900, quality: 84 },
];

await mkdir(outDir, { recursive: true });

for (const job of jobs) {
  await sharp(path.join(artDir, job.src))
    .resize({ width: job.width })
    .webp({ quality: job.quality })
    .toFile(path.join(outDir, job.out));
  console.log(`created ${job.out}`);
}

await sharp(path.join(outDir, 'hero-room.webp'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .png()
  .toFile(path.join(outDir, 'og.png'));

console.log('created og.png');
