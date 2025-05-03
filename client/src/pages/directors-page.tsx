import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Director } from "@shared/schema";
import SectionHeading from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Phone, Mail, Globe, Award, Briefcase } from "lucide-react";

export default function DirectorsPage() {
  const { data: directors, isLoading, error } = useQuery<Director[]>({
    queryKey: ["/api/directors"],
    queryFn: getQueryFn({ on401: "throw" })
  });

  // New directors data
  const leadershipsData = [
    {
      id: 1,
      name: "Ephraim Mwaura",
      position: "Managing Director",
      bio: "With over 20 years of experience in real estate management, Ephraim leads our company with a focus on innovation and client satisfaction. His industry expertise has helped establish Legend Management as a trusted name in property management across Kenya.",
      email: "ephraim@propertylegend.com",
      phone: "+254 722 123 456"
    },
    {
      id: 2,
      name: "Sarah Nyakio",
      position: "Operations Director",
      bio: "Sarah oversees all operational aspects of our business, ensuring smooth processes and exceptional service delivery. Her background in business administration and real estate operations has been instrumental in streamlining our property management systems.",
      email: "sarah@propertylegend.com",
      phone: "+254 733 987 654"
    },
    {
      id: 3,
      name: "James Kimani",
      position: "Financial Director",
      bio: "James brings financial prudence and strategic planning to our organization. With his extensive background in finance and real estate investments, he manages our financial operations and advises clients on property investment strategies.",
      email: "james@propertylegend.com",
      phone: "+254 722 456 789"
    },
    {
      id: 4,
      name: "Elizabeth Ochieng",
      position: "Marketing Director",
      bio: "Elizabeth leads our marketing initiatives with creativity and market insight. Her innovative approach to property marketing and client engagement has significantly expanded our market presence throughout Kenya.",
      email: "elizabeth@propertylegend.com",
      phone: "+254 733 234 567"
    }
  ];

  const getRandomColor = (index: number) => {
    const colors = [
      "bg-gradient-to-br from-primary to-primary-dark",
      "bg-gradient-to-br from-secondary to-amber-700",
      "bg-gradient-to-br from-blue-700 to-blue-900",
      "bg-gradient-to-br from-emerald-600 to-emerald-800"
    ];
    return colors[index % colors.length];
  };

  return (
    <main className="pt-24 pb-16 bg-neutral-50">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Board of Directors"
            description="Meet the experienced professionals leading Legend Management Ltd with over 22 years of industry expertise"
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
                  <div className={`h-32 ${getRandomColor(index)} flex items-center justify-center text-white`}>
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-5xl font-bold">{director.name.charAt(0)}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <div className="mb-4">
                        <h3 className="font-montserrat font-bold text-2xl text-primary">{director.name}</h3>
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase className="h-4 w-4 text-secondary" />
                          <p className="text-secondary font-medium">{director.position}</p>
                        </div>
                      </div>
                      
                      <p className="text-neutral-700 mb-6 border-l-4 border-primary pl-4 italic">{director.bio}</p>
                      
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
              <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-8">
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
  );
}