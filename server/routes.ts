import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { eq, like, and, or, between, desc } from "drizzle-orm";
import { 
  properties, 
  PropertyStatus,
  inquiries, 
  InquiryStatus,
  directors 
} from "@shared/schema";

// Middleware to check if user is authenticated
const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // ----- PUBLIC API ROUTES -----

  // Properties endpoints
  app.get("/api/properties", async (req, res) => {
    try {
      const { 
        page = "1", 
        pageSize = "9",
        location = "all",
        propertyType = "all",
        priceRange = "all",
        search = ""
      } = req.query as Record<string, string>;
      
      const pageNum = parseInt(page);
      const pageSizeNum = parseInt(pageSize);
      
      // Build query conditions
      let conditions = [];
      
      // Search term
      if (search) {
        conditions.push(
          or(
            like(properties.title, `%${search}%`),
            like(properties.description, `%${search}%`),
            like(properties.location, `%${search}%`)
          )
        );
      }
      
      // Location filter
      if (location !== "all") {
        conditions.push(like(properties.location, `%${location}%`));
      }
      
      // Property type filter
      if (propertyType !== "all") {
        conditions.push(eq(properties.type, propertyType));
      }
      
      // Price range filter
      if (priceRange !== "all") {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        conditions.push(between(properties.price, minPrice, maxPrice));
      }
      
      // Default condition to show for sale properties
      conditions.push(eq(properties.status, "for sale" as PropertyStatus));
      
      // Get properties with pagination
      const queryCondition = conditions.length ? and(...conditions) : undefined;
      
      // Get total count for pagination
      const total = await storage.getPropertiesCount(queryCondition);
      
      // Get paginated properties
      const propertyList = await storage.getProperties(
        queryCondition,
        pageSizeNum,
        (pageNum - 1) * pageSizeNum
      );
      
      // Calculate total pages
      const pages = Math.ceil(total / pageSizeNum);
      
      res.json({
        properties: propertyList,
        total,
        pages
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  // Property filter options endpoint - MUST be before :id route to avoid conflict
  app.get("/api/properties/filter-options", async (req, res) => {
    try {
      const locations = await storage.getPropertyLocations();
      const propertyTypes = await storage.getPropertyTypes();
      
      res.json({
        locations,
        propertyTypes
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
      res.status(500).json({ message: "Failed to fetch filter options" });
    }
  });
  
  // Property detail endpoint
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const parsedId = parseInt(id);
      
      // Check if id is a valid number
      if (isNaN(parsedId)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const property = await storage.getPropertyById(parsedId);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Directors endpoint
  app.get("/api/directors", async (req, res) => {
    try {
      const directorsList = await storage.getDirectors();
      res.json(directorsList);
    } catch (error) {
      console.error("Error fetching directors:", error);
      res.status(500).json({ message: "Failed to fetch directors" });
    }
  });

  // Submit inquiry endpoint
  app.post("/api/inquiries", async (req, res) => {
    try {
      const { name, email, phone, subject, message, propertyId } = req.body;
      
      if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const newInquiry = await storage.createInquiry({
        name,
        email,
        phone,
        subject: subject || "General Inquiry",
        message,
        propertyId: propertyId ? parseInt(propertyId) : null, // Use null instead of undefined
        status: "new" as InquiryStatus,
      });
      
      res.status(201).json(newInquiry);
    } catch (error) {
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      
      if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const newInquiry = await storage.createInquiry({
        name,
        email,
        phone,
        subject: subject || "Contact Form Submission",
        message,
        propertyId: null, // Add propertyId as null for contact form submissions
        status: "new" as InquiryStatus,
      });
      
      res.status(201).json(newInquiry);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // ----- ADMIN API ROUTES -----

  // Get all properties (for admin)
  app.get("/api/properties/admin", isAuthenticated, async (req, res) => {
    try {
      const { search, status, type } = req.query as Record<string, string>;
      
      // Build query conditions
      let conditions = [];
      
      // Search term
      if (search) {
        conditions.push(
          or(
            like(properties.title, `%${search}%`),
            like(properties.description, `%${search}%`),
            like(properties.location, `%${search}%`)
          )
        );
      }
      
      // Status filter
      if (status && status !== "all") {
        conditions.push(eq(properties.status, status as PropertyStatus));
      }
      
      // Type filter
      if (type && type !== "all") {
        conditions.push(eq(properties.type, type));
      }
      
      const queryCondition = conditions.length ? and(...conditions) : undefined;
      const propertyList = await storage.getProperties(queryCondition);
      
      res.json(propertyList);
    } catch (error) {
      console.error("Error fetching admin properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  // Create property
  app.post("/api/properties", isAuthenticated, async (req, res) => {
    try {
      const newProperty = await storage.createProperty(req.body);
      res.status(201).json(newProperty);
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  // Update property
  app.put("/api/properties/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProperty = await storage.updateProperty(parseInt(id), req.body);
      
      if (!updatedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(updatedProperty);
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({ message: "Failed to update property" });
    }
  });

  // Delete property
  app.delete("/api/properties/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProperty(parseInt(id));
      res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ message: "Failed to delete property" });
    }
  });

  // Get all inquiries (for admin)
  app.get("/api/inquiries", isAuthenticated, async (req, res) => {
    try {
      const { search, status } = req.query as Record<string, string>;
      
      // Build query conditions
      let conditions = [];
      
      // Search term
      if (search) {
        conditions.push(
          or(
            like(inquiries.name, `%${search}%`),
            like(inquiries.email, `%${search}%`),
            like(inquiries.message, `%${search}%`),
            like(inquiries.subject, `%${search}%`)
          )
        );
      }
      
      // Status filter
      if (status && status !== "all") {
        conditions.push(eq(inquiries.status, status as InquiryStatus));
      }
      
      const queryCondition = conditions.length ? and(...conditions) : undefined;
      const inquiriesList = await storage.getInquiries(queryCondition);
      
      res.json(inquiriesList);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // Update inquiry status
  app.patch("/api/inquiries/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const updatedInquiry = await storage.updateInquiryStatus(
        parseInt(id),
        status as InquiryStatus
      );
      
      if (!updatedInquiry) {
        return res.status(404).json({ message: "Inquiry not found" });
      }
      
      res.json(updatedInquiry);
    } catch (error) {
      console.error("Error updating inquiry status:", error);
      res.status(500).json({ message: "Failed to update inquiry status" });
    }
  });

  // Dashboard statistics endpoint
  app.get("/api/admin/dashboard-stats", isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Create the HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
