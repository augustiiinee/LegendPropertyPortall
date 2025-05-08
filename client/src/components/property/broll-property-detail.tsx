import { Property } from '@shared/types';
import { useState } from 'react';

type BrollPropertyDetailProps = {
  property: Property;
};

export default function BrollPropertyDetail({ property }: BrollPropertyDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Property Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Gallery Tab Header */}
            <div className="border-b border-gray-200">
              <div className="bg-red-600 text-white px-4 py-2 inline-block font-medium">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <span>GALLERY</span>
                </div>
              </div>
            </div>
            
            {/* Property Image Carousel */}
            <div className="p-4">
              <div className="relative mb-6 aspect-video">
                {property.featured && (
                  <div className="absolute top-2 left-2 z-10">
                    <div className="bg-red-600 text-white px-3 py-1 text-sm font-medium">
                      FEATURED
                    </div>
                  </div>
                )}
                
                {/* Property Image */}
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={property.images[activeImageIndex]} 
                    alt={property.title}
                    className="w-full h-full object-cover rounded"
                    loading="eager"
                    fetchPriority="high"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/properties/placeholder.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {/* Web Ref */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 text-sm">
                  Web Ref LM{property.id}
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              {property.images && property.images.length > 1 && (
                <div className="flex space-x-2 mb-6 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer transition-all duration-200 ${activeImageIndex === index ? 'ring-2 ring-red-600' : 'opacity-70 hover:opacity-100'}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="h-16 w-24 object-cover rounded"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/images/properties/placeholder.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Property Overview */}
              <div className="space-y-6">
                {/* Property Summary */}
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{property.title}</h1>
                    <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-md text-sm font-semibold">
                      {property.status}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{property.location}</span>
                  </div>
                </div>
                
                {/* Price Section */}
                {property.title.includes('National Bank') ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-gray-100 py-4">
                    <div className="text-center">
                      <div className="text-gray-600 text-sm mb-1">Rent</div>
                      <div className="font-bold text-xl text-red-600">Ksh 90/sqft</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-100">
                      <div className="text-gray-600 text-sm mb-1">Service Charge</div>
                      <div className="font-bold text-xl text-red-600">Ksh 36/sqft</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 text-sm mb-1">Parking</div>
                      <div className="font-bold text-xl text-red-600">Ksh 10,000/month</div>
                    </div>
                  </div>
                ) : property.title.includes('Blueshield') ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-gray-100 py-4">
                    <div className="text-center">
                      <div className="text-gray-600 text-sm mb-1">Rent</div>
                      <div className="font-bold text-xl text-red-600">Ksh 75/sqft</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-100">
                      <div className="text-gray-600 text-sm mb-1">Service Charge</div>
                      <div className="font-bold text-xl text-red-600">Ksh 25/sqft</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 text-sm mb-1">Parking</div>
                      <div className="font-bold text-xl text-red-600">Ksh 10,000/month</div>
                    </div>
                  </div>
                ) : property.title.includes('Finance House') ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-gray-100 py-4">
                    <div className="text-center">
                      <div className="text-gray-600 text-sm mb-1">Rent</div>
                      <div className="font-bold text-xl text-red-600">Ksh 85/sqft</div>
                    </div>
                    <div className="text-center border-l border-gray-100">
                      <div className="text-gray-600 text-sm mb-1">Service Charge</div>
                      <div className="font-bold text-xl text-red-600">Ksh 30/sqft</div>
                    </div>
                  </div>
                ) : property.type === 'residential' ? (
                  <div className="flex items-center border-t border-b border-gray-100 py-4">
                    <div className="mr-3 text-gray-700 font-medium">Price:</div>
                    <div className="font-bold text-xl text-red-600">
                      {property.price ? (
                        <span>Ksh {property.price.toLocaleString()}</span>
                      ) : (
                        <span>Contact for pricing</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center border-t border-b border-gray-100 py-4">
                    <div className="mr-3 text-gray-700 font-medium">Price:</div>
                    <div className="font-bold text-xl text-red-600">
                      {property.price ? (
                        <span>Ksh {property.price.toLocaleString()}/sqft</span>
                      ) : (
                        <span>Contact for pricing</span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Description */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Description</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {property.description.split('\n\n')[0].split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
                
                {/* Additional Information Sections */}
                {property.description.split('\n\n').slice(1).map((paragraph, index) => {
                  if (paragraph.startsWith('Pricing') || paragraph.startsWith('Amenities') || paragraph.startsWith('Contact Information')) {
                    // Extract the title and content
                    const [title, ...content] = paragraph.split('\n');
                    return (
                      <div key={index} className="mt-6">
                        <h3 className="text-lg font-bold mb-3">{title}</h3>
                        <div className="whitespace-pre-line leading-relaxed text-gray-700">{content.join('\n')}</div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="mt-6">
                        <h3 className="text-lg font-bold mb-3">Additional Information</h3>
                        <p className="whitespace-pre-line leading-relaxed text-gray-700">{paragraph}</p>
                      </div>
                    );
                  }
                })}
                
                {/* Features List */}
                {property.features && property.features.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Contact and Property Info */}
        <div className="lg:col-span-1">
          {/* Contact Form Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">Contact</h3>
            
            <div className="space-y-3">
              
              {property.id === 10 ? (
                <>
                  <div className="text-gray-700">
                    <h4 className="text-lg text-slate-700 font-medium">Contact Legend Management</h4>
                    <div className="text-red-600 mb-6 text-lg">
                      <span className="flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        0704039929
                      </span>
                    </div>
                    
                    <div className="flex space-x-2 mb-4">
                      <button 
                        onClick={() => window.open(`https://wa.me/254704039929?text=I'm interested in ${property.title}%0A%0A*Property Reference ID:* LM-${property.id.toString().padStart(4, '0')}%0A%0APlease send me more information about this property.`, '_blank')}
                        className="flex-1 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
                        </svg>
                        <span>WhatsApp</span>
                      </button>
                      <button 
                        onClick={() => window.open(`tel:+254704039929`, '_blank')}
                        className="flex-1 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span>Call</span>
                      </button>
                    </div>
                    
                    <div className="text-gray-700 space-y-1 mt-4">
                      <p className="flex items-center text-red-600">
                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        To Arrange a Viewing or Get More Details:
                      </p>
                      <p>Legend Management Ltd.</p>
                      <p>Tel: 0704039929</p>
                      <p>Email: beth@propertylegend.com</p>
                      <p className="bg-amber-50 p-2">Address: Uchumi House 9th floor, Aga Khan Walk, CBD, Nairobi.</p>
                      
                      <div className="flex mt-2 space-x-2 text-sm">
                        <button 
                          onClick={() => window.open(`https://wa.me/254704039929?text=I'm interested in ${property.title}%0A%0A*Property Reference ID:* LM-${property.id.toString().padStart(4, '0')}%0A%0APlease send me more information about this property.`, '_blank')}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
                          </svg>
                          <span>WhatsApp</span>
                        </button>
                        <button 
                          onClick={() => window.open(`tel:+254704039929`, '_blank')}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <span>Call</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <div className="font-bold">Contact Legend Management</div>
                    <div className="text-red-600 hover:underline cursor-pointer flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>
                        {property.description.includes('Tel:') 
                          ? property.description.split('Tel:')[1].split('\n')[0].trim()
                          : '0791181166'
                        }
                      </span>
                    </div>
                  </div>
                  
                  {/* Quick Contact Buttons */}
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
                  
                  <div className="text-sm text-gray-600">
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
                        <p className="mb-0.5">Property Ref: LM-{property.id.toString().padStart(4, '0')}</p>
                      </>
                    )}
                  </div>
                </>
              )}
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
              {property.type === 'residential' && (
                <>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Bedrooms:</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Bathrooms:</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Property Manager:</span>
                <span className="font-medium">
                  {property.id === 10 ? 'Beth Mwendwa' : 'Legend Management Ltd'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Similar Properties */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="font-bold text-lg mb-4">Similar Properties</h3>
            <div className="text-center text-gray-500 py-4">
              Explore more properties from Legend Management Ltd
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}