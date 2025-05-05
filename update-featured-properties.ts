import { db } from "./db";
import { properties } from "./shared/schema";

async function markFeaturedProperties() {
  try {
    // Mark all properties as featured
    const updatedProperties = await db.update(properties)
      .set({
        featured: true
      })
      .returning();

    console.log("Successfully marked all properties as featured:", updatedProperties.length);
    console.log("Featured property IDs:", updatedProperties.map(p => p.id).join(", "));
  } catch (error) {
    console.error("Error updating featured properties:", error);
  } finally {
    process.exit();
  }
}

markFeaturedProperties();