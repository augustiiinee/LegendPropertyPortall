import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Director } from "@shared/schema";
import SectionHeading from "@/components/ui/section-heading";

export default function DirectorsPage() {
  const { data: directors, isLoading, error } = useQuery<Director[]>({
    queryKey: ["/api/directors"],
    queryFn: getQueryFn({ on401: "throw" })
  });

  return (
    <main className="pt-24 pb-16">
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Leadership Team"
            description="Meet the experienced professionals leading Legend Management Ltd"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {directors?.map((director) => (
                <div key={director.id} className="bg-neutral-lightest rounded-lg shadow-sm overflow-hidden transition transform hover:-translate-y-1 hover:shadow-md">
                  <div className="aspect-w-4 aspect-h-3 bg-neutral-light">
                    <img 
                      src={director.imageUrl || 'https://via.placeholder.com/400x300?text=Director'} 
                      alt={director.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-montserrat font-semibold text-xl text-primary mb-1">{director.name}</h3>
                    <p className="text-secondary mb-4">{director.position}</p>
                    <p className="text-neutral-dark mb-4">{director.bio}</p>
                    
                    <div className="flex space-x-3">
                      {director.email && (
                        <a 
                          href={`mailto:${director.email}`} 
                          className="text-primary hover:text-secondary transition"
                          aria-label={`Email ${director.name}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </a>
                      )}
                      
                      {director.phone && (
                        <a 
                          href={`tel:${director.phone}`} 
                          className="text-primary hover:text-secondary transition"
                          aria-label={`Call ${director.name}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </a>
                      )}
                      
                      {director.linkedin && (
                        <a 
                          href={director.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:text-secondary transition"
                          aria-label={`${director.name}'s LinkedIn profile`}
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-16 max-w-3xl mx-auto bg-primary text-white p-8 rounded-lg">
            <h3 className="font-montserrat font-semibold text-xl mb-4">Join Our Leadership Team</h3>
            <p className="mb-6">
              We're always looking for talented professionals to join our team. If you're passionate about real estate and property management, we'd love to hear from you.
            </p>
            <a 
              href="/#contact" 
              className="inline-block bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-md transition transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}