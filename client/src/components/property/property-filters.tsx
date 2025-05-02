import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { 
  Card,
  CardContent 
} from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type FilterOptions = {
  locations: string[];
  propertyTypes: string[];
};

type PropertyFiltersProps = {
  onFilterChange: (filters: {
    location: string;
    propertyType: string;
    priceRange: string;
  }) => void;
  initialFilters?: {
    location?: string;
    propertyType?: string;
    priceRange?: string;
  }
};

export default function PropertyFilters({ onFilterChange, initialFilters }: PropertyFiltersProps) {
  const [location, setLocation] = useState(initialFilters?.location || 'all');
  const [propertyType, setPropertyType] = useState(initialFilters?.propertyType || 'all');
  const [priceRange, setPriceRange] = useState(initialFilters?.priceRange || 'all');
  
  // Fetch filter options (locations, property types)
  const { data: filterOptions, isLoading } = useQuery<FilterOptions>({
    queryKey: ['/api/properties/filter-options'],
    // Default queryFn will be used from queryClient
  });
  
  const handleApplyFilters = () => {
    onFilterChange({
      location,
      propertyType,
      priceRange
    });
  };
  
  // Apply filters when component mounts
  useEffect(() => {
    handleApplyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Capitalize property types for display
  const formatPropertyType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <Card className="bg-white rounded-lg shadow-md p-4 mb-10">
      <CardContent className="p-0">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto flex-1">
            <Label className="block text-sm font-medium text-neutral mb-1">Location</Label>
            <Select 
              value={location}
              onValueChange={setLocation}
            >
              <SelectTrigger className="w-full px-3 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-secondary">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {filterOptions?.locations?.map((loc: string) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto flex-1">
            <Label className="block text-sm font-medium text-neutral mb-1">Property Type</Label>
            <Select 
              value={propertyType}
              onValueChange={setPropertyType}
            >
              <SelectTrigger className="w-full px-3 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-secondary">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {filterOptions?.propertyTypes?.map((type: string) => (
                  <SelectItem key={type} value={type.toLowerCase()}>{formatPropertyType(type)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto flex-1">
            <Label className="block text-sm font-medium text-neutral mb-1">Price Range</Label>
            <Select 
              value={priceRange}
              onValueChange={setPriceRange}
            >
              <SelectTrigger className="w-full px-3 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-secondary">
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="100000-250000">KES 100k - 250k</SelectItem>
                <SelectItem value="250000-500000">KES 250k - 500k</SelectItem>
                <SelectItem value="500000-1000000">KES 500k - 1M</SelectItem>
                <SelectItem value="1000000-10000000">KES 1M - 10M</SelectItem>
                <SelectItem value="10000000-99999999">KES 10M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto flex items-end">
            <Link
              href="/properties"
              className="w-full px-4 py-2 bg-secondary hover:bg-secondary-light text-white font-montserrat font-medium rounded-md text-center flex items-center justify-center transition-colors duration-200"
            >
              View Properties
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
