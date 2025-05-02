import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updatePropertyStatus() {
  try {
    console.log("Updating property status...");
    
    // Update the Chuna Estate property to use new status format
    const result = await db.update(properties)
      .set({
        status: "For Sale",
      })
      .where(eq(properties.title, "Prime Residential Maisonette - Chuna Estate"))
      .returning();
    
    if (result.length > 0) {
      console.log("✅ Property status updated successfully for:", result[0].title);
    } else {
      console.log("❌ Property not found");
    }
  } catch (error) {
    console.error("Error updating property status:", error);
  }
}

updatePropertyStatus();