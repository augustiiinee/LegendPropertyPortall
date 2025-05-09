import { db } from "./db";
import { properties } from "./shared/schema";
import fs from "fs";
import path from "path";
import { eq } from "drizzle-orm";

// Hazina Trade Centre property ID
const HAZINA_ID = 11;

async function updateHazinaImages() {
  try {
    // Create directories if they don't exist
    const publicDir = "./public";
    const imagesDir = path.join(publicDir, "images");
    const propertiesDir = path.join(imagesDir, "properties");
    const hazinaDir = path.join(propertiesDir, "hazina");
    
    [publicDir, imagesDir, propertiesDir, hazinaDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Source images from the attached_assets folder
    const sourceImages = [
      "1.jpeg",
      "2.jpeg",
      "3.jpeg",
      "WhatsApp Image 2025-05-09 at 09.52.03 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 09.52.03 (2).jpeg",
      "WhatsApp Image 2025-05-09 at 09.52.03.jpeg",
      "WhatsApp Image 2025-05-09 at 09.52.04 (1).jpeg",
      "WhatsApp Image 2025-05-09 at 09.52.04.jpeg",
      "WhatsApp Image 2025-05-09 at 09.52.05.jpeg"
    ];

    // Target image names
    const targetImages = [
      "hazina-1.jpeg",
      "hazina-2.jpeg",
      "hazina-3.jpeg",
      "hazina-4.jpeg",
      "hazina-5.jpeg",
      "hazina-6.jpeg",
      "hazina-7.jpeg",
      "hazina-8.jpeg",
      "hazina-9.jpeg"
    ];

    // Delete existing images in the hazina directory
    if (fs.existsSync(hazinaDir)) {
      const existingFiles = fs.readdirSync(hazinaDir);
      for (const file of existingFiles) {
        fs.unlinkSync(path.join(hazinaDir, file));
        console.log(`Deleted existing file: ${path.join(hazinaDir, file)}`);
      }
    }

    // Copy each image
    sourceImages.forEach((sourceImage, index) => {
      const sourcePath = path.join("./attached_assets", sourceImage);
      const targetPath = path.join(hazinaDir, targetImages[index]);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
      } else {
        console.error(`Source image not found: ${sourcePath}`);
      }
    });

    // Update property in database with new image paths
    const imageUrls = targetImages.map(img => `/images/properties/hazina/${img}`);
    
    const updatedProperty = await db
      .update(properties)
      .set({ images: imageUrls })
      .where(eq(properties.id, HAZINA_ID))
      .returning();
    
    console.log("Updated Hazina Trade Centre property with new images:", updatedProperty);
    
  } catch (error) {
    console.error("Error updating Hazina Trade Centre images:", error);
  } finally {
    process.exit();
  }
}

updateHazinaImages();