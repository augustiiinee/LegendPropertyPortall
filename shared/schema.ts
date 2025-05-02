import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// ----- USERS -----
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ----- PROPERTIES -----
export type PropertyStatus = "For Sale" | "For Rent" | "For Lease" | "Sold" | "Pending";
export type PropertyType = "residential" | "commercial" | "land";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull().$type<PropertyType>(),
  status: text("status").notNull().$type<PropertyStatus>(),
  size: integer("size").notNull(),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  offices: integer("offices"),
  parking: integer("parking"),
  features: jsonb("features").$type<string[]>(),
  images: jsonb("images").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPropertySchema = createInsertSchema(properties, {
  title: (schema) => schema.min(2, "Title must be at least 2 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  price: (schema) => schema.positive("Price must be positive"),
  location: (schema) => schema.min(2, "Location must be at least 2 characters"),
  size: (schema) => schema.positive("Size must be positive"),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

// ----- DIRECTORS -----
export const directors = pgTable("directors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  linkedin: text("linkedin"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDirectorSchema = createInsertSchema(directors, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  position: (schema) => schema.min(2, "Position must be at least 2 characters"),
  bio: (schema) => schema.min(10, "Bio must be at least 10 characters"),
});

export type Director = typeof directors.$inferSelect;
export type InsertDirector = z.infer<typeof insertDirectorSchema>;

// ----- INQUIRIES -----
export type InquiryStatus = "new" | "in-progress" | "resolved" | "cancelled";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  propertyId: integer("property_id").references(() => properties.id),
  status: text("status").notNull().$type<InquiryStatus>().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInquirySchema = createInsertSchema(inquiries, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Must be a valid email"),
  phone: (schema) => schema.min(7, "Phone must be at least 7 characters"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters"),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

// ----- RELATIONS -----
export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  property: one(properties, {
    fields: [inquiries.propertyId],
    references: [properties.id],
  }),
}));

// ----- DASHBOARD TYPES -----
export type RecentActivity = {
  type: 'view' | 'inquiry' | 'user';
  message: string;
  time: string;
};
