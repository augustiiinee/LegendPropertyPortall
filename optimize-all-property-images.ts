import { db } from "./db";
import { properties } from "./shared/schema";
import fs from "fs";
import path from "path";
import sharp from "sharp";

async function optimizeAllPropertyImages() {
  try {
    console.log("Starting image optimization process...");
    
    // Get all properties from the database
    const allProperties = await db.select().from(properties);
    
    console.log(`Found ${allProperties.length} properties to process...`);
    
    // Initialize optimization statistics
    let totalFiles = 0;
    let totalSizeBefore = 0;
    let totalSizeAfter = 0;
    
    // For each property, optimize its images
    for (const property of allProperties) {
      console.log(`\nProcessing property: ${property.title} (ID: ${property.id})`);
      
      // Skip if no images
      if (!property.images || property.images.length === 0) {
        console.log(`  No images found for this property. Skipping...`);
        continue;
      }
      
      console.log(`  Found ${property.images.length} images to optimize...`);
      
      // Process each image
      for (const imageUrl of property.images) {
        // Get the file path from the URL
        const filePath = path.join("./public", imageUrl);
        
        // Skip if file doesn't exist
        if (!fs.existsSync(filePath)) {
          console.log(`  Image not found: ${filePath}. Skipping...`);
          continue;
        }
        
        // Get original file size
        const statsBeforeOptimization = fs.statSync(filePath);
        const originalSize = statsBeforeOptimization.size;
        totalSizeBefore += originalSize;
        
        // Create backup of original file
        const backupPath = `${filePath}.backup`;
        fs.copyFileSync(filePath, backupPath);
        
        // Get file extension
        const fileExt = path.extname(filePath).toLowerCase();
        
        try {
          // Optimize the image with different settings based on file type
          if (fileExt === '.jpg' || fileExt === '.jpeg') {
            await sharp(filePath)
              .jpeg({ quality: 80, progressive: true })
              .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
              .toFile(`${filePath}.optimized`);
          } else if (fileExt === '.png') {
            await sharp(filePath)
              .png({ quality: 80, progressive: true })
              .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
              .toFile(`${filePath}.optimized`);
          } else {
            console.log(`  Unsupported file type: ${fileExt}. Skipping...`);
            continue;
          }
          
          // Replace original with optimized version
          fs.unlinkSync(filePath);
          fs.renameSync(`${filePath}.optimized`, filePath);
          
          // Get new file size
          const statsAfterOptimization = fs.statSync(filePath);
          const optimizedSize = statsAfterOptimization.size;
          totalSizeAfter += optimizedSize;
          
          // Delete backup if optimization was successful and resulted in smaller file
          if (optimizedSize < originalSize) {
            fs.unlinkSync(backupPath);
            console.log(`  Optimized: ${path.basename(filePath)} - ${(originalSize / 1024).toFixed(2)}KB → ${(optimizedSize / 1024).toFixed(2)}KB (${((1 - optimizedSize / originalSize) * 100).toFixed(2)}% reduction)`);
          } else {
            // If optimized file is larger, restore original
            fs.unlinkSync(filePath);
            fs.renameSync(backupPath, filePath);
            totalSizeAfter += originalSize;
            console.log(`  Skipped optimization: ${path.basename(filePath)} - optimization would have increased file size`);
          }
          
          totalFiles++;
        } catch (error) {
          console.error(`  Error optimizing image ${filePath}:`, error);
          
          // Restore original if there was an error
          if (fs.existsSync(backupPath)) {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
            fs.renameSync(backupPath, filePath);
            totalSizeAfter += originalSize;
          }
        }
      }
    }
    
    // Print final statistics
    console.log("\n===== Optimization Complete =====");
    console.log(`Total files processed: ${totalFiles}`);
    console.log(`Total size before: ${(totalSizeBefore / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Total size after: ${(totalSizeAfter / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Total reduction: ${((1 - totalSizeAfter / totalSizeBefore) * 100).toFixed(2)}%`);
    
  } catch (error) {
    console.error("Error optimizing property images:", error);
  } finally {
    process.exit();
  }
}

optimizeAllPropertyImages();