import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateMakandeImages() {
  try {
    console.log("🏘️ Updating Makande Estate property images...");
    
    // Find the Makande Estate property by title
    const makandeEstate = await db.select()
      .from(properties)
      .where(eq(properties.title, "Makande Estate - Residential Apartments"))
      .limit(1);
    
    if (makandeEstate.length === 0) {
      console.log("❌ Makande Estate property not found!");
      return;
    }

    const propertyId = makandeEstate[0].id;
    
    // Update the property with the new images
    const propertyImages = [
      "/images/properties/makande/exterior1.jpg",
      "/images/properties/makande/exterior2.jpg"
    ];

    // Update the property
    const result = await db.update(properties)
      .set({ 
        images: propertyImages
      })
      .where(eq(properties.id, propertyId))
      .returning();
    
    console.log(`✅ Successfully updated Makande Estate property images (ID: ${propertyId})`);
    console.log("Updated images:", result[0].images);

  } catch (error) {
    console.error("❌ Failed to update Makande Estate property images:", error);
  } finally {
    process.exit(0);
  }
}

updateMakandeImages();
