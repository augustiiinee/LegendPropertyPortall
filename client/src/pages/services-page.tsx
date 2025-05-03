import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
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
    },
    {
      title: "Property Valuation",
      description: "We deliver reliable, objective valuation services across multiple asset classes for financing, insurance, and more.",
      icon: "📊",
      features: [
        "Residential property valuation",
        "Commercial property valuation",
        "Asset valuation for financial reporting",
        "Insurance valuation",
        "Portfolio valuation"
      ]
    },
    {
      title: "Rental Assessment",
      description: "Our rental assessment services help landlords set appropriate rental rates and tenants ensure they're paying fair market value.",
      icon: "💹",
      features: [
        "Market rate analysis",
        "Property condition assessment",
        "Competitive positioning",
        "Rental yield optimization",
        "Regular rent reviews"
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
              At Legend Management Limited, we provide an integrated suite of real estate services tailored to meet the diverse needs of individual clients, corporations, and institutions.
            </p>
          </div>
        </div>
        
        {/* Services List */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="border-b border-amber-100">
                  <div className="bg-amber-50 p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-3">{service.icon}</span>
                      <h2 className="text-2xl font-semibold text-primary">{service.title}</h2>
                    </div>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </div>
                <div className="p-6">
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
          
          {/* Additional Information */}
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Why Choose Legend Management Limited?</h2>
            <p className="text-gray-700 mb-8">
              With over 22 years of industry experience, our operations are rooted in professional integrity, 
              industry expertise, and a commitment to client satisfaction. Our presence across major Kenyan cities 
              ensures we can provide localized services with a national perspective.
            </p>
            <div className="inline-block">
              <a 
                href="/#contact" 
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
              >
                Contact Us for a Consultation
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}