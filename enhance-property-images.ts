import { db } from "./db";
import { properties } from "./shared/schema";
import fs from "fs";
import path from "path";
import sharp from "sharp";

async function enhancePropertyImages() {
  try {
    console.log("Starting image enhancement process...");
    
    // Get all properties from the database
    const allProperties = await db.select().from(properties);
    
    console.log(`Found ${allProperties.length} properties to process...`);
    
    // Initialize enhancement statistics
    let totalFiles = 0;
    let successfullyEnhanced = 0;
    
    // For each property, enhance its images
    for (const property of allProperties) {
      console.log(`\nProcessing property: ${property.title} (ID: ${property.id})`);
      
      // Skip if no images
      if (!property.images || property.images.length === 0) {
        console.log(`  No images found for this property. Skipping...`);
        continue;
      }
      
      console.log(`  Found ${property.images.length} images to enhance...`);
      
      // Process each image
      for (const imageUrl of property.images) {
        // Get the file path from the URL
        const filePath = path.join("./public", imageUrl);
        
        // Skip if file doesn't exist
        if (!fs.existsSync(filePath)) {
          console.log(`  Image not found: ${filePath}. Skipping...`);
          continue;
        }
        
        // Create backup of original file
        const backupPath = `${filePath}.backup`;
        fs.copyFileSync(filePath, backupPath);
        
        // Get file extension
        const fileExt = path.extname(filePath).toLowerCase();
        
        try {
          // Enhance the image with different settings based on file type
          if (fileExt === '.jpg' || fileExt === '.jpeg') {
            await sharp(filePath)
              .jpeg({ 
                quality: 85, 
                progressive: true,
                force: true
              })
              // Subtle contrast improvement
              .modulate({
                brightness: 1.05,
                saturation: 1.2
              })
              // Sharpen the image subtly
              .sharpen({
                sigma: 1,
                m1: 0.1,
                m2: 0.3,
                x1: 2,
                y2: 10,
                y3: 20
              })
              // Ensure image is not too large while preserving detail
              .resize({ 
                width: 1200, 
                height: 1600, 
                fit: 'inside', 
                withoutEnlargement: true 
              })
              .toFile(`${filePath}.enhanced`);
          } else if (fileExt === '.png') {
            await sharp(filePath)
              .png({ 
                quality: 85, 
                progressive: true,
                force: true
              })
              // Subtle contrast improvement
              .modulate({
                brightness: 1.05,
                saturation: 1.2
              })
              // Sharpen the image subtly
              .sharpen({
                sigma: 1,
                m1: 0.1,
                m2: 0.3,
                x1: 2,
                y2: 10,
                y3: 20
              })
              // Ensure image is not too large while preserving detail
              .resize({ 
                width: 1200, 
                height: 1600, 
                fit: 'inside', 
                withoutEnlargement: true 
              })
              .toFile(`${filePath}.enhanced`);
          } else {
            console.log(`  Unsupported file type: ${fileExt}. Skipping...`);
            continue;
          }
          
          // Replace original with enhanced version
          fs.unlinkSync(filePath);
          fs.renameSync(`${filePath}.enhanced`, filePath);
          fs.unlinkSync(backupPath); // Remove backup file
          
          console.log(`  Enhanced: ${path.basename(filePath)} - improved clarity and visual appeal`);
          successfullyEnhanced++;
          
          totalFiles++;
        } catch (error) {
          console.error(`  Error enhancing image ${filePath}:`, error);
          
          // Restore original if there was an error
          if (fs.existsSync(backupPath)) {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
            fs.renameSync(backupPath, filePath);
          }
        }
      }
    }
    
    // Print final statistics
    console.log("\n===== Enhancement Complete =====");
    console.log(`Total files processed: ${totalFiles}`);
    console.log(`Successfully enhanced: ${successfullyEnhanced}`);
    console.log(`Enhancement success rate: ${((successfullyEnhanced / totalFiles) * 100).toFixed(2)}%`);
    
  } catch (error) {
    console.error("Error enhancing property images:", error);
  } finally {
    process.exit();
  }
}

enhancePropertyImages();