import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  'public/images/2-player-run.webp',
  'public/images/pokesurvivor-coop.webp',
  'public/images/pokesurvivor-menu.webp',
  'public/images/pokesurvivor-starters-29.webp',
  'public/images/pokesurvivor-tier-list.webp'
];

async function optimizeImages() {
  console.log('开始优化图片...\n');

  let totalOriginal = 0;
  let totalNew = 0;

  for (const img of images) {
    const imgPath = path.join(__dirname, '..', img);

    if (!fs.existsSync(imgPath)) {
      console.log(`⚠ 文件不存在: ${img}\n`);
      continue;
    }

    const originalSize = fs.statSync(imgPath).size;
    const newPath = imgPath.replace('.webp', '-new.webp');

    await sharp(imgPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(newPath);

    const newSize = fs.statSync(newPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    totalOriginal += originalSize;
    totalNew += newSize;

    console.log(`✓ ${path.basename(imgPath)}`);
    console.log(`  原大小: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`  新大小: ${(newSize / 1024).toFixed(1)}KB`);
    console.log(`  节省: ${savings}%`);
    console.log(`  → 已生成: ${path.basename(newPath)}\n`);
  }

  const totalSavings = ((totalOriginal - totalNew) / 1024).toFixed(1);
  const totalSavingsPercent = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);

  console.log('==================');
  console.log('优化完成！');
  console.log(`总节省: ${totalSavings}KB (${totalSavingsPercent}%)`);
  console.log('\n⚠ 请手动检查 -new.webp 文件，确认质量后替换原文件。');
}

optimizeImages().catch(err => {
  console.error('优化失败:', err);
  process.exit(1);
});

