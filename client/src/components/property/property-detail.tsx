import { useQuery } from '@tanstack/react-query';
import { Property } from '@shared/types';
import BrollPropertyDetail from './broll-property-detail';
import UchumiHouseGallery from './uchumi-house-gallery';

type PropertyDetailProps = {
  propertyId: string;
};

export default function PropertyDetail({ propertyId }: PropertyDetailProps) {
  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    // Default queryFn will be used from queryClient
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
          <div className="h-96 bg-neutral-light mb-6 rounded-lg"></div>
          <div className="h-10 bg-neutral-light w-3/4 mb-4 rounded"></div>
          <div className="h-6 bg-neutral-light w-1/3 mb-6 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="h-20 bg-neutral-light rounded"></div>
            <div className="h-20 bg-neutral-light rounded"></div>
            <div className="h-20 bg-neutral-light rounded"></div>
          </div>
          <div className="h-32 bg-neutral-light rounded mb-8"></div>
        </div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
          <p>The requested property could not be found or has been removed.</p>
        </div>
      </div>
    );
  }

  // For Uchumi House property with ID 10, use the specific gallery component
  if (property.id === 10) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Property Details */}
          <div className="lg:col-span-2">
            <UchumiHouseGallery property={property} />
          </div>
          
          {/* Right Column - Use the right column from Broll Detail */}
          <div className="lg:col-span-1">
            {/* Contact Form Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">Contact</h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="font-bold">Contact Legend Management</div>
                  <div className="text-red-600 hover:underline cursor-pointer flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>0791181166</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Contact Buttons */}
              <div className="mt-6 space-y-3">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      // Try to extract phone number from the description
                      let phoneNumber = '254746369798'; // Default WhatsApp number
                      if (property.description.includes('Tel:')) {
                        const telLine = property.description.split('Tel:')[1].split('\n')[0].trim();
                        if (telLine) {
                          // Extract just the digits
                          const digitsOnly = telLine.replace(/\D/g, '');
                          if (digitsOnly.length >= 9) {
                            // Format as needed for WhatsApp - make sure it starts with 254
                            phoneNumber = digitsOnly.startsWith('0') 
                              ? `254${digitsOnly.substring(1)}` 
                              : digitsOnly.startsWith('254') 
                                ? digitsOnly 
                                : `254${digitsOnly}`;
                          }
                        }
                      }
                      window.open(`https://wa.me/${phoneNumber}?text=I'm interested in ${property.title}%0A%0A*Property Reference ID:* LM-${property.id.toString().padStart(4, '0')}%0A%0APlease send me more information about this property.`, '_blank');
                    }}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => {
                      // Try to extract phone number from the description
                      let phoneNumber = '254791181166'; // Default call number
                      if (property.description.includes('Tel:')) {
                        const telLine = property.description.split('Tel:')[1].split('\n')[0].trim();
                        if (telLine) {
                          // Extract just the digits
                          const digitsOnly = telLine.replace(/\D/g, '');
                          if (digitsOnly.length >= 9) {
                            // Format as needed for calling - make sure it starts with 254
                            phoneNumber = digitsOnly.startsWith('0') 
                              ? `254${digitsOnly.substring(1)}` 
                              : digitsOnly.startsWith('254') 
                                ? digitsOnly 
                                : `254${digitsOnly}`;
                          }
                        }
                      }
                      window.open(`tel:+${phoneNumber}`, '_blank');
                    }}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Call</span>
                  </button>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  {property.description.includes('Contact Information') ? (
                    <>
                      {property.description
                        .split('Contact Information')
                        [1]
                        .split('\n\n')[0]
                        .split('\n')
                        .map((line, index) => (
                          <p key={index} className="mb-0.5">{line}</p>
                        ))}
                    </>
                  ) : (
                    <>
                      <p className="mb-2">📞 To Arrange a Viewing or Get More Details:</p>
                      <p className="font-semibold mb-0.5">Legend Management Ltd.</p>
                      <p className="mb-0.5">Tel: 0791181166</p>
                      <p className="mb-0.5">Email: info@propertylegend.com</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Property Information Box */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <h3 className="bg-gray-100 px-4 py-2 font-bold text-lg border-b border-gray-200">Property Information</h3>
              <div className="p-4 space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium">LM-{property.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{property.location}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">{property.status}</span>
                </div>
                {property.type === 'commercial' && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Floor Space:</span>
                    <span className="font-medium">{property.size} sq ft</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Agent:</span>
                  <span className="font-medium">Legend Management Ltd</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Property Description Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">Description</h3>
          <div className="whitespace-pre-line leading-relaxed text-gray-700">{property.description}</div>
        </div>
      </div>
    );
  }

  // Use the Broll-style property detail component for all other properties
  return <BrollPropertyDetail property={property} />;
}