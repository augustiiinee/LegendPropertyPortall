import { db } from "./db";
import { properties } from "./shared/schema";
import { eq, and, not } from "drizzle-orm";

async function deleteOtherProperties() {
  try {
    console.log("Finding Chuna Estate property...");
    
    // Get the Chuna Estate property first to confirm it exists
    const chunaProperty = await db.select()
      .from(properties)
      .where(eq(properties.title, "Prime Residential Maisonette - Chuna Estate"))
      .limit(1);
    
    if (chunaProperty.length === 0) {
      console.log("❌ Chuna Estate property not found!");
      return;
    }
    
    console.log("✅ Found Chuna Estate property with ID:", chunaProperty[0].id);
    
    // Delete all other properties
    console.log("Deleting other properties...");
    const deleteResult = await db.delete(properties)
      .where(not(eq(properties.id, chunaProperty[0].id)))
      .returning({ id: properties.id, title: properties.title });
    
    if (deleteResult.length > 0) {
      console.log(`✅ Deleted ${deleteResult.length} other properties:`);
      deleteResult.forEach(prop => {
        console.log(`- ID ${prop.id}: ${prop.title}`);
      });
    } else {
      console.log("No other properties to delete");
    }
    
    console.log("Operation completed successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

deleteOtherProperties();