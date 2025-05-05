import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateNBKImages() {
  try {
    // Get the National Bank of Kenya property
    const nbkProperty = await db.query.properties.findFirst({
      where: eq(properties.title, 'National Bank of Kenya - Prime Commercial Office Space'),
    });

    if (!nbkProperty) {
      console.log("National Bank of Kenya property not found");
      return;
    }

    console.log("Found National Bank of Kenya:", nbkProperty.id);

    // Update with the new images
    const updated = await db
      .update(properties)
      .set({
        images: [
          '/images/categories/commercial-bg.jpg', // Category image first
          '/images/properties/nbk/nbk-1.jpg',     // New image 1
          '/images/properties/nbk/nbk-2.jpg'      // New image 2
        ],
      })
      .where(eq(properties.id, nbkProperty.id))
      .returning();

    console.log("Updated National Bank of Kenya images:", updated);
  } catch (error) {
    console.error("Error updating National Bank of Kenya images:", error);
  }
}

// Run the update function
updateNBKImages().finally(() => {
  console.log("Update completed");
  process.exit(0);
});