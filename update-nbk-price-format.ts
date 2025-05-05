import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateNBKPriceFormat() {
  try {
    // Get the National Bank of Kenya property
    const nbkProperty = await db.query.properties.findFirst({
      where: eq(properties.title, 'National Bank of Kenya - Prime Commercial Office Space'),
    });

    if (!nbkProperty) {
      console.log("National Bank of Kenya property not found");
      return;
    }

    console.log("Found National Bank of Kenya:", nbkProperty.id);

    // Update the price display format and description
    const updated = await db
      .update(properties)
      .set({
        description: `
National Bank of Kenya is a 20-storey commercial building situated on L.R. NO. 209/8401 along Harambee Avenue in Nairobi. The building is divided into two sections i.e. the North Podium and the South Podium consisting of office block of which some are available for letting. The total vacant space is 384 Square Feet.

## Pricing
- Rent: Ksh 90/ Sqft
- Service Charge: Ksh 36/ Sqft
- Parking fees: Ksh 10,000 per month

## Amenities
- 5 high speed working lifts for easy access
- Backup generator for uninterrupted power supply
- 24/7 security for a safe work environment
- Reliable water supply throughout the building
- Available parking slots leased on monthly basis

## Contact Information
To Arrange a Viewing or Get More Details:
Legend Management Ltd.
Tel: 0791181166
Email: joseph@propertylegend.com | dianaruto@propertylegend.com
Address: National Bank of Kenya (NBK), Harambee Avenue CBD, Nairobi.
South Podium, 2nd Floor.
`,
        features: [
          '5 high speed working lifts',
          'Backup generator',
          '24/7 security',
          'Reliable water supply',
          'Available parking slots',
          'Rent: Ksh 90/ Sqft',
          'Service Charge: Ksh 36/ Sqft',
          'Parking fees: Ksh 10,000 per month'
        ],
      })
      .where(eq(properties.id, nbkProperty.id))
      .returning();

    console.log("Updated National Bank of Kenya price format:", updated);
  } catch (error) {
    console.error("Error updating National Bank of Kenya price format:", error);
  }
}

// Run the update function
updateNBKPriceFormat().finally(() => {
  console.log("Update completed");
  process.exit(0);
});