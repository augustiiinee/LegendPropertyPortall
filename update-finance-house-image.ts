import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateFinanceHouseImage() {
  try {
    // Create the array of images
    const propertyImages = [
      "/images/properties/finance-house/exterior1.jpg",
      "/images/properties/finance-house/interior1.jpg",
      "/images/properties/finance-house/office-space.jpg",
      "/images/properties/finance-house/reception.jpg"
    ];

    // Update Finance House images
    const financeHouseUpdate = await db.update(properties)
      .set({
        images: propertyImages
      })
      .where(eq(properties.id, 5))
      .returning();

    console.log("Updated Finance House images:", financeHouseUpdate);
    console.log("Finance House images updated successfully!");
  } catch (error) {
    console.error("Error updating Finance House images:", error);
  } finally {
    process.exit();
  }
}

updateFinanceHouseImage();