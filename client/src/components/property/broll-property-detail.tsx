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
              <div className="relative mb-6">
                {property.featured && (
                  <div className="absolute top-2 left-2 z-10">
                    <div className="bg-red-600 text-white px-3 py-1 text-sm font-medium">
                      FEATURED
                    </div>
                  </div>
                )}
                
                {/* Property Image - Improved to show complete images */}
                {property.images && property.images.length > 0 ? (
                  <div className="w-full h-auto max-h-[600px] overflow-hidden flex justify-center items-center bg-gray-100">
                    <img 
                      src={property.images[activeImageIndex]} 
                      alt={property.title}
                      className="w-auto h-auto max-w-full max-h-[600px] object-contain"
                      loading="eager"
                      fetchPriority="high"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/images/properties/placeholder.jpg';
                      }}
                    />
                  </div>
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
        
        {/* Right Column - Property Info */}
        <div className="lg:col-span-1">
          
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