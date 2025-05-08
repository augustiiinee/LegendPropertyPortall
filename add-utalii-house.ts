import { db } from "./db";
import { properties, PropertyStatus, PropertyType } from "./shared/schema";
import { eq, and } from "drizzle-orm";

async function addUtaliiHouse() {
  try {
    console.log("🏢 Adding Utalii House commercial property...");

    const utaliiHouseProperty = {
      title: "Utalii House - Premium Office Space",
      description: 
        "Utalii House is a 12-storey commercial building situated along Utalii Street in Nairobi. It has a total lettable area of approximately 117,522.42 square feet. It is divided into two wings i.e. North wing and South wing consisting of office block all of which are available for letting. The total vacant space is 32,088.43 square feet.\n\n" +
        "Available Spaces:\n" +
        "- GF Floor: 515 sq ft\n" +
        "- GF Floor: 849.92 sq ft\n" +
        "- GF Floor: 844.75 sq ft\n" +
        "- GF Floor: 225 sq ft\n" +
        "- GF Floor: 1821.88 sq ft\n" +
        "- GF Floor: 1705.39 sq ft\n" +
        "- GF Floor: 520.65 sq ft\n" +
        "- MZ Floor: 2361 sq ft\n" +
        "- 1st Floor: 230 sq ft\n" +
        "- 2nd Floor: 432 sq ft\n" +
        "- 2nd Floor: 392 sq ft\n" +
        "- 2nd Floor: 168 sq ft\n" +
        "- 2nd Floor: 378 sq ft\n" +
        "- 2nd Floor: 392 sq ft\n" +
        "- 2nd Floor: 126 sq ft\n" +
        "- 3rd Floor: 787.49 sq ft\n" +
        "- 3rd Floor: 510 sq ft\n" +
        "- 3rd Floor: 736 sq ft\n" +
        "- 3rd Floor: 821 sq ft\n" +
        "- 6th Floor: 12015.3 sq ft\n" +
        "- 7th Floor: 5070.84 sq ft\n" +
        "- 10th Floor: 149 sq ft\n" +
        "- 10th Floor: 888.21 sq ft\n" +
        "- 10th Floor: 149 sq ft\n" +
        "- Total: 32088.43 sq ft\n\n" +
        "Pricing:\n" +
        "• Rent per sq. ft: Kshs.85/= exclusive VAT\n" +
        "• Service charge per sq. ft: Kshs.30/= exclusive VAT\n" +
        "• Parking fees: Kshs.9,000/= inclusive VAT\n\n" +
        "Amenities:\n" +
        "• 4 high speed working lifts for easy access\n" +
        "• Backup generator for uninterrupted power supply\n" +
        "• 24/7 security for a safe work environment\n" +
        "• Reliable water supply throughout the building\n\n" +
        "Contact Information:\n" +
        "📞 To Arrange a Viewing or Get More Details:\n" +
        "Legend Management Ltd.\n" +
        "Tel: 0740445986 | 0729600465\n" +
        "Email: raymond@propertylegend.com | kenneth@propertylegend.com\n" +
        "Address: Utalii House Ground floor, Utalii Street, CBD, Nairobi.",
      price: 0, // Setting to 0 to hide the fixed price as per previous requirement
      location: "Utalii House, Utalii Street, CBD, Nairobi",
      type: "commercial" as PropertyType,
      status: "For Lease" as PropertyStatus,
      size: 32088, // total available space in sqft
      bedrooms: null,
      bathrooms: null,
      offices: 23, // number of office spaces available
      parking: 10, // estimated number of parking spaces
      features: [
        "Prime CBD Location", 
        "4 High Speed Lifts",
        "Backup Generator", 
        "24/7 Security", 
        "Reliable Water Supply",
        "12-storey Building",
        "North & South Wings"
      ],
      images: [], // No images as requested
      featured: true
    };

    // Check if property already exists by title and location
    const existingProperty = await db.select()
      .from(properties)
      .where(and(
        eq(properties.title, utaliiHouseProperty.title),
        eq(properties.location, utaliiHouseProperty.location)
      ))
      .limit(1);
    
    if (existingProperty.length === 0) {
      const [newProperty] = await db.insert(properties)
        .values(utaliiHouseProperty)
        .returning();
      console.log(`✅ Property created: ${newProperty.title}`);
    } else {
      console.log(`ℹ️ Property already exists: ${utaliiHouseProperty.title}`);
    }

  } catch (error) {
    console.error("❌ Failed to add Utalii House property:", error);
  } finally {
    process.exit(0);
  }
}

addUtaliiHouse();