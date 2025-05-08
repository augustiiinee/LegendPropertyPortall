import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateAgaKhanImage() {
  try {
    console.log("🏘️ Updating Aga Khan Estate property image...");
    
    // Find the Aga Khan Estate property by title
    const agaKhanEstate = await db.select()
      .from(properties)
      .where(eq(properties.title, "Aga Khan Estate - Premium Residential Units"))
      .limit(1);
    
    if (agaKhanEstate.length === 0) {
      console.log("❌ Aga Khan Estate property not found!");
      return;
    }

    const propertyId = agaKhanEstate[0].id;
    
    // Update the property with the new image
    const propertyImages = [
      "/images/properties/agakhan/exterior1.jpg"
    ];

    // Update the property
    const result = await db.update(properties)
      .set({ 
        images: propertyImages
      })
      .where(eq(properties.id, propertyId))
      .returning();
    
    console.log(`✅ Successfully updated Aga Khan Estate property image (ID: ${propertyId})`);
    console.log("Updated images:", result[0].images);

  } catch (error) {
    console.error("❌ Failed to update Aga Khan Estate property image:", error);
  } finally {
    process.exit(0);
  }
}

updateAgaKhanImage();
