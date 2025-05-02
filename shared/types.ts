import { Property, Director, Inquiry, InquiryStatus, PropertyStatus, PropertyType, RecentActivity } from "@shared/schema";

// Property form data type for creating/updating properties
export type PropertyFormData = Omit<Property, "id" | "createdAt">;

// Dashboard statistics
export type DashboardStats = {
  totalProperties: number;
  activeListings: number;
  totalLocations: number;
  totalInquiries: number;
  propertyTypeDistribution: { name: string; value: number }[];
  inquiriesByMonth: { name: string; count: number }[];
  recentActivity: RecentActivity[];
};

// For exporting the schema types
export type { 
  Property, 
  Director, 
  Inquiry, 
  InquiryStatus, 
  PropertyStatus, 
  PropertyType, 
  RecentActivity 
};
