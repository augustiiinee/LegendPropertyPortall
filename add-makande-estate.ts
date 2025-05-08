import { db } from "./db";
import { properties, PropertyStatus, PropertyType } from "@shared/schema";
import { eq, and } from "drizzle-orm";

async function addMakandeEstate() {
  try {
    console.log("🏘️ Adding Makande Estate residential property...");

    const makandeEstateProperty = {
      title: "Makande Estate - Residential Apartments",
      description: "Makande Estate offers comfortable residential apartments in Mombasa County. This well-maintained residential complex features 100 units with 87 currently available for rent.\n\nProperty Highlights:\n• Residential Building with 100 units\n• 87 units currently available\n• 4 stalls/shops within the estate (rent Kshs. 6,500)\n• Rent: Kshs. 8,100 inclusive of service charge\n\nAmenities:\n• 24/7 security\n• Reliable water supply throughout the building\n• Available parking slots\n• Cleaning Services for common areas\n\nContact Sylvia who is the Property Manager and their number is 0790825203\n\nTo Arrange a Viewing or Get More Details:\nLegend Management Ltd.\nTel: 0790825203\nEmail: sylvia@propertylegend.com\nAddress: 7th floor room 715. Nssf building along Nkrumah road, Mombasa County",
      price: 8100, // Monthly rent in KES
      location: "Makande Estate, Mombasa County",
      type: "residential" as PropertyType,
      status: "For Rent" as PropertyStatus,
      size: 800, // Estimated size in sqft
      bedrooms: 2,
      bathrooms: 1,
      offices: null,
      parking: 1,
      features: [
        "24/7 Security", 
        "Reliable Water Supply", 
        "Parking Available",
        "Cleaning Services",
        "Residential Estate",
        "Located in Mombasa"
      ],
      images: [
        "/images/properties/makande/exterior1.jpg",
        "/images/properties/makande/exterior2.jpg",
        "/images/properties/makande/interior1.jpg",
        "/images/properties/makande/interior2.jpg"
      ],
      featured: true
    };

    // Check if property already exists by title and location
    const existingProperty = await db.select()
      .from(properties)
      .where(and(
        eq(properties.title, makandeEstateProperty.title),
        eq(properties.location, makandeEstateProperty.location)
      ))
      .limit(1);
    
    if (existingProperty.length === 0) {
      const [newProperty] = await db.insert(properties)
        .values(makandeEstateProperty)
        .returning();
      console.log(`✅ Property created: ${newProperty.title}`);
    } else {
      console.log(`ℹ️ Property already exists: ${makandeEstateProperty.title}`);
    }

  } catch (error) {
    console.error("❌ Failed to add Makande Estate property:", error);
  } finally {
    process.exit(0);
  }
}

addMakandeEstate();