import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateHazinaPrice() {
  try {
    console.log("🏢 Updating Hazina Trade Centre property price...");
    
    // Find the Hazina property by title
    const hazinaProperty = await db.select()
      .from(properties)
      .where(eq(properties.title, "Hazina Trade Centre - Premium Office Space"))
      .limit(1);
    
    if (hazinaProperty.length === 0) {
      console.log("❌ Hazina Trade Centre property not found!");
      return;
    }

    const propertyId = hazinaProperty[0].id;
    
    // Set price to 0 to hide it from display
    const result = await db.update(properties)
      .set({ 
        price: 0
      })
      .where(eq(properties.id, propertyId))
      .returning();
    
    console.log(`✅ Successfully updated Hazina Trade Centre property price (ID: ${propertyId})`);

  } catch (error) {
    console.error("❌ Failed to update Hazina Trade Centre property price:", error);
  } finally {
    process.exit(0);
  }
}

updateHazinaPrice();