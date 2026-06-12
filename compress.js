import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetDir = path.resolve('pages/asset');

async function processImages() {
  const files = fs.readdirSync(assetDir);
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const filePath = path.join(assetDir, file);
      const parsed = path.parse(file);
      const outPath = path.join(assetDir, `${parsed.name}.webp`);

      console.log(`Processing ${file}...`);
      await sharp(filePath)
        .resize(800) // resize width to 800px, keep aspect ratio
        .webp({ quality: 80 }) // 80% quality webp
        .toFile(outPath);
      
      console.log(`Saved ${outPath}`);
    }
  }
}

processImages().catch(console.error);
