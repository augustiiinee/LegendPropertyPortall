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
        title: "Modern Downtown Apartment",
        description: "Stunning modern apartment in the heart of downtown. This spacious apartment features high ceilings, large windows with abundant natural light, and premium finishes throughout. The open concept living and dining area is perfect for entertaining, while the gourmet kitchen includes stainless steel appliances and quartz countertops. The master suite offers a walk-in closet and ensuite bathroom with dual vanities. Additional features include in-unit laundry, central air conditioning, and secure building access. Walking distance to shops, restaurants, and public transportation.",
        price: 425000,
        location: "123 City Center, Downtown",
        type: "residential" as PropertyType,
        status: "for sale" as PropertyStatus,
        size: 1200,
        bedrooms: 3,
        bathrooms: 2,
        features: ["Air Conditioning", "In-unit Laundry", "Hardwood Floors", "Stainless Steel Appliances", "Walk-in Closet"],
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]
      },
      {
        title: "Spacious Family Home",
        description: "Beautiful family home in a desirable suburban neighborhood. This well-maintained property offers plenty of space for the whole family with 4 bedrooms and 3 bathrooms. The main level features a formal living room, dining room, and a large family room that opens to the updated kitchen with granite countertops and stainless steel appliances. Upstairs you'll find the primary suite with a luxurious bathroom and walk-in closet, plus three additional bedrooms and a full bathroom. The finished basement provides additional living space perfect for a recreation room or home office. Outside, enjoy the spacious backyard with a covered patio, perfect for outdoor entertaining. Excellent school district and convenient access to shopping and highways.",
        price: 675000,
        location: "456 Maple Street, Suburbs",
        type: "residential" as PropertyType,
        status: "for sale" as PropertyStatus,
        size: 2400,
        bedrooms: 4,
        bathrooms: 3,
        features: ["Finished Basement", "Garage", "Fenced Backyard", "Fireplace", "Central Heating"],
        images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]
      },
      {
        title: "Commercial Office Space",
        description: "Prime commercial office space in the heart of the business district. This versatile property offers a modern, open-concept layout that can be configured to suit a variety of business needs. Features include 5 private offices, a spacious reception area, conference room, staff kitchen, and open work area. The property has been recently renovated with new flooring, lighting, and HVAC systems. Ample parking with 10 dedicated spaces makes this an ideal location for professional services, tech companies, or corporate headquarters. Excellent visibility and easy access to major highways, restaurants, and amenities.",
        price: 1250000,
        location: "789 Business Park, Commercial District",
        type: "commercial" as PropertyType,
        status: "for sale" as PropertyStatus,
        size: 3500,
        offices: 5,
        parking: 10,
        features: ["Elevator", "Security System", "Meeting Rooms", "Kitchenette", "High-speed Internet"],
        images: ["https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"]
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
