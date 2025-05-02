import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// This is the correct way neon config - DO NOT change this
neonConfig.webSocketConstructor = ws;

// For better connection stability with Neon PostgreSQL
neonConfig.fetchConnectionCache = true;
neonConfig.pipelineTLS = true; 
neonConfig.useSecureWebSocket = true;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create a function that returns a new pool
// This allows us to recreate the pool if it encounters a fatal error
const createPool = () => {
  const newPool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000, // 5 seconds
    max: 5, // Reduce number of clients to avoid overwhelming connection
    idleTimeoutMillis: 10000, // Close idle clients after 10 seconds
  });
  
  // Handle errors at the pool level
  newPool.on('error', (err) => {
    console.error('Database pool error:', err);
    // Don't exit the process, just log the error
  });
  
  return newPool;
};

// Create the initial pool
export const pool = createPool();

// Test the connection but don't crash the app if it fails initially
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection successful');
    client.release();
    return true;
  } catch (err) {
    console.error('Initial database connection error:', err);
    return false;
  }
};

// Run the test but don't wait for it
testConnection();

export const db = drizzle({ client: pool, schema });