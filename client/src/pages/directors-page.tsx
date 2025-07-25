import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Director } from "@shared/schema";
import SectionHeading from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Award, Briefcase, MapPin } from "lucide-react";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function DirectorsPage() {
  const { data: directors, isLoading, error } = useQuery<Director[]>({
    queryKey: ["/api/directors"],
    queryFn: getQueryFn({ on401: "throw" })
  });

  // Directors data
  const leadershipsData = [
    {
      id: 1,
      name: "Mr. Geoffrey Koros",
      position: "Chief Executive Officer",
      bio: "An experienced Property Consultant with more than 15 years' experience in the property sector. He has conducted assignments involving Valuation, Property Management, and Feasibility/Investment Appraisal and Project Management. He is currently the Chief Executive Officer of Legend Management Limited."
    },
    {
      id: 2,
      name: "Mr. David C. Ruto",
      position: "Director",
      bio: "A very experienced Property Consultant with 33 years' experience. He has conducted assignments involving Valuation, Property Management and Feasibility/Investment Appraisal and Project Management. He is currently a Director of Legend Management Limited."
    },
    {
      id: 3,
      name: "Mr. Boniface K. Terer",
      position: "Director",
      bio: "A very experienced Property Consultant with 31 years of experience in the property sector. He has conducted assignments involving Property Management, Valuation, and Feasibility/Investment Appraisal and Project Management. He is currently a Director at Legend Management Limited."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 bg-amber-50/30">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-b from-amber-100 to-transparent pb-12 mb-12 rounded-lg">
              <SectionHeading
                title="Board of Directors"
                description="Meet our expert Property Consultants with over 79 years of combined industry experience"
                alignment="center"
              />
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                Failed to load directors information. Please try again later.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {leadershipsData.map((director, index) => (
                  <Card key={director.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-200">
                    <div className="h-20 bg-gradient-to-r from-amber-500 to-primary flex items-center justify-center text-white">
                      <h3 className="font-montserrat text-xl tracking-wide text-white">{director.name}</h3>
                    </div>
                    <CardContent className="p-6 bg-amber-50/50">
                      <div className="flex flex-col">
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1 bg-amber-100 py-1 px-3 rounded-full w-fit">
                            <Briefcase className="h-4 w-4 text-amber-700" />
                            <p className="text-amber-800">{director.position}</p>
                          </div>
                        </div>
                        
                        <p className="text-neutral-700 mb-6 border-l-4 border-amber-400 pl-4 py-2 bg-amber-50 text-sm">{director.bio}</p>
                        
                        <div className="mt-6 pt-4 border-t border-amber-200">
                          <div className="flex items-start gap-2">
                            <Award className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-neutral-600">
                              Professional certifications in Real Estate Management and Property Development
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="mt-16 max-w-4xl mx-auto">
              {/* Our Services Section */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">Our Services</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-amber-200">
                  <p className="text-lg mb-6">
                    At Legend Management Limited, we provide an integrated suite of real estate services designed to meet the diverse needs of property owners, investors, institutions, and individuals. With shared leadership and expertise from our sister company, Legend Valuers Limited, we combine in-depth industry knowledge, regulatory understanding, and market analysis to deliver results-driven solutions in the following core areas:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-amber-700 mb-2">Property Management</h3>
                      <p className="mb-2">
                        We manage properties with the aim of maximising returns and preserving long-term value.
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 text-neutral-700">
                        <li>Lease Administration</li>
                        <li>Rent Collection and Arrears Management</li>
                        <li>Maintenance Coordination</li>
                        <li>Facilities Management</li>
                        <li>Regulatory Compliance</li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-amber-700 mb-2">Estate Agency</h3>
                      <p className="mb-2">
                        Our services are designed to simplify property transactions and connect clients to valuable real estate opportunities.
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 text-neutral-700">
                        <li>Sales and Acquisitions</li>
                        <li>Letting Services</li>
                        <li>Market Research and Advisory</li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-amber-700 mb-2">Project Consultancy</h3>
                      <p className="mb-2">
                        We provide strategic advice throughout the property development lifecycle.
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 text-neutral-700">
                        <li>Project Feasibility and Planning</li>
                        <li>Development Coordination</li>
                        <li>Investment Appraisal</li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-amber-700 mb-2">Valuation</h3>
                      <p className="mb-2">
                        We deliver reliable, objective valuation services across multiple asset classes.
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 text-neutral-700">
                        <li>Mortgage Valuations</li>
                        <li>Public Auction & Forced Sale</li>
                        <li>Insurance Valuation</li>
                        <li>Agricultural Valuation</li>
                        <li>Rental Assessment</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <a 
                      href="/services" 
                      className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition duration-300"
                    >
                      View Full Services
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Company Mission */}
              <Card className="border-none shadow-lg overflow-hidden border-2 border-amber-200">
                <div className="bg-gradient-to-r from-amber-500 to-primary text-white p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="h-8 w-8" />
                    <h3 className="font-montserrat text-2xl tracking-wide text-white">Our Company Mission</h3>
                  </div>
                  <p className="mb-6 text-white/90 leading-relaxed">
                    At Legend Management Limited, we strive to provide exceptional property management services with integrity, 
                    professionalism and dedication. Our mission is to deliver unparalleled value to property owners and clients 
                    while maintaining the highest standards of excellence in the real estate industry.
                  </p>
                  <p className="text-white/90 leading-relaxed">
                    With operations in Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nanyuki, we are committed to 
                    developing innovative solutions that meet the diverse needs of our clients throughout Kenya.
                  </p>
                </div>
                <div className="p-8 bg-amber-50">
                  <h3 className="font-montserrat text-xl mb-4 text-amber-700">Contact Our Management Team</h3>
                  <div className="flex items-center gap-2 text-neutral-700 mb-4">
                    <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <p>NHIF Building, 3rd Floor, Off Ragati Road, Community/Upperhill</p>
                  </div>
                  <p className="mb-6 text-neutral-700">
                    Our leadership team is always available to address your property management needs and inquiries.
                  </p>
                  <a 
                    href="/#contact" 
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md transition duration-300"
                  >
                    Get in Touch
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}