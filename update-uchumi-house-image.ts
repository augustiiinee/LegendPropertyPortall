import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateUchumiHouseImage() {
  try {
    console.log("🏢 Updating Uchumi House property images...");
    
    // Find the Uchumi House property by title
    const uchumiHouse = await db.select()
      .from(properties)
      .where(eq(properties.title, "Uchumi House - Prime Commercial Space"))
      .limit(1);
    
    if (uchumiHouse.length === 0) {
      console.log("❌ Uchumi House property not found!");
      return;
    }

    const propertyId = uchumiHouse[0].id;
    
    // Create the array of images with the new main image first
    const propertyImages = [
      "/images/properties/uchumi/main.jpg", // New image from the uploaded file
      ...(uchumiHouse[0].images || []).filter(img => !img.includes("main.jpg"))
    ];

    // Update the property
    const result = await db.update(properties)
      .set({ 
        images: propertyImages
      })
      .where(eq(properties.id, propertyId))
      .returning();
    
    console.log(`✅ Successfully updated Uchumi House property images (ID: ${propertyId})`);
    console.log("Updated images:", result[0].images);

  } catch (error) {
    console.error("❌ Failed to update Uchumi House property images:", error);
  } finally {
    process.exit(0);
  }
}

updateUchumiHouseImage();