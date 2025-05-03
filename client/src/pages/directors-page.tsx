import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Director } from "@shared/schema";
import SectionHeading from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Phone, Mail, Award, Briefcase } from "lucide-react";
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
      name: "Mr. Boniface K. Terer",
      position: "Chief Executive Officer",
      bio: "A very experienced Property Consultant with 31 years of experience in the property sector. He has conducted assignments involving Property Management, Valuation, and Feasibility/Investment Appraisal and Project Management. He is currently Chief Executive Officer at Legend Management Limited.",
      email: "boniface@propertylegend.com",
      phone: "+254 722 123 456"
    },
    {
      id: 2,
      name: "Mr. David C. Ruto",
      position: "Director, Agency Marketing & Letting",
      bio: "A very experienced Property Consultant with 33 years' experience. He has conducted assignments involving Valuation, Property Management and Feasibility/Investment Appraisal and Project Management. He is currently a Director of Legend Management Limited in charge of Agency Marketing and Letting.",
      email: "david@propertylegend.com",
      phone: "+254 733 987 654"
    },
    {
      id: 3,
      name: "Mr. Geoffrey Koros",
      position: "Director, Property Management",
      bio: "An experienced Property Consultant with more than 15 years' experience in the property sector. He has conducted assignments involving Valuation, Property Management, and Feasibility/Investment Appraisal and Project Management. He is currently one of the Directors of Legend Management Limited in charge of the Property Management Department.",
      email: "geoffrey@propertylegend.com",
      phone: "+254 722 456 789"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Board of Directors"
              description="Meet our expert Property Consultants with over 79 years of combined industry experience"
              alignment="center"
            />
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                Failed to load directors information. Please try again later.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {leadershipsData.map((director, index) => (
                  <Card key={director.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-none">
                    <div className="h-16 bg-primary flex items-center justify-center text-white">
                      <h3 className="font-montserrat font-bold text-xl">{director.name}</h3>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="h-4 w-4 text-secondary" />
                            <p className="text-secondary font-medium">{director.position}</p>
                          </div>
                        </div>
                        
                        <p className="text-neutral-700 mb-6 border-l-4 border-primary pl-4">{director.bio}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-neutral-700">
                            <Mail className="h-4 w-4 text-primary" />
                            <a href={`mailto:${director.email}`} className="hover:text-primary transition">
                              {director.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-700">
                            <Phone className="h-4 w-4 text-primary" />
                            <a href={`tel:${director.phone}`} className="hover:text-primary transition">
                              {director.phone}
                            </a>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-neutral-200">
                          <div className="flex items-start gap-2">
                            <Award className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
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
              <Card className="border-none shadow-lg overflow-hidden">
                <div className="bg-primary text-white p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="h-8 w-8" />
                    <h3 className="font-montserrat font-bold text-2xl">Our Company Mission</h3>
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
                <div className="p-8 bg-white">
                  <h3 className="font-montserrat font-semibold text-xl mb-4 text-primary">Contact Our Management Team</h3>
                  <p className="mb-6 text-neutral-700">
                    Our leadership team is always available to address your property management needs and inquiries.
                  </p>
                  <a 
                    href="/#contact" 
                    className="inline-block bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-md transition duration-300 font-medium"
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