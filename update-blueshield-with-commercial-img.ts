import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateBlueshieldImages() {
  try {
    // Get the Blueshield property
    const blueshieldProperty = await db.query.properties.findFirst({
      where: eq(properties.title, 'Blueshield Towers - Prime Commercial Office Space'),
    });

    if (!blueshieldProperty) {
      console.log("Blueshield Towers property not found");
      return;
    }

    console.log("Found Blueshield Towers:", blueshieldProperty.id);

    // Update with commercial category image
    const commercialCategoryImage = '/images/categories/commercial-bg.jpg';
    
    // Create a new images array with the commercial image first
    const currentImages = blueshieldProperty.images || [];
    const updatedImages = [
      commercialCategoryImage,
      ...currentImages.filter(img => img !== commercialCategoryImage)
    ];

    // Update the property
    const updated = await db
      .update(properties)
      .set({
        images: updatedImages,
      })
      .where(eq(properties.id, blueshieldProperty.id))
      .returning();

    console.log("Updated Blueshield Towers with commercial category image:", updated);
  } catch (error) {
    console.error("Error updating Blueshield Towers images:", error);
  }
}

// Run the update function
updateBlueshieldImages().finally(() => {
  console.log("Update completed");
  process.exit(0);
});