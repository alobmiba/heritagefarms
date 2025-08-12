const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const optimizeImage = async (inputPath, outputPath, options = {}) => {
  const {
    quality = 80,
    width,
    height,
    format = 'webp'
  } = options;

  try {
    let pipeline = sharp(inputPath);

    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    if (format === 'webp') {
      pipeline = pipeline.webp({ quality });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality });
    } else if (format === 'jpeg' || format === 'jpg') {
      pipeline = pipeline.jpeg({ quality });
    }

    await pipeline.toFile(outputPath);
    console.log(`✅ Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
};

const optimizeDirectory = async (inputDir, outputDir, options = {}) => {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    
    const files = await fs.readdir(inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const stats = await fs.stat(inputPath);
      
      // Skip if file is already optimized (smaller than 500KB)
      if (stats.size < 500 * 1024) {
        console.log(`⏭️  Skipping small file: ${file}`);
        continue;
      }

      const nameWithoutExt = path.parse(file).name;
      const outputPath = path.join(outputDir, `${nameWithoutExt}.webp`);
      
      await optimizeImage(inputPath, outputPath, options);
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${inputDir}:`, error.message);
  }
};

const main = async () => {
  console.log('🚀 Starting image optimization...\n');

  // Optimize banner images
  await optimizeDirectory(
    'public/branding/Images/banner',
    'public/branding/Images/banner/optimized',
    { quality: 85, width: 1200 }
  );

  // Optimize product images
  await optimizeDirectory(
    'public/branding/Images/products',
    'public/branding/Images/products/optimized',
    { quality: 80, width: 800 }
  );

  console.log('\n✅ Image optimization complete!');
};

main().catch(console.error);
