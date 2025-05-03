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
import ServicesPage from "@/pages/services-page";
import Dashboard from "@/pages/admin/dashboard";
import PropertyList from "@/pages/admin/property-list";
import PropertyForm from "@/pages/admin/property-form";
import Inquiries from "@/pages/admin/inquiries";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";

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
