import { db } from "./db";
import { properties, PropertyStatus, PropertyType } from "./shared/schema";
import { eq, and } from "drizzle-orm";

async function addBomboluluEstate() {
  try {
    console.log("🏘️ Adding Bombolulu Estate residential property...");

    const bomboluluEstateProperty = {
      title: "Bombolulu Estate - Spacious 2 Bedroom Units",
      description: "Bombolulu Estate offers spacious 2-bedroom residential units in Mombasa County. This well-maintained residential complex features 88 units with 77 currently available for rent.\n\nProperty Highlights:\n• Residential Building with 88 units\n• 77 units currently available\n• Spacious 2-bedroom layout\n• Rent: Kshs. 16,000 inclusive of service charge\n\nAmenities:\n• 24/7 security\n• Reliable water supply throughout the building\n• Available parking slots\n• Cleaning Services for common areas\n\nContact Sylvia who is the Property Manager and their number is 0790825203\n\nTo Arrange a Viewing or Get More Details:\nLegend Management Ltd.\nTel: 0790825203\nEmail: sylvia@propertylegend.com\nAddress: 7th floor room 715. Nssf building along Nkrumah road, Mombasa County",
      price: 16000, // Monthly rent in KES
      location: "Bombolulu Estate, Mombasa County",
      type: "residential" as PropertyType,
      status: "For Rent" as PropertyStatus,
      size: 850, // Estimated size in sqft
      bedrooms: 2,
      bathrooms: 1,
      offices: null,
      parking: 1,
      features: [
        "24/7 Security", 
        "Reliable Water Supply", 
        "Parking Available",
        "Cleaning Services",
        "Spacious 2-Bedroom Units",
        "Located in Mombasa"
      ],
      images: [],  // No images for now as requested
      featured: true
    };

    // Check if property already exists by title and location
    const existingProperty = await db.select()
      .from(properties)
      .where(and(
        eq(properties.title, bomboluluEstateProperty.title),
        eq(properties.location, bomboluluEstateProperty.location)
      ))
      .limit(1);
    
    if (existingProperty.length === 0) {
      const [newProperty] = await db.insert(properties)
        .values(bomboluluEstateProperty)
        .returning();
      console.log(`✅ Property created: ${newProperty.title}`);
    } else {
      console.log(`ℹ️ Property already exists: ${bomboluluEstateProperty.title}`);
    }

  } catch (error) {
    console.error("❌ Failed to add Bombolulu Estate property:", error);
  } finally {
    process.exit(0);
  }
}

addBomboluluEstate();