import { db } from "./db";
import { properties } from "./shared/schema";
import fs from "fs";
import path from "path";
import { eq } from "drizzle-orm";

// Finance House property ID
const FINANCE_HOUSE_ID = 5;

async function updateFinanceHouseImages() {
  try {
    // Create directories if they don't exist
    const publicDir = "./public";
    const imagesDir = path.join(publicDir, "images");
    const propertiesDir = path.join(imagesDir, "properties");
    const financeDir = path.join(propertiesDir, "finance-house");
    
    [publicDir, imagesDir, propertiesDir, financeDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Source images from the attached_assets folder
    const sourceImages = [
      "WhatsApp Image 2025-05-09 at 07.11.59 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 07.11.59 (2).jpeg",
      "WhatsApp Image 2025-05-09 at 08.32.25 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 08.32.25 (2).jpeg",
      "WhatsApp Image 2025-05-09 at 08.32.25 (3).jpeg",
      "WhatsApp Image 2025-05-09 at 08.32.25.jpeg",
      "WhatsApp Image 2025-05-09 at 08.32.26 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 08.32.26 (2).jpeg"
    ];

    // Target image names
    const targetImages = [
      "finance-house-1.jpeg",
      "finance-house-2.jpeg",
      "finance-house-3.jpeg",
      "finance-house-4.jpeg",
      "finance-house-5.jpeg",
      "finance-house-6.jpeg",
      "finance-house-7.jpeg",
      "finance-house-8.jpeg"
    ];

    // Delete existing images in the finance-house directory
    if (fs.existsSync(financeDir)) {
      const existingFiles = fs.readdirSync(financeDir);
      for (const file of existingFiles) {
        fs.unlinkSync(path.join(financeDir, file));
        console.log(`Deleted existing file: ${path.join(financeDir, file)}`);
      }
    }

    // Copy each image
    sourceImages.forEach((sourceImage, index) => {
      const sourcePath = path.join("./attached_assets", sourceImage);
      const targetPath = path.join(financeDir, targetImages[index]);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
      } else {
        console.error(`Source image not found: ${sourcePath}`);
      }
    });

    // Update property in database with new image paths
    const imageUrls = targetImages.map(img => `/images/properties/finance-house/${img}`);
    
    const updatedProperty = await db
      .update(properties)
      .set({ images: imageUrls })
      .where(eq(properties.id, FINANCE_HOUSE_ID))
      .returning();
    
    console.log("Updated Finance House property with new images:", updatedProperty);
    
  } catch (error) {
    console.error("Error updating Finance House images:", error);
  } finally {
    process.exit();
  }
}

updateFinanceHouseImages();