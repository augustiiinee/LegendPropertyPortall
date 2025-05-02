import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function markFeaturedProperties() {
  try {
    console.log("Starting to mark properties as featured...");
    
    // Get properties to mark as featured (for example, first 3 properties)
    const allProperties = await db.select().from(properties).limit(3);
    
    if (allProperties.length === 0) {
      console.log("No properties found to update.");
      return;
    }
    
    console.log(`Found ${allProperties.length} properties to mark as featured:`);
    for (const property of allProperties) {
      console.log(`- ID: ${property.id}, Title: ${property.title}`);
      
      // Update the property to mark it as featured
      await db.update(properties)
        .set({ featured: true })
        .where(eq(properties.id, property.id));
      
      console.log(`  ✓ Property ID ${property.id} marked as featured`);
    }
    
    console.log("Successfully marked properties as featured!");
  } catch (error) {
    console.error("Error marking properties as featured:", error);
  } finally {
    process.exit(0);
  }
}

markFeaturedProperties();