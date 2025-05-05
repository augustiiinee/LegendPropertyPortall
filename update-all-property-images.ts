import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateAllPropertyImages() {
  try {
    // Blueshield Towers images
    const blueshieldImages = [
      "/images/properties/blueshield-towers/exterior1.jpg",
      "/images/properties/blueshield-towers/interior1.jpg",
      "/images/properties/blueshield-towers/1.jpg",
      "/images/properties/blueshield-towers/2.jpg"
    ];
    
    // NBK images
    const nbkImages = [
      "/images/properties/nbk/exterior1.jpg",
      "/images/properties/nbk/interior1.jpg",
      "/images/properties/nbk/1.jpg",
      "/images/properties/nbk/2.jpg"
    ];
    
    // Finance House images
    const financeHouseImages = [
      "/images/properties/finance-house/exterior1.jpg",
      "/images/properties/finance-house/interior1.jpg",
      "/images/properties/finance-house/office-space.jpg",
      "/images/properties/finance-house/reception.jpg"
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
    
    // Update Finance House images
    const financeHouseUpdate = await db.update(properties)
      .set({
        images: financeHouseImages
      })
      .where(eq(properties.id, 5))
      .returning();

    console.log("Updated Finance House images:", financeHouseUpdate);

    console.log("All property images updated successfully!");
  } catch (error) {
    console.error("Error updating property images:", error);
  } finally {
    process.exit();
  }
}

updateAllPropertyImages();