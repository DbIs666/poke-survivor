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

function replaceImages() {
  console.log('开始替换优化后的图片...\n');

  for (const img of images) {
    const imgPath = path.join(__dirname, '..', img);
    const newPath = imgPath.replace('.webp', '-new.webp');

    if (!fs.existsSync(newPath)) {
      console.log(`⚠ 优化文件不存在: ${path.basename(newPath)}`);
      continue;
    }

    if (!fs.existsSync(imgPath)) {
      console.log(`⚠ 原文件不存在: ${path.basename(imgPath)}`);
      continue;
    }

    const backupPath = imgPath.replace('.webp', '-original.webp');

    // Backup original
    fs.copyFileSync(imgPath, backupPath);

    // Replace with optimized
    fs.copyFileSync(newPath, imgPath);

    // Remove new file
    fs.unlinkSync(newPath);

    console.log(`✓ ${path.basename(imgPath)} 已替换`);
    console.log(`  备份: ${path.basename(backupPath)}\n`);
  }

  console.log('==================');
  console.log('替换完成！原文件已备份为 -original.webp');
  console.log('如需回滚，请手动将备份文件重命名。');
}

replaceImages();
