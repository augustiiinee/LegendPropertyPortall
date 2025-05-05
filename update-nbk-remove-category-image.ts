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

    // Update to remove the commercial category image
    const updated = await db
      .update(properties)
      .set({
        images: [
          '/images/properties/nbk/nbk-1.jpg',
          '/images/properties/nbk/nbk-2.jpg'
        ],
      })
      .where(eq(properties.id, nbkProperty.id))
      .returning();

    console.log("Updated National Bank of Kenya images (removed category image):", updated);
  } catch (error) {
    console.error("Error updating National Bank of Kenya images:", error);
  }
}

// Run the update function
updateNBKImages().finally(() => {
  console.log("Update completed");
  process.exit(0);
});