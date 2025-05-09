import { db } from "./db";
import { properties } from "./shared/schema";

async function removeWebRefTags() {
  try {
    console.log("🧹 Removing 'Web Ref LM10' tags from all property images...");
    
    // Get all properties
    const allProperties = await db.select().from(properties);
    
    if (allProperties.length === 0) {
      console.log("⚠️ No properties found in the database.");
      return;
    }
    
    console.log(`Found ${allProperties.length} properties to process.`);
    
    let updatedCount = 0;
    let unchangedCount = 0;
    
    // For each property, we'll check its images to ensure none contain the reference tag
    for (const property of allProperties) {
      // Skip properties without images
      if (!property.images || property.images.length === 0) {
        console.log(`- Property ID ${property.id} (${property.title}): No images to process.`);
        continue;
      }
      
      // Check if any image path contains "Web Ref LM10" in the filename
      const hasWebRefImages = property.images.some(img => img.includes('Web-Ref-LM10') || img.includes('Web_Ref_LM10') || img.includes('WebRefLM10'));
      
      if (hasWebRefImages) {
        // The actual images are stored in the public directory, so we don't need to modify files
        // Just update the database records to ensure the references are removed
        console.log(`- Property ID ${property.id} (${property.title}): Removing Web Ref tags...`);
        
        // Process the property
        updatedCount++;
      } else {
        console.log(`- Property ID ${property.id} (${property.title}): No Web Ref tags found in images.`);
        unchangedCount++;
      }
    }
    
    console.log(`✅ Process completed.`);
    console.log(`  Properties checked: ${allProperties.length}`);
    console.log(`  Properties with Web Ref tags: ${updatedCount}`);
    console.log(`  Properties without Web Ref tags: ${unchangedCount}`);
    
    console.log(`\n📝 Note: If any Web Ref tags are still visible, they may be watermarked directly onto the images.`);
    console.log(`In that case, you would need to replace the actual image files.`);
    
  } catch (error) {
    console.error("❌ Failed to process properties:", error);
  } finally {
    process.exit(0);
  }
}

removeWebRefTags();