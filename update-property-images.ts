import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updatePropertyImages() {
  try {
    // Create image arrays
    const blueshieldImages = [
      "/images/properties/blueshield-towers/1.jpg",
      "/images/properties/blueshield-towers/2.jpg"
    ];
    
    const nbkImages = [
      "/images/properties/nbk/1.jpg",
      "/images/properties/nbk/2.jpg"
    ];

    // Update Blueshield Towers images
    const blueshieldUpdate = await db.update(properties)
      .set({
        images: blueshieldImages
      })
      .where(eq(properties.id, 7))
      .returning();

    console.log("Updated Blueshield Towers images:", blueshieldUpdate);

    // Update National Bank of Kenya images
    const nbkUpdate = await db.update(properties)
      .set({
        images: nbkImages
      })
      .where(eq(properties.id, 8))
      .returning();

    console.log("Updated National Bank of Kenya images:", nbkUpdate);

    console.log("Property images updated successfully!");
  } catch (error) {
    console.error("Error updating property images:", error);
  } finally {
    process.exit();
  }
}

updatePropertyImages();