import { db } from "./db";
import { properties } from "./shared/schema";
import fs from "fs";
import path from "path";
import { eq } from "drizzle-orm";

// Uchumi House property ID
const UCHUMI_ID = 10;

async function updateUchumiHouseImages() {
  try {
    // Create directories if they don't exist
    const publicDir = "./public";
    const imagesDir = path.join(publicDir, "images");
    const propertiesDir = path.join(imagesDir, "properties");
    const uchumiDir = path.join(propertiesDir, "uchumi");
    
    [publicDir, imagesDir, propertiesDir, uchumiDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Source images from the attached_assets folder
    const sourceImages = [
      "WhatsApp Image 2025-05-09 at 09.49.22 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.22 (2).jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.22.jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.23 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.23.jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.24.jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.25 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.25.jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.26 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.26.jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.27 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 09.49.27.jpeg"
    ];

    // Target image names
    const targetImages = [
      "uchumi-1.jpeg",
      "uchumi-2.jpeg",
      "uchumi-3.jpeg",
      "uchumi-4.jpeg", 
      "uchumi-5.jpeg",
      "uchumi-6.jpeg",
      "uchumi-7.jpeg",
      "uchumi-8.jpeg",
      "uchumi-9.jpeg",
      "uchumi-10.jpeg",
      "uchumi-11.jpeg",
      "uchumi-12.jpeg"
    ];

    // Delete existing images in the uchumi directory
    const existingFiles = fs.readdirSync(uchumiDir);
    for (const file of existingFiles) {
      fs.unlinkSync(path.join(uchumiDir, file));
      console.log(`Deleted existing file: ${path.join(uchumiDir, file)}`);
    }

    // Copy each image
    sourceImages.forEach((sourceImage, index) => {
      const sourcePath = path.join("./attached_assets", sourceImage);
      const targetPath = path.join(uchumiDir, targetImages[index]);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
      } else {
        console.error(`Source image not found: ${sourcePath}`);
      }
    });

    // Update property in database with new image paths
    const imageUrls = targetImages.map(img => `/images/properties/uchumi/${img}`);
    
    const updatedProperty = await db
      .update(properties)
      .set({ images: imageUrls })
      .where(eq(properties.id, UCHUMI_ID))
      .returning();
    
    console.log("Updated Uchumi House property with new images:", updatedProperty);
    
  } catch (error) {
    console.error("Error updating Uchumi House images:", error);
  } finally {
    process.exit();
  }
}

updateUchumiHouseImages();