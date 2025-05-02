import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PropertyCard from '@/components/property/property-card';
import SectionHeading from '@/components/ui/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Property } from '@shared/types';

export default function PropertyShowcase() {
  const [accordionValue, setAccordionValue] = useState<string>("item-1"); // Default to open
  
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties', { limit: 3 }],
    // Default queryFn will be used from queryClient
  });
  
  return (
    <section id="properties" className="py-16 md:py-24 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Properties"
          description="Browse our exclusive selection of properties available for sale through our recently awarded tender."
        />
        
        <Accordion 
          type="single" 
          collapsible 
          className="w-full" 
          value={accordionValue} 
          onValueChange={setAccordionValue}
        >
          <AccordionItem value="item-1" className="border-0">
            <div className="flex justify-between items-center border-b-2 border-gray-100 pb-2">
              <div className="flex-1">
                <AccordionTrigger className="flex items-center py-0 hover:no-underline [&>svg]:hidden w-full justify-start cursor-pointer">
                  <div className="flex items-center group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h3 className="text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">Latest Properties</h3>
                    <ChevronDown className={`h-4 w-4 ml-2 text-blue-500 transition-transform duration-200 ${accordionValue === "item-1" ? "rotate-180" : ""} group-hover:text-blue-600`} />
                  </div>
                </AccordionTrigger>
              </div>
              <Link href="/properties" className="flex items-center text-blue-500 hover:text-blue-700 font-medium transition-colors text-sm ml-4">
                View All Properties
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <AccordionContent className="mt-6 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                {isLoading ? (
                  // Skeleton loaders for properties
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-56 bg-neutral-light animate-pulse"></div>
                      <div className="p-5 space-y-3">
                        <div className="h-6 bg-neutral-light animate-pulse rounded"></div>
                        <div className="h-4 bg-neutral-light animate-pulse rounded w-3/4"></div>
                        <div className="flex justify-between">
                          <div className="h-4 bg-neutral-light animate-pulse rounded w-1/4"></div>
                          <div className="h-4 bg-neutral-light animate-pulse rounded w-1/4"></div>
                          <div className="h-4 bg-neutral-light animate-pulse rounded w-1/4"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="h-6 bg-neutral-light animate-pulse rounded w-1/3"></div>
                          <div className="h-4 bg-neutral-light animate-pulse rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : properties && properties.length > 0 ? (
                  properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
                    <p className="text-neutral-dark">No properties found matching your criteria.</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
