import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateHazinaFeatured() {
  try {
    console.log("🏢 Updating Hazina Towers to featured properties...");
    
    // Find the Hazina Towers property by title
    const hazinaTowers = await db.select()
      .from(properties)
      .where(eq(properties.title, "Hazina Towers - Premium Office Space"))
      .limit(1);
    
    if (hazinaTowers.length === 0) {
      console.log("❌ Hazina Towers property not found!");
      return;
    }

    const propertyId = hazinaTowers[0].id;
    
    // Update the property
    const result = await db.update(properties)
      .set({ 
        featured: true
      })
      .where(eq(properties.id, propertyId))
      .returning();
    
    console.log(`✅ Successfully updated Hazina Towers to featured (ID: ${propertyId})`);

  } catch (error) {
    console.error("❌ Failed to update Hazina Towers property:", error);
  } finally {
    process.exit(0);
  }
}

updateHazinaFeatured();