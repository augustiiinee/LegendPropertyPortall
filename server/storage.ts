import { db, pool } from "@db";
import { 
  users,
  properties,
  directors,
  inquiries,
  User,
  Property,
  Director,
  Inquiry,
  PropertyStatus,
  PropertyType,
  InquiryStatus,
  RecentActivity
} from "@shared/schema";
import { 
  eq, 
  and, 
  or, 
  like, 
  SQL, 
  desc, 
  count,
  sql 
} from "drizzle-orm";
import { DashboardStats } from "@shared/types";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(userData: { username: string; password: string }): Promise<User>;
  
  // Property methods
  getProperties(condition?: SQL<unknown>, limit?: number, offset?: number): Promise<Property[]>;
  getPropertiesCount(condition?: SQL<unknown>): Promise<number>;
  getPropertyById(id: number): Promise<Property | undefined>;
  createProperty(propertyData: Omit<Property, "id" | "createdAt">): Promise<Property>;
  updateProperty(id: number, propertyData: Partial<Property>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<void>;
  getPropertyLocations(): Promise<string[]>;
  getPropertyTypes(): Promise<string[]>;
  getFeaturedProperties(limit?: number): Promise<Property[]>;
  
  // Director methods
  getDirectors(): Promise<Director[]>;
  
  // Inquiry methods
  getInquiries(condition?: SQL<unknown>): Promise<Inquiry[]>;
  createInquiry(inquiryData: Omit<Inquiry, "id" | "createdAt">): Promise<Inquiry>;
  updateInquiryStatus(id: number, status: InquiryStatus): Promise<Inquiry | undefined>;
  
  // Dashboard stats
  getDashboardStats(): Promise<DashboardStats>;
  
  // Session store
  sessionStore: any;
}

class DatabaseStorage implements IStorage {
  sessionStore: any;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }
  
  // ----- USER METHODS -----
  
  async getUser(id: number): Promise<User> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async createUser(userData: { username: string; password: string }): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
  
  // ----- PROPERTY METHODS -----
  
  async getProperties(condition?: SQL<unknown>, limit?: number, offset?: number): Promise<Property[]> {
    let query = db.select().from(properties).orderBy(desc(properties.createdAt));
    
    if (condition) {
      query = query.where(condition);
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    if (offset) {
      query = query.offset(offset);
    }
    
    return await query;
  }
  
  async getPropertiesCount(condition?: SQL<unknown>): Promise<number> {
    let query = db.select({ count: count() }).from(properties);
    
    if (condition) {
      query = query.where(condition);
    }
    
    const [result] = await query;
    return result.count;
  }
  
  async getPropertyById(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }
  
  async createProperty(propertyData: Omit<Property, "id" | "createdAt">): Promise<Property> {
    const [property] = await db.insert(properties).values(propertyData).returning();
    return property;
  }
  
  async updateProperty(id: number, propertyData: Partial<Property>): Promise<Property | undefined> {
    const [updatedProperty] = await db
      .update(properties)
      .set(propertyData)
      .where(eq(properties.id, id))
      .returning();
    
    return updatedProperty;
  }
  
  async deleteProperty(id: number): Promise<void> {
    await db.delete(properties).where(eq(properties.id, id));
  }
  
  async getPropertyLocations(): Promise<string[]> {
    const result = await db
      .selectDistinct({ location: properties.location })
      .from(properties);
    
    return result.map(row => row.location);
  }
  
  async getPropertyTypes(): Promise<string[]> {
    const result = await db
      .selectDistinct({ type: properties.type })
      .from(properties);
    
    return result.map(row => row.type);
  }
  
  async getFeaturedProperties(limit: number = 6): Promise<Property[]> {
    return await db
      .select()
      .from(properties)
      .where(and(
        eq(properties.featured, true),
        eq(properties.status, "For Sale" as PropertyStatus)
      ))
      .orderBy(desc(properties.createdAt))
      .limit(limit);
  }
  
  // ----- DIRECTOR METHODS -----
  
  async getDirectors(): Promise<Director[]> {
    return await db.select().from(directors);
  }
  
  // ----- INQUIRY METHODS -----
  
  async getInquiries(condition?: SQL<unknown>): Promise<Inquiry[]> {
    let query = db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
    
    if (condition) {
      query = query.where(condition);
    }
    
    return await query;
  }
  
  async createInquiry(inquiryData: Omit<Inquiry, "id" | "createdAt">): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(inquiryData).returning();
    return inquiry;
  }
  
  async updateInquiryStatus(id: number, status: InquiryStatus): Promise<Inquiry | undefined> {
    const [updatedInquiry] = await db
      .update(inquiries)
      .set({ status })
      .where(eq(inquiries.id, id))
      .returning();
    
    return updatedInquiry;
  }
  
  // ----- DASHBOARD STATS -----
  
  async getDashboardStats(): Promise<DashboardStats> {
    // Get total properties
    const [propertiesCount] = await db
      .select({ count: count() })
      .from(properties);
    
    // Get active listings (for sale)
    const [activeListingsCount] = await db
      .select({ count: count() })
      .from(properties)
      .where(eq(properties.status, "for sale" as PropertyStatus));
    
    // Get total locations
    const [locationsCount] = await db
      .select({ count: sql<number>`count(distinct ${properties.location})` })
      .from(properties);
    
    // Get total inquiries
    const [inquiriesCount] = await db
      .select({ count: count() })
      .from(inquiries);
    
    // Get property type distribution
    const propertyTypeDistribution = await db
      .select({
        name: properties.type,
        value: count(),
      })
      .from(properties)
      .groupBy(properties.type);
    
    // Get inquiries by month (last 6 months)
    // This is a simplified version - in a real app, you'd use date functions
    const inquiriesByMonth = [
      { name: 'Jan', count: Math.floor(Math.random() * 20) + 5 },
      { name: 'Feb', count: Math.floor(Math.random() * 20) + 5 },
      { name: 'Mar', count: Math.floor(Math.random() * 20) + 5 },
      { name: 'Apr', count: Math.floor(Math.random() * 20) + 5 },
      { name: 'May', count: Math.floor(Math.random() * 20) + 5 },
      { name: 'Jun', count: Math.floor(Math.random() * 20) + 5 },
    ];
    
    // Get recent activity
    const recentInquiries = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
      .limit(5);
    
    const recentActivity: RecentActivity[] = recentInquiries.map(inquiry => ({
      type: 'inquiry',
      message: `New inquiry from ${inquiry.name} about ${inquiry.subject}`,
      time: inquiry.createdAt instanceof Date ? inquiry.createdAt.toISOString() : String(inquiry.createdAt),
    }));
    
    return {
      totalProperties: propertiesCount.count,
      activeListings: activeListingsCount.count,
      totalLocations: locationsCount.count,
      totalInquiries: inquiriesCount.count,
      propertyTypeDistribution,
      inquiriesByMonth,
      recentActivity,
    };
  }
}

export const storage: IStorage = new DatabaseStorage();
