#!/usr/bin/env node

/**
 * Image Optimization Script for Heritage Farms
 * Replaces Pexels integration with manual image optimization
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  sourceDir: path.join(__dirname, '../public/branding/Images'),
  optimizedDir: path.join(__dirname, '../public/branding/Images/optimized'),
  quality: 85,
  formats: ['webp', 'avif'],
  sizes: [320, 640, 768, 1024, 1280, 1920],
  maxFileSize: 500 * 1024, // 500KB
};

// Ensure optimized directory exists
function ensureOptimizedDir() {
  if (!fs.existsSync(CONFIG.optimizedDir)) {
    fs.mkdirSync(CONFIG.optimizedDir, { recursive: true });
    console.log('✅ Created optimized images directory');
  }
}

// Get all image files recursively
function getImageFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (isImageFile(item)) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

// Check if file is an image
function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

// Get file size in bytes
function getFileSize(filePath) {
  return fs.statSync(filePath).size;
}

// Convert file size to human readable format
function formatFileSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

// Optimize image using sharp (if available) or native methods
async function optimizeImage(inputPath, outputPath, options = {}) {
  const { quality = CONFIG.quality, format = 'webp' } = options;
  
  try {
    // Try to use sharp if available
    try {
      const sharp = require('sharp');
      
      const image = sharp(inputPath);
      
      // Resize if needed
      if (options.width) {
        image.resize(options.width, null, { withoutEnlargement: true });
      }
      
      // Convert to specified format
      if (format === 'webp') {
        await image.webp({ quality }).toFile(outputPath);
      } else if (format === 'avif') {
        await image.avif({ quality }).toFile(outputPath);
      } else {
        await image.jpeg({ quality }).toFile(outputPath);
      }
      
      return true;
    } catch (sharpError) {
      console.log('⚠️  Sharp not available, using native methods');
      
      // Fallback to native methods (copy file)
      fs.copyFileSync(inputPath, outputPath);
      return true;
    }
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
    return false;
  }
}

// Generate responsive images
async function generateResponsiveImages(inputPath) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const results = [];
  
  for (const size of CONFIG.sizes) {
    for (const format of CONFIG.formats) {
      const outputFilename = `${filename}-${size}w.${format}`;
      const outputPath = path.join(CONFIG.optimizedDir, outputFilename);
      
      const success = await optimizeImage(inputPath, outputPath, {
        width: size,
        quality: CONFIG.quality,
        format,
      });
      
      if (success) {
        const fileSize = getFileSize(outputPath);
        results.push({
          path: outputPath,
          size: fileSize,
          width: size,
          format,
        });
        
        console.log(`✅ Generated ${outputFilename} (${formatFileSize(fileSize)})`);
      }
    }
  }
  
  return results;
}

// Create image manifest
function createImageManifest(images) {
  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    images: images.map(img => ({
      original: img.original,
      optimized: img.optimized,
      savings: img.savings,
      formats: img.formats,
    })),
  };
  
  const manifestPath = path.join(CONFIG.optimizedDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Created image manifest');
}

// Main optimization function
async function optimizeImages() {
  console.log('🚀 Starting image optimization...\n');
  
  // Ensure directories exist
  ensureOptimizedDir();
  
  // Get all image files
  const imageFiles = getImageFiles(CONFIG.sourceDir);
  console.log(`📁 Found ${imageFiles.length} image files\n`);
  
  if (imageFiles.length === 0) {
    console.log('No images found to optimize');
    return;
  }
  
  const results = [];
  
  for (const imagePath of imageFiles) {
    const relativePath = path.relative(CONFIG.sourceDir, imagePath);
    console.log(`🔄 Processing: ${relativePath}`);
    
    const originalSize = getFileSize(imagePath);
    console.log(`   Original size: ${formatFileSize(originalSize)}`);
    
    // Generate optimized versions
    const optimizedVersions = await generateResponsiveImages(imagePath);
    
    if (optimizedVersions.length > 0) {
      const totalOptimizedSize = optimizedVersions.reduce((sum, img) => sum + img.size, 0);
      const savings = originalSize - totalOptimizedSize;
      const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
      
      results.push({
        original: relativePath,
        originalSize,
        optimized: optimizedVersions,
        totalOptimizedSize,
        savings,
        savingsPercent,
        formats: CONFIG.formats,
      });
      
      console.log(`   ✅ Optimized: ${formatFileSize(totalOptimizedSize)} (${savingsPercent}% savings)\n`);
    } else {
      console.log(`   ❌ Failed to optimize\n`);
    }
  }
  
  // Create manifest
  if (results.length > 0) {
    createImageManifest(results);
    
    // Summary
    const totalOriginalSize = results.reduce((sum, img) => sum + img.originalSize, 0);
    const totalOptimizedSize = results.reduce((sum, img) => sum + img.totalOptimizedSize, 0);
    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);
    
    console.log('\n📊 Optimization Summary:');
    console.log(`   Original size: ${formatFileSize(totalOriginalSize)}`);
    console.log(`   Optimized size: ${formatFileSize(totalOptimizedSize)}`);
    console.log(`   Total savings: ${formatFileSize(totalSavings)} (${totalSavingsPercent}%)`);
    console.log(`   Images processed: ${results.length}`);
    console.log(`   Formats generated: ${CONFIG.formats.join(', ')}`);
    console.log(`   Sizes generated: ${CONFIG.sizes.join(', ')}px`);
  }
  
  console.log('\n✅ Image optimization complete!');
}

// Check if sharp is installed
function checkSharp() {
  try {
    require('sharp');
    console.log('✅ Sharp is available for advanced image optimization');
    return true;
  } catch (error) {
    console.log('⚠️  Sharp not installed. Install with: npm install sharp');
    console.log('   Will use basic optimization methods');
    return false;
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Image Optimization Script for Heritage Farms

Usage: node scripts/optimize-images.js [options]

Options:
  --help, -h     Show this help message
  --check        Check if sharp is available
  --dry-run      Show what would be optimized without processing
  --quality N    Set quality (1-100, default: ${CONFIG.quality})
  --formats      Comma-separated list of formats (default: ${CONFIG.formats.join(',')})
  --sizes        Comma-separated list of sizes (default: ${CONFIG.sizes.join(',')})

Examples:
  node scripts/optimize-images.js
  node scripts/optimize-images.js --quality 90
  node scripts/optimize-images.js --formats webp,avif --sizes 640,1024,1920
    `);
    return;
  }
  
  if (args.includes('--check')) {
    checkSharp();
    return;
  }
  
  // Parse options
  const qualityIndex = args.indexOf('--quality');
  if (qualityIndex !== -1 && args[qualityIndex + 1]) {
    CONFIG.quality = parseInt(args[qualityIndex + 1]);
  }
  
  const formatsIndex = args.indexOf('--formats');
  if (formatsIndex !== -1 && args[formatsIndex + 1]) {
    CONFIG.formats = args[formatsIndex + 1].split(',');
  }
  
  const sizesIndex = args.indexOf('--sizes');
  if (sizesIndex !== -1 && args[sizesIndex + 1]) {
    CONFIG.sizes = args[sizesIndex + 1].split(',').map(s => parseInt(s));
  }
  
  if (args.includes('--dry-run')) {
    console.log('🔍 Dry run mode - showing what would be optimized:');
    const imageFiles = getImageFiles(CONFIG.sourceDir);
    console.log(`Found ${imageFiles.length} images to process`);
    console.log('Configuration:', CONFIG);
    return;
  }
  
  // Run optimization
  checkSharp();
  optimizeImages().catch(console.error);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  optimizeImages,
  generateResponsiveImages,
  optimizeImage,
  CONFIG,
};
