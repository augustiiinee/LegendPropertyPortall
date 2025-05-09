import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateUtaliiImages() {
  try {
    console.log("🏢 Updating Utalii House images...");
    
    // Find the Utalii House property by title
    const utaliiProperty = await db.select()
      .from(properties)
      .where(eq(properties.title, "Utalii House"))
      .limit(1);
    
    if (utaliiProperty.length === 0) {
      console.log("❌ Utalii House property not found!");
      return;
    }

    const propertyId = utaliiProperty[0].id;
    
    // Update with new images
    const imageList = [
      "/images/properties/utalii/utalii1.jpeg",
      "/images/properties/utalii/utalii2.jpeg",
      "/images/properties/utalii/utalii3.jpeg",
      "/images/properties/utalii/utalii4.jpeg",
      "/images/properties/utalii/utalii5.jpeg",
      "/images/properties/utalii/utalii6.jpeg",
      "/images/properties/utalii/utalii7.jpeg",
      "/images/properties/utalii/utalii8.jpeg"
    ];
    
    const result = await db.update(properties)
      .set({ 
        images: imageList
      })
      .where(eq(properties.id, propertyId))
      .returning();
    
    console.log(`✅ Successfully updated Utalii House property images (ID: ${propertyId})`);
    console.log(`  Added ${imageList.length} images to the property.`);

  } catch (error) {
    console.error("❌ Failed to update Utalii House property images:", error);
  } finally {
    process.exit(0);
  }
}

updateUtaliiImages();