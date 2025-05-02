import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateChunaEstate() {
  try {
    console.log("Updating Chuna Estate property images...");
    
    // Update the property with all new images
    const result = await db.update(properties)
      .set({
        images: [
          "/images/properties/chuna-estate/exterior1.jpg",
          "/images/properties/chuna-estate/exterior2.jpg",
          "/images/properties/chuna-estate/living-room.jpg",
          "/images/properties/chuna-estate/dining.jpg",
          "/images/properties/chuna-estate/kitchen.jpg",
          "/images/properties/chuna-estate/garden.jpg",
          "/images/properties/chuna-estate/backyard.jpg",
          "/images/properties/chuna-estate/dsq.jpg"
        ]
      })
      .where(eq(properties.title, "Prime Residential Maisonette - Chuna Estate"))
      .returning();
    
    if (result.length > 0) {
      console.log("✅ Chuna Estate property updated successfully!");
      console.log("Updated property:", result[0]);
    } else {
      console.log("❌ Property not found");
    }
  } catch (error) {
    console.error("Error updating property:", error);
  }
}

updateChunaEstate();