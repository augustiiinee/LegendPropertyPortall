import { db } from "./db";
import { properties } from "./shared/schema";

async function addNewProperties() {
  try {
    // Add Blueshield Towers
    const blueshieldTowers = await db.insert(properties).values({
      title: "Blueshield Towers - Prime Commercial Office Space",
      type: "commercial",
      status: "For Lease",
      location: "Hospital Road, Upper Hill, Nairobi",
      description: `
Blue Shield Towers is a 11-storey commercial building situated on L.R. NO. 209/15603 along Hospital Road Upper Hill in Nairobi. It has a total lettable area of approximately 85,546 Square Feet. It is divided into two sections i.e. the Front and the Rear tower consisting of office block all of which are available for letting. The total vacant space is 63,528 Square Feet.

## Amenities
- 4 working lifts for easy access
- Backup generator for uninterrupted power supply
- 24/7 security for a safe work environment
- Reliable water supply throughout the building
- Available parking slots leased on monthly basis

## Contact Information
To Arrange a Viewing or Get More Details:
Legend Management Ltd.
Tel: 0724003321 | 0115095277
Email: brian@propertylegend.com | daisy@propertylegend.com
Address: NHIF – Building, 3rd Floor, Ragati Road, Upperhill, Nairobi.
      `,
      price: 75,
      bedrooms: 0,
      bathrooms: 0,
      size: 63528,
      features: JSON.stringify([
        "4 working lifts",
        "Backup generator",
        "24/7 security",
        "Reliable water supply",
        "Available parking slots",
        "Service charge: Ksh 25 per sq ft",
        "Parking fees: Ksh 6,500 per month"
      ]),
      images: JSON.stringify([
        "/images/properties/blueshield-towers-1.jpg",
        "/images/properties/blueshield-towers-2.jpg",
      ]),
      featured: false
    }).returning();

    console.log("Added Blueshield Towers:", blueshieldTowers);

    // Add National Bank of Kenya
    const nbk = await db.insert(properties).values({
      title: "National Bank of Kenya - Prime Commercial Office Space",
      type: "commercial",
      status: "For Lease",
      location: "Harambee Avenue, CBD, Nairobi",
      description: `
National Bank of Kenya is a 20-storey commercial building situated on L.R. NO. 209/8401 along Harambee Avenue in Nairobi. The building is divided into two sections i.e. the North Podium and the South Podium consisting of office blocks, some of which are available for letting. The total vacant space is 384 Square Feet.

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
Address: National Bank of Kenya (NBK), Harambee Avenue CBD, Nairobi, South Podium, 2nd Floor.
      `,
      price: 90,
      bedrooms: 0,
      bathrooms: 0,
      size: 384,
      features: JSON.stringify([
        "5 high speed working lifts",
        "Backup generator",
        "24/7 security",
        "Reliable water supply",
        "Available parking slots",
        "Service charge: Ksh 36 per sq ft plus VAT",
        "Parking fees: Ksh 10,000 per month",
        "Price excludes VAT"
      ]),
      images: JSON.stringify([
        "/images/properties/nbk-1.jpg",
        "/images/properties/nbk-2.jpg",
      ]),
      isFeatured: false,
      propertyReference: "NBK-CBD-2025"
    }).returning();

    console.log("Added National Bank of Kenya:", nbk);

    console.log("Properties added successfully!");
  } catch (error) {
    console.error("Error adding properties:", error);
  } finally {
    process.exit();
  }
}

addNewProperties();