import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
// import HomePage from "@/pages/home-page";
import PropertiesPage from "@/pages/properties-page";
import PropertyDetailPage from "@/pages/property-detail-page";
import PropertyCategoriesPage from "@/pages/property-categories-page";
import PropertyCategoryPage from "@/pages/property-category-page";
import DirectorsPage from "@/pages/directors-page";
import AboutPage from "@/pages/about-page";
import Dashboard from "@/pages/admin/dashboard";
import PropertyList from "@/pages/admin/property-list";
import PropertyForm from "@/pages/admin/property-form";
import Inquiries from "@/pages/admin/inquiries";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import PropertyShowcase from "@/components/home/property-showcase";
import ContactSection from "@/components/home/contact-section";
import { Link } from 'wouter';

// Define Custom HomePage directly in App.tsx
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <PropertyShowcase />
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

// Define ServicesPage component directly in App.tsx to avoid any import issues
const ServicesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-center mb-6">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Property Management</h2>
              <p>We provide comprehensive property management services designed to maximize returns and preserve the long-term value of your investment.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Estate Agency</h2>
              <p>Our agency services connect buyers with sellers and tenants with landlords, ensuring smooth transactions and valuable market opportunities.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Project Consultancy</h2>
              <p>We offer expert guidance throughout development projects, from feasibility studies to completion, ensuring successful outcomes.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Valuation Services</h2>
              <p>Our professional valuation services provide accurate assessments for residential, commercial, and industrial properties.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function Router() {
  // HomePage is directly defined above in this file
  return (
    <Switch>
      <Route path="/" component={() => HomePage()} />
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/property/:id" component={PropertyDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/directors" component={DirectorsPage} />
      <ProtectedRoute path="/admin" component={Dashboard} />
      <ProtectedRoute path="/admin/properties" component={PropertyList} />
      <ProtectedRoute path="/admin/properties/new" component={PropertyForm} />
      <ProtectedRoute path="/admin/properties/edit/:id" component={PropertyForm} />
      <ProtectedRoute path="/admin/inquiries" component={Inquiries} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
