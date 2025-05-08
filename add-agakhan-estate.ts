import { db } from "./db";
import { properties, PropertyStatus, PropertyType } from "./shared/schema";
import { eq, and } from "drizzle-orm";

async function addAgaKhanEstate() {
  try {
    console.log("🏘️ Adding Aga Khan Estate residential property...");

    const agaKhanEstateProperty = {
      title: "Aga Khan Estate - Premium Residential Units",
      description: "Aga Khan Estate offers premium residential units situated along Aga Khan Road in Mombasa County. This well-maintained residential complex features 40 units with 4 currently available for rent.\n\nProperty Highlights:\n• Residential Building with 40 units\n• 4 units currently available\n• Divided into five blocks\n• Rent: Kshs. 23,500\n\nAmenities:\n• 24/7 security\n• Reliable water supply throughout the building\n• Available parking slots\n• Cleaning Services for common areas\n\nContact Sylvia who is the Property Manager and their number is 0790825203\n\nTo Arrange a Viewing or Get More Details:\nLegend Management Ltd.\nTel: 0790825203\nEmail: sylvia@propertylegend.com\nAddress: 7th floor room 715. Nssf building along Nkrumah road, Mombasa County",
      price: 23500, // Monthly rent in KES
      location: "Aga Khan Estate, Aga Khan Road, Mombasa County",
      type: "residential" as PropertyType,
      status: "For Rent" as PropertyStatus,
      size: 950, // Estimated size in sqft
      bedrooms: 3,
      bathrooms: 2,
      offices: null,
      parking: 1,
      features: [
        "24/7 Security", 
        "Reliable Water Supply", 
        "Parking Available",
        "Cleaning Services",
        "Premium Residential Units",
        "Located in Mombasa"
      ],
      images: [
        "/images/properties/agakhan/exterior1.jpg",
        "/images/properties/agakhan/exterior2.jpg"
      ],
      featured: true
    };

    // Check if property already exists by title and location
    const existingProperty = await db.select()
      .from(properties)
      .where(and(
        eq(properties.title, agaKhanEstateProperty.title),
        eq(properties.location, agaKhanEstateProperty.location)
      ))
      .limit(1);
    
    if (existingProperty.length === 0) {
      const [newProperty] = await db.insert(properties)
        .values(agaKhanEstateProperty)
        .returning();
      console.log(`✅ Property created: ${newProperty.title}`);
    } else {
      console.log(`ℹ️ Property already exists: ${agaKhanEstateProperty.title}`);
    }

  } catch (error) {
    console.error("❌ Failed to add Aga Khan Estate property:", error);
  } finally {
    process.exit(0);
  }
}

addAgaKhanEstate();