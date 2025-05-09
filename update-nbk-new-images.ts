import { db } from "./db";
import { properties } from "./shared/schema";
import fs from "fs";
import path from "path";
import { eq } from "drizzle-orm";

// National Bank property ID
const NBK_ID = 8;

async function updateNBKImages() {
  try {
    // Create directories if they don't exist
    const publicDir = "./public";
    const imagesDir = path.join(publicDir, "images");
    const propertiesDir = path.join(imagesDir, "properties");
    const nbkDir = path.join(propertiesDir, "nbk");
    
    [publicDir, imagesDir, propertiesDir, nbkDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Source images from the attached_assets folder
    const sourceImages = [
      "WhatsApp Image 2025-05-09 at 09.26.29 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 09.26.29 (2).jpeg",
      "WhatsApp Image 2025-05-09 at 09.26.29 (3).jpeg",
      "WhatsApp Image 2025-05-09 at 09.26.29 (4).jpeg",
      "WhatsApp Image 2025-05-09 at 09.26.29 (5).jpeg",
      "WhatsApp Image 2025-05-09 at 09.26.29 (6).jpeg",
      "WhatsApp Image 2025-05-09 at 09.26.29.jpeg",
      "WhatsApp Image 2025-05-09 at 09.26.30.jpeg"
    ];

    // Target image names
    const targetImages = [
      "nbk-1.jpeg",
      "nbk-2.jpeg",
      "nbk-3.jpeg",
      "nbk-4.jpeg",
      "nbk-5.jpeg",
      "nbk-6.jpeg",
      "nbk-7.jpeg",
      "nbk-8.jpeg"
    ];

    // Delete existing images in the nbk directory
    if (fs.existsSync(nbkDir)) {
      const existingFiles = fs.readdirSync(nbkDir);
      for (const file of existingFiles) {
        fs.unlinkSync(path.join(nbkDir, file));
        console.log(`Deleted existing file: ${path.join(nbkDir, file)}`);
      }
    }

    // Copy each image
    sourceImages.forEach((sourceImage, index) => {
      const sourcePath = path.join("./attached_assets", sourceImage);
      const targetPath = path.join(nbkDir, targetImages[index]);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
      } else {
        console.error(`Source image not found: ${sourcePath}`);
      }
    });

    // Update property in database with new image paths
    const imageUrls = targetImages.map(img => `/images/properties/nbk/${img}`);
    
    const updatedProperty = await db
      .update(properties)
      .set({ images: imageUrls })
      .where(eq(properties.id, NBK_ID))
      .returning();
    
    console.log("Updated National Bank property with new images:", updatedProperty);
    
  } catch (error) {
    console.error("Error updating National Bank images:", error);
  } finally {
    process.exit();
  }
}

updateNBKImages();