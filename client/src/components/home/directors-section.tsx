import { useQuery } from '@tanstack/react-query';
import SectionHeading from '@/components/ui/section-heading';
import { Director } from '@shared/types';

export default function DirectorsSection() {
  const { data: directors, isLoading } = useQuery<Director[]>({
    queryKey: ['/api/directors'],
    // Default queryFn will be used from queryClient
  });
  
  return (
    <section id="directors" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Our Leadership Team"
          description="Meet the experienced professionals guiding Legend Management Limited to success."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loaders for directors
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-neutral-lightest rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-neutral-light animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-neutral-light animate-pulse rounded"></div>
                  <div className="h-4 bg-neutral-light animate-pulse rounded w-1/2"></div>
                  <div className="h-20 bg-neutral-light animate-pulse rounded"></div>
                </div>
              </div>
            ))
          ) : directors && directors.length > 0 ? (
            directors.map((director) => (
              <div key={director.id} className="bg-neutral-lightest rounded-lg overflow-hidden shadow-md text-center">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={director.imageUrl} 
                    alt={`${director.name} - ${director.position}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat font-semibold text-xl text-primary mb-1">{director.name}</h3>
                  <p className="text-secondary font-medium mb-3">{director.position}</p>
                  <p className="text-neutral-dark mb-4">{director.bio}</p>
                  <div className="flex justify-center space-x-4">
                    {director.linkedin && (
                      <a href={director.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition" aria-label="LinkedIn">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {director.email && (
                      <a href={`mailto:${director.email}`} className="text-primary hover:text-secondary transition" aria-label="Email">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
              <p className="text-neutral-dark">Director information is currently unavailable.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
