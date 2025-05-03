import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateFinanceHouse() {
  try {
    console.log("🏢 Updating Finance House commercial property...");

    // Find the Finance House property by title
    const financeHouse = await db.select()
      .from(properties)
      .where(eq(properties.title, "Finance House - Prime Commercial Space"))
      .limit(1);
    
    if (financeHouse.length === 0) {
      console.log("❌ Finance House property not found!");
      return;
    }

    const propertyId = financeHouse[0].id;
    
    const updatedDesc = "Finance House offers an unmatched commercial space opportunity in the heart of CBD, neighboring the prestigious Barclay Plaza and the Rand Regency Hotel. This location provides businesses with easy access to major commercial and financial hubs.\n\nBuilding Highlights:\n• High Occupancy Rate: A trusted business choice due to its prime location.\n• 100% Power Backup: Continuous operations with full backup power.\n• Reliable Water Supply: Underground and overhead tanks, plus a borehole for uninterrupted water supply.\n• 24/7 Security: CCTV surveillance in common areas manned by a professional security agency.\n\nAdditional Features:\nSecure your spot in this well-located commercial hub, ideal for businesses looking to thrive in the CBD. Please feel free to contact us today for viewing and lease details at sales@propertylegend.com";

    // Update the property
    await db.update(properties)
      .set({ 
        description: updatedDesc
      })
      .where(eq(properties.id, propertyId));
    
    console.log(`✅ Successfully updated Finance House property (ID: ${propertyId})`);

  } catch (error) {
    console.error("❌ Failed to update Finance House property:", error);
  } finally {
    process.exit(0);
  }
}

updateFinanceHouse();