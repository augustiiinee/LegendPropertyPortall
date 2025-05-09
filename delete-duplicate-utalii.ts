import { db } from "./db";
import { properties } from "./shared/schema";
import { eq } from "drizzle-orm";

// The duplicate Utalii House has ID 16 (the more recent one)
const DUPLICATE_UTALII_ID = 16;

async function deleteDuplicateUtalii() {
  try {
    console.log(`Deleting duplicate Utalii House property (ID: ${DUPLICATE_UTALII_ID})...`);
    
    // Delete the duplicate property
    const deletedProperty = await db
      .delete(properties)
      .where(eq(properties.id, DUPLICATE_UTALII_ID))
      .returning();
    
    console.log("Deleted duplicate Utalii House property:", deletedProperty);
    
  } catch (error) {
    console.error("Error deleting duplicate Utalii House property:", error);
  } finally {
    process.exit();
  }
}

deleteDuplicateUtalii();