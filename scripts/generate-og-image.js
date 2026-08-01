const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateOGImage() {
  const inputPath = path.join(__dirname, '../upload/IMG_9679.jpeg');
  const outputPath = path.join(__dirname, '../public/og-image.jpg');
  
  // Check if input exists
  if (!fs.existsSync(inputPath)) {
    console.log('Input image not found:', inputPath);
    // Try alternative location
    const altPath = path.join(__dirname, '../public/images/portfolio/IMG_9679.jpeg');
    if (fs.existsSync(altPath)) {
      console.log('Using alternative source:', altPath);
      generateFromPath(altPath, outputPath);
    } else {
      console.log('ERROR: No source image found');
    }
    return;
  }
  
  await generateFromPath(inputPath, outputPath);
}

async function generateFromPath(inputPath, outputPath) {
  try {
    // SVG overlay for branding
    const svgOverlay = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#000000;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:0.85" />
          </linearGradient>
        </defs>
        <rect x="0" y="420" width="1200" height="210" fill="url(#grad)"/>
        <text x="60" y="500" font-family="Arial,sans-serif" font-size="58" fill="white" font-weight="bold">
          Эстетик<tspan fill="#2EA8FF">Бро</tspan>
        </text>
        <text x="60" y="560" font-family="Arial,sans-serif" font-size="26" fill="#9ca3af">
          Профессиональный детейлинг автомобилей в Челябинске
        </text>
        <rect x="880" y="475" width="280" height="54" rx="27" fill="#2EA8FF"/>
        <text x="1020" y="510" font-family="Arial,sans-serif" font-size="22" fill="#000" text-anchor="middle" font-weight="bold">
          ★ 4.8 рейтинг
        </text>
      </svg>
    `;

    // Create OG image: 1200x630 with branding overlay
    await sharp(inputPath)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .composite([{
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0
      }])
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log('✅ OG image created successfully!');
    console.log(`   Path: ${outputPath}`);
    console.log(`   Size: ${(stats.size / 1024).toFixed(0)}KB`);
    console.log(`   Dimensions: 1200×630px`);
    
  } catch (error) {
    console.error('Error generating OG image:', error.message);
  }
}

generateOGImage();
