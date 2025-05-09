import { useQuery } from '@tanstack/react-query';
import { Property } from '@shared/types';
import BrollPropertyDetail from './broll-property-detail';
import UchumiHouseGallery from './uchumi-house-gallery';
import ImprovedPropertyGallery from './improved-property-gallery';

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
        <div className="mb-8">
          {/* Property Details */}
          <div className="w-full">
            <UchumiHouseGallery property={property} />
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

  // Use the Improved Gallery component for Utalii House
  if (property.id === 15 || property.id === 16) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Property Details */}
          <div className="w-full">
            <ImprovedPropertyGallery property={property} />
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