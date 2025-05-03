import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import PropertiesPage from "@/pages/properties-page";
import PropertyDetailPage from "@/pages/property-detail-page";
import DirectorsPage from "@/pages/directors-page";
import AboutPage from "@/pages/about-page";
// import ServicesPage from "@/pages/services-page";
import Dashboard from "@/pages/admin/dashboard";
import PropertyList from "@/pages/admin/property-list";
import PropertyForm from "@/pages/admin/property-form";
import Inquiries from "@/pages/admin/inquiries";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CheckCircle2 } from "lucide-react";

// Inline ServicesPage component
function ServicesPage() {
  const services = [
    {
      title: "Property Management",
      description: "We manage a wide range of properties to maximize returns and preserve long-term value.",
      icon: "🏢",
      features: [
        "Regular property inspections",
        "Maintenance coordination",
        "Tenant relationship management",
        "Financial reporting",
        "Property marketing"
      ]
    },
    {
      title: "Estate Agency",
      description: "Our agency services are designed to simplify property transactions and connect clients to valuable real estate opportunities.",
      icon: "🔑",
      features: [
        "Property listing and marketing",
        "Buyer/tenant matching",
        "Negotiation support",
        "Transaction management",
        "Market analysis"
      ]
    },
    {
      title: "Project Consultancy",
      description: "We provide strategic advice throughout the property development lifecycle, helping clients bring their visions to life.",
      icon: "📋",
      features: [
        "Feasibility studies",
        "Project planning",
        "Budget management",
        "Contractor coordination",
        "Quality assurance"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-neutral-100 pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-primary text-white py-12 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto text-amber-100">
              At Legend Management Limited, we provide comprehensive property management services tailored to meet your needs.
            </p>
          </div>
        </div>
        
        {/* Services List */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-3">{service.icon}</span>
                    <h2 className="text-2xl font-semibold text-primary">{service.title}</h2>
                  </div>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <h3 className="font-semibold text-lg mb-3 text-primary">Key Services:</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
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
