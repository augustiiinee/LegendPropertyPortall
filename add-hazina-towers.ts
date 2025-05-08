import { db } from "./db";
import { properties, PropertyStatus, PropertyType } from "@shared/schema";
import { eq, and } from "drizzle-orm";

async function addHazinaTowers() {
  try {
    console.log("🏢 Adding Hazina Towers commercial property...");

    const hazinaTowersProperty = {
      title: "Hazina Towers - Premium Office Space",
      description: "Hazina Towers offers premium office spaces in one of Nairobi's most strategic locations. Located on Monrovia Street in the CBD, this iconic building provides businesses with modern amenities and exceptional visibility.\n\nBuilding Highlights:\n• State-of-the-art facilities: Modern design with high-quality finishes.\n• Prime Location: Easy access to government offices, financial institutions, and major businesses.\n• 24/7 Security: Round-the-clock security with CCTV surveillance.\n• Ample Parking: Dedicated parking spaces for tenants and visitors.\n• High-Speed Elevators: Efficient vertical transportation.\n\nContact Beth Mwendwa who is the Property Manager and their number is 0704039929\n\nTo Arrange a Viewing or Get More Details:\nLegend Management Ltd.\nTel: 0704039929\nEmail: beth@propertylegend.com\nAddress: Hazina Towers, Monrovia Street, CBD, Nairobi.",
      price: 210000, // Monthly rent in KES
      location: "Hazina Towers, Monrovia Street, Nairobi CBD",
      type: "commercial" as PropertyType,
      status: "For Lease" as PropertyStatus,
      size: 4200, // size in sqft
      bedrooms: null,
      bathrooms: 3,
      offices: 6,
      parking: 5,
      features: [
        "Prime CBD Location", 
        "24/7 Security", 
        "Power Backup", 
        "Modern Design",
        "High-Speed Elevators",
        "CCTV Surveillance",
        "Ample Parking",
        "Conference Facilities"
      ],
      images: [
        "/images/properties/hazina/exterior1.jpg",
        "/images/properties/hazina/interior1.jpg",
        "/images/properties/hazina/office-space.jpg",
        "/images/properties/hazina/reception.jpg"
      ],
      featured: true
    };

    // Check if property already exists by title and location
    const existingProperty = await db.select()
      .from(properties)
      .where(and(
        eq(properties.title, hazinaTowersProperty.title),
        eq(properties.location, hazinaTowersProperty.location)
      ))
      .limit(1);
    
    if (existingProperty.length === 0) {
      const [newProperty] = await db.insert(properties)
        .values(hazinaTowersProperty)
        .returning();
      console.log(`✅ Property created: ${newProperty.title}`);
    } else {
      console.log(`ℹ️ Property already exists: ${hazinaTowersProperty.title}`);
    }

  } catch (error) {
    console.error("❌ Failed to add Hazina Towers property:", error);
  } finally {
    process.exit(0);
  }
}

addHazinaTowers();