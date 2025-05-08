import { Property } from '@shared/types';

type UchumiHouseGalleryProps = {
  property: Property;
};

export default function UchumiHouseGallery({ property }: UchumiHouseGalleryProps) {
  return (
    <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm">
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
      
      {/* Property Image */}
      <div className="p-4">
        <div className="relative mb-6 aspect-video">
          {property.featured && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-red-600 text-white px-3 py-1 text-sm font-medium">
                FEATURED
              </div>
            </div>
          )}
          
          <img 
            src="/images/properties/uchumi/main.jpg" 
            alt={property.title}
            className="w-full h-full object-cover rounded"
          />
          
          {/* Web Ref */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 text-sm">
            Web Ref LM{property.id}
          </div>
        </div>
      </div>
    </div>
  );
}