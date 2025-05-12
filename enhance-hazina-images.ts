import { db } from "./db";
import { properties } from "./shared/schema";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { eq } from "drizzle-orm";

// Hazina Trade Centre property ID
const HAZINA_ID = 11;

async function enhanceHazinaImages() {
  try {
    console.log("Starting Hazina Trade Centre image enhancement process...");
    
    // Get Hazina property from the database
    const hazinaProperty = await db
      .select()
      .from(properties)
      .where(eq(properties.id, HAZINA_ID));
    
    if (!hazinaProperty || hazinaProperty.length === 0) {
      console.log("Hazina Trade Centre property not found. Exiting...");
      process.exit(1);
    }
    
    const property = hazinaProperty[0];
    console.log(`Found Hazina Trade Centre property: ${property.title} (ID: ${property.id})`);
    
    // Initialize enhancement statistics
    let totalFiles = 0;
    let successfullyEnhanced = 0;
    
    // Skip if no images
    if (!property.images || property.images.length === 0) {
      console.log(`No images found for this property. Exiting...`);
      process.exit(0);
    }
    
    console.log(`Found ${property.images.length} images to enhance...`);
    
    // Process each image
    for (const imageUrl of property.images) {
      // Get the file path from the URL
      const filePath = path.join("./public", imageUrl);
      
      // Skip if file doesn't exist
      if (!fs.existsSync(filePath)) {
        console.log(`Image not found: ${filePath}. Skipping...`);
        continue;
      }
      
      // Create backup of original file
      const backupPath = `${filePath}.backup`;
      fs.copyFileSync(filePath, backupPath);
      
      // Get file extension
      const fileExt = path.extname(filePath).toLowerCase();
      
      try {
        // Enhance the image
        if (fileExt === '.jpg' || fileExt === '.jpeg') {
          await sharp(filePath)
            .jpeg({ 
              quality: 90, // Higher quality for clearer images 
              progressive: true
            })
            // Enhance colors and clarity
            .modulate({
              brightness: 1.05, // Slight brightness boost
              saturation: 1.25, // Moderate saturation boost
              hue: 3 // Subtle hue shift for warmth
            })
            // Sharpen the image for better detail
            .sharpen({
              sigma: 1.2,
              flat: 0.8,
              jagged: 0.8
            })
            // Apply mild noise reduction
            .median(1)
            // Resize if needed while preserving quality
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
              quality: 90, 
              progressive: true
            })
            // Enhance colors and clarity
            .modulate({
              brightness: 1.05,
              saturation: 1.25,
              hue: 3
            })
            // Sharpen the image for better detail
            .sharpen({
              sigma: 1.2,
              flat: 0.8,
              jagged: 0.8
            })
            // Apply mild noise reduction
            .median(1)
            // Resize if needed while preserving quality
            .resize({ 
              width: 1200, 
              height: 1600, 
              fit: 'inside', 
              withoutEnlargement: true 
            })
            .toFile(`${filePath}.enhanced`);
        } else {
          console.log(`Unsupported file type: ${fileExt}. Skipping...`);
          continue;
        }
        
        // Replace original with enhanced version
        fs.unlinkSync(filePath);
        fs.renameSync(`${filePath}.enhanced`, filePath);
        fs.unlinkSync(backupPath); // Remove backup file
        
        console.log(`Enhanced: ${path.basename(filePath)} - improved clarity and visual appeal`);
        successfullyEnhanced++;
        
        totalFiles++;
      } catch (error) {
        console.error(`Error enhancing image ${filePath}:`, error);
        
        // Restore original if there was an error
        if (fs.existsSync(backupPath)) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          fs.renameSync(backupPath, filePath);
        }
      }
    }
    
    // Print final statistics
    console.log("\n===== Enhancement Complete =====");
    console.log(`Total files processed: ${totalFiles}`);
    console.log(`Successfully enhanced: ${successfullyEnhanced}`);
    console.log(`Enhancement success rate: ${((successfullyEnhanced / totalFiles) * 100).toFixed(2)}%`);
    
  } catch (error) {
    console.error("Error enhancing Hazina Trade Centre images:", error);
  } finally {
    process.exit();
  }
}

enhanceHazinaImages();