const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '../public/images/portfolio');
const files = fs.readdirSync(portfolioDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));

console.log(`Found ${files.length} images to optimize`);

// Check if sharp is available
try {
  require.resolve('sharp');
  console.log('✅ Sharp is available - will convert to WebP');
  
  const sharp = require('sharp');
  const outputDir = path.join(portfolioDir, 'webp');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  
  files.forEach(file => {
    const inputPath = path.join(portfolioDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(jpeg|jpg)$/, '.webp'));
    
    console.log(`Converting ${file}...`);
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        const originalSize = fs.statSync(inputPath).size / 1024;
        const webpSize = fs.statSync(outputPath).size / 1024;
        console.log(`   ✅ ${file}: ${(originalSize).toFixed(0)}KB → ${(webpSize).toFixed(0)}KB (${((1 - webpSize/originalSize) * 100).toFixed(0)}% smaller)`);
      })
      .catch(err => console.error(`   ❌ Error:`, err.message));
  });
  
} catch (e) {
  console.log('⚠️ Sharp not found. Images will be served as-is.');
  console.log('To optimize: bun add sharp && node scripts/optimize-images.js');
}
