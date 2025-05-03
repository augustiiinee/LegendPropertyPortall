import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Director } from "@shared/schema";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

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
    <main className="pt-24 pb-16 bg-white">
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
            <div className="space-y-12 mt-12 max-w-5xl mx-auto">
              {leadershipsData.map((director) => (
                <div key={director.id} className="border-l-4 border-primary pl-6 py-2">
                  <div className="mb-4">
                    <h3 className="font-montserrat font-bold text-2xl text-primary">{director.name}</h3>
                    <p className="text-secondary font-medium">{director.position}</p>
                  </div>
                  
                  <p className="text-neutral-700 mb-4">{director.bio}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
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
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-16 max-w-4xl mx-auto border-t border-neutral-200 pt-12">
            <div className="bg-primary/10 p-8 rounded-lg text-center">
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-primary">Our Company Mission</h3>
              <p className="mb-6 text-neutral-700">
                At Legend Management Limited, we strive to provide exceptional property management services with integrity, 
                professionalism and dedication. Our mission is to deliver unparalleled value to property owners and clients 
                while maintaining the highest standards of excellence in the real estate industry.
              </p>
              <p className="mb-8 text-neutral-700">
                With operations in Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nanyuki, we are committed to 
                developing innovative solutions that meet the diverse needs of our clients throughout Kenya.
              </p>
              <a 
                href="/#contact" 
                className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition font-medium"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}