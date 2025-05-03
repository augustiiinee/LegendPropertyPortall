import { db } from "./db";
import { properties, PropertyStatus, PropertyType } from "@shared/schema";
import { eq, and } from "drizzle-orm";

async function addFinanceHouse() {
  try {
    console.log("🏢 Adding Finance House commercial property...");

    const financeHouseProperty = {
      title: "Finance House - Prime Commercial Space",
      description: "Finance House offers an unmatched commercial space opportunity in the heart of CBD, neighboring the prestigious Barclay Plaza and the Rand Regency Hotel. This location provides businesses with easy access to major commercial and financial hubs.\n\nBuilding Highlights:\n• High Occupancy Rate: A trusted business choice due to its prime location.\n• 100% Power Backup: Continuous operations with full backup power.\n• Reliable Water Supply: Underground and overhead tanks, plus a borehole for uninterrupted water supply.\n• 24/7 Security: CCTV surveillance in common areas manned by a professional security agency.\n\nAdditional Features:\nSecure your spot in this well-located commercial hub, ideal for businesses looking to thrive in the CBD. Please feel free to contact us today for viewing and lease details at sales@propertylegend.com",
      price: 180000, // Monthly rent in KES
      location: "Finance House, Loita Street, Nairobi CBD",
      type: "commercial" as PropertyType,
      status: "For Lease" as PropertyStatus,
      size: 3200, // size in sqft
      bedrooms: null,
      bathrooms: 2,
      offices: 4,
      parking: 3,
      features: [
        "Prime CBD Location", 
        "24/7 Security", 
        "100% Power Backup", 
        "Reliable Water Supply",
        "CCTV Surveillance",
        "High Occupancy Rate",
        "Proximity to Financial Hubs",
        "Underground Water Tanks"
      ],
      images: [
        "/images/properties/finance-house/exterior1.jpg",
        "/images/properties/finance-house/interior1.jpg",
        "/images/properties/finance-house/office-space.jpg",
        "/images/properties/finance-house/reception.jpg"
      ],
      featured: true
    };

    // Check if property already exists by title and location
    const existingProperty = await db.select()
      .from(properties)
      .where(and(
        eq(properties.title, financeHouseProperty.title),
        eq(properties.location, financeHouseProperty.location)
      ))
      .limit(1);
    
    if (existingProperty.length === 0) {
      const [newProperty] = await db.insert(properties)
        .values(financeHouseProperty)
        .returning();
      console.log(`✅ Property created: ${newProperty.title}`);
    } else {
      console.log(`ℹ️ Property already exists: ${financeHouseProperty.title}`);
    }

  } catch (error) {
    console.error("❌ Failed to add Finance House property:", error);
  } finally {
    process.exit(0);
  }
}

addFinanceHouse();