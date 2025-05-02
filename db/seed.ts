import { db } from "./index";
import { 
  users, 
  properties, 
  directors, 
  PropertyStatus, 
  PropertyType 
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

async function seed() {
  try {
    console.log("🌱 Starting seed process...");

    // Seed admin user
    console.log("Creating admin user...");
    const [adminUser] = await db.insert(users)
      .values({
        username: "admin",
        // This is a hashed version of "password123"
        password: "aa4347e0fcf715bde8b7e5f93ba66fb7f0ef2ff705fef6977748a731c930ddb6.f7ddf74c5a5fd478e4e99b0e73c32918"
      })
      .returning()
      .onConflictDoNothing({ target: users.username });
    
    console.log("Admin user created:", adminUser?.username || "[already exists]");

    // Seed directors
    console.log("Creating directors...");
    const directorsData = [
      {
        name: "Jonathan Wilson",
        position: "Managing Director",
        bio: "Over 20 years of property management experience with expertise in strategic growth and portfolio optimization.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        linkedin: "https://linkedin.com",
        email: "jonathan@legendmanagement.com"
      },
      {
        name: "Sarah Johnson",
        position: "Operations Director",
        bio: "Specializing in operational excellence and property management efficiency with a background in real estate law.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        linkedin: "https://linkedin.com",
        email: "sarah@legendmanagement.com"
      },
      {
        name: "Michael Chen",
        position: "Financial Director",
        bio: "Financial expert with extensive experience in property investment, acquisition strategies, and portfolio management.",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        linkedin: "https://linkedin.com",
        email: "michael@legendmanagement.com"
      }
    ];
    
    for (const director of directorsData) {
      // Check if director already exists by name
      const existingDirector = await db.select()
        .from(directors)
        .where(eq(directors.name, director.name))
        .limit(1);
      
      if (existingDirector.length === 0) {
        const [newDirector] = await db.insert(directors)
          .values(director)
          .returning();
        console.log(`Director created: ${newDirector.name}`);
      } else {
        console.log(`Director already exists: ${director.name}`);
      }
    }

    // Seed properties
    console.log("Creating properties...");
    const propertiesData = [
      {
        title: "Prime Residential Maisonette - Chuna Estate",
        description: "An excellent opportunity to acquire a partially completed five-bedroom all-ensuite maisonette, located in the serene and secure Chuna Estate, Kitengela. The property sits on a corner plot in Elite Avenue and features a detached DSQ, and a rooftop terrace, in a controlled gated community environment. Key features include: All-ensuite 5-bedroom Maisonette with rooftop terrace, Detached 2-Room Servant's Quarters with own facilities, Plinth area of approx. 316 sqm (main house) and 26 sqm (DSQ), High-quality construction with stone walls, concrete slab roof, and tiled wet areas, Electric fence and razor wire perimeter wall, Solar water heating system with 300-litre tank, 9,000-litre total water storage capacity in PVC tanks, Bio-digester sewage system, Partially complete – 88% done; pending final finishes, cabinetry, and fittings. Located in a secure, gated residential estate with 24/7 security. Proximity to Quickmart, Tarikiville Mall, ICC Kitengela, and schools. Easily accessible to Kitengela, Athi River, and Nairobi CBD via Namanga Road. High rental and resale potential in a growing neighbourhood. Ideal for family home, rental investment, or resale upon completion.",
        price: 19000000,
        location: "Chuna Estate, House No. B173, Elite Avenue, Kitengela, Kajiado County",
        type: "residential" as PropertyType,
        status: "For Sale" as PropertyStatus,
        size: 316, // main house size in sqm
        bedrooms: 5,
        bathrooms: 5, // all-ensuite
        features: ["All-Ensuite", "Rooftop Terrace", "Detached DSQ", "Solar Water Heating", "Electric Fence", "Bio-digester Sewage System", "9,000L Water Storage", "Corner Plot", "Gated Community", "Title Deed Available"],
        images: [
          "/images/properties/chuna-estate/exterior1.jpg",
          "/images/properties/chuna-estate/exterior2.jpg",
          "/images/properties/chuna-estate/living-room.jpg",
          "/images/properties/chuna-estate/dining.jpg",
          "/images/properties/chuna-estate/kitchen.jpg", 
          "/images/properties/chuna-estate/garden.jpg",
          "/images/properties/chuna-estate/backyard.jpg",
          "/images/properties/chuna-estate/dsq.jpg"
        ]
      }
    ];
    
    for (const property of propertiesData) {
      // Check if property already exists by title and location
      const existingProperty = await db.select()
        .from(properties)
        .where(and(
          eq(properties.title, property.title),
          eq(properties.location, property.location)
        ))
        .limit(1);
      
      if (existingProperty.length === 0) {
        const [newProperty] = await db.insert(properties)
          .values(property)
          .returning();
        console.log(`Property created: ${newProperty.title}`);
      } else {
        console.log(`Property already exists: ${property.title}`);
      }
    }

    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  }
}

seed();
