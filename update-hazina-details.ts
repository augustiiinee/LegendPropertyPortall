import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateHazinaDetails() {
  try {
    console.log("🏢 Updating Hazina Trade Centre property details...");
    
    // Find the Hazina property by title
    const hazinaProperty = await db.select()
      .from(properties)
      .where(eq(properties.title, "Hazina Towers - Premium Office Space"))
      .limit(1);
    
    if (hazinaProperty.length === 0) {
      console.log("❌ Hazina Towers property not found!");
      return;
    }

    const propertyId = hazinaProperty[0].id;
    
    // Update property details
    const updatedDescription = 
      "Hazina Trade Centre offers premium office spaces in one of Nairobi's most strategic locations. Located on Monrovia Street in the CBD, this iconic building provides businesses with modern amenities and exceptional visibility.\n\n" +
      "Building Highlights:\n" +
      "• Available Space: 32,028 Square Feet\n" +
      "• Rent per sq. ft: Mezzanine 1 Kshs.80/= -Kshs. 210/=\n" +
      "• Rent per sq. ft: Mezzanine 2 Kshs. 80/=- Kshs. 180/=\n" +
      "• Service charge per sq. ft: Kshs.25/=\n" +
      "• Parking fees: Kshs. 12,000/=\n" +
      "• State-of-the-art facilities: Modern design with high-quality finishes\n" +
      "• Prime Location: Easy access to government offices, financial institutions, and major businesses\n" +
      "• 24/7 Security: Round-the-clock security with CCTV surveillance\n" +
      "• Ample Parking: Dedicated parking spaces for tenants and visitors\n" +
      "• High-Speed Elevators: Efficient vertical transportation\n\n" +
      "Contact Beth Mwendwa who is the Property Manager and their number is 0704039929\n\n" +
      "To Arrange a Viewing or Get More Details:\n" +
      "Legend Management Ltd.\n" +
      "Tel: 0704039929\n" +
      "Email: beth@propertylegend.com\n" +
      "Address: Hazina Trade Centre, Monrovia Street, CBD, Nairobi.";

    // Update title and description
    const result = await db.update(properties)
      .set({ 
        title: "Hazina Trade Centre - Premium Office Space",
        description: updatedDescription,
        location: "Hazina Trade Centre, Monrovia Street, Nairobi CBD",
        size: 32028  // Update size to the actual square footage
      })
      .where(eq(properties.id, propertyId))
      .returning();
    
    console.log(`✅ Successfully updated Hazina Trade Centre property details (ID: ${propertyId})`);

  } catch (error) {
    console.error("❌ Failed to update Hazina Trade Centre property details:", error);
  } finally {
    process.exit(0);
  }
}

updateHazinaDetails();