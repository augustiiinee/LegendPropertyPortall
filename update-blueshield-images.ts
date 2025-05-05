import { db } from "./db";
import { properties } from "./shared/schema";
import fs from "fs";
import path from "path";
import { eq } from "drizzle-orm";

// Blueshield Towers property ID
const BLUESHIELD_ID = 7;

async function updateBlueshieldImages() {
  try {
    // Create directories if they don't exist
    const publicDir = "./public";
    const imagesDir = path.join(publicDir, "images");
    const propertiesDir = path.join(imagesDir, "properties");
    const blueshieldDir = path.join(propertiesDir, "blueshield");
    
    [publicDir, imagesDir, propertiesDir, blueshieldDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Copy images from attached_assets to public/images/properties/blueshield
    const sourceImages = [
      "blueshield 1.jpg",
      "blueshileld 2.jpg",
      "blueshileld 3.jpg",
      "blueshileld 4.jpg"
    ];

    const targetImages = [
      "blueshield-towers-1.jpg",
      "blueshield-towers-2.jpg",
      "blueshield-towers-3.jpg",
      "blueshield-towers-4.jpg"
    ];

    // Copy each image
    sourceImages.forEach((sourceImage, index) => {
      const sourcePath = path.join("./attached_assets", sourceImage);
      const targetPath = path.join(blueshieldDir, targetImages[index]);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
      } else {
        console.error(`Source image not found: ${sourcePath}`);
      }
    });

    // Update property in database with new image paths
    const imageUrls = targetImages.map(img => `/images/properties/blueshield/${img}`);
    
    const updatedProperty = await db
      .update(properties)
      .set({
        images: imageUrls
      })
      .where(eq(properties.id, BLUESHIELD_ID))
      .returning();
    
    console.log("Updated Blueshield Towers property with new images:", updatedProperty);
    
  } catch (error) {
    console.error("Error updating Blueshield Towers images:", error);
  } finally {
    process.exit();
  }
}

updateBlueshieldImages();