import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Property, PropertyFormData } from '@shared/types';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  DollarSign, 
  MapPin, 
  Building2, 
  Save, 
  Loader2, 
  ArrowLeft 
} from 'lucide-react';
import AdminLayout from '@/components/layout/admin-layout';

// Form schema for validation
const propertyFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  type: z.string().min(1, "Property type is required"),
  status: z.string().min(1, "Status is required"),
  size: z.coerce.number().positive("Size must be positive"),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  offices: z.coerce.number().optional(),
  parking: z.coerce.number().optional(),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

// Feature options
const availableFeatures = [
  { id: 'airConditioning', label: 'Air Conditioning' },
  { id: 'heating', label: 'Heating' },
  { id: 'garage', label: 'Garage' },
  { id: 'pool', label: 'Swimming Pool' },
  { id: 'garden', label: 'Garden' },
  { id: 'balcony', label: 'Balcony' },
  { id: 'elevator', label: 'Elevator' },
  { id: 'securitySystem', label: 'Security System' },
  { id: 'fireplace', label: 'Fireplace' },
  { id: 'furnished', label: 'Furnished' },
];

export default function PropertyForm() {
  const { id } = useParams<{ id: string }>();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageURLInput, setImageURLInput] = useState('');

  // Fetch property if in edit mode
  const { data: property, isLoading: isLoadingProperty } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
    enabled: isEditMode,
  });
  
  // Create form with validation
  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      location: '',
      type: 'residential',
      status: 'for sale',
      size: 0,
      bedrooms: 0,
      bathrooms: 0,
      offices: 0,
      parking: 0,
      features: [],
      images: [],
    },
  });
  
  // Update form values when property data is loaded in edit mode
  useEffect(() => {
    if (property && isEditMode) {
      form.reset({
        title: property.title,
        description: property.description,
        price: property.price,
        location: property.location,
        type: property.type,
        status: property.status,
        size: property.size,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        offices: property.offices || 0,
        parking: property.parking || 0,
        features: property.features || [],
        images: property.images || [],
      });
      setImageURLs(property.images || []);
    }
  }, [property, isEditMode, form]);
  
  // Create or update property
  const savePropertyMutation = useMutation({
    mutationFn: async (data: PropertyFormData) => {
      if (isEditMode) {
        return apiRequest('PUT', `/api/properties/${id}`, data);
      } else {
        return apiRequest('POST', '/api/properties', data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/properties/admin'] });
      if (isEditMode) {
        queryClient.invalidateQueries({ queryKey: [`/api/properties/${id}`] });
      }
      
      toast({
        title: isEditMode ? 'Property updated' : 'Property created',
        description: isEditMode 
          ? 'The property has been successfully updated.' 
          : 'The property has been successfully created.',
      });
      
      navigate('/admin/properties');
    },
    onError: (error: Error) => {
      toast({
        title: isEditMode ? 'Error updating property' : 'Error creating property',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (data: z.infer<typeof propertyFormSchema>) => {
    // Ensure images array is included in the data
    const formData = {
      ...data,
      images: imageURLs
    };
    savePropertyMutation.mutate(formData);
  };
  
  const handleAddImageURL = () => {
    if (imageURLInput && imageURLInput.trim() !== '') {
      setImageURLs([...imageURLs, imageURLInput]);
      setImageURLInput('');
    }
  };
  
  const handleRemoveImageURL = (index: number) => {
    const newImageURLs = [...imageURLs];
    newImageURLs.splice(index, 1);
    setImageURLs(newImageURLs);
  };
  
  const handleGoBack = () => {
    navigate('/admin/properties');
  };
  
  // Show loading state when fetching property data for editing
  if (isEditMode && isLoadingProperty) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading property details...</span>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-primary">
              {isEditMode ? 'Edit Property' : 'Add New Property'}
            </h1>
          </div>
          
          <Button
            type="submit"
            form="property-form"
            disabled={savePropertyMutation.isPending}
          >
            {savePropertyMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Property
              </>
            )}
          </Button>
        </div>
        
        <Form {...form}>
          <form id="property-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-primary mb-4 flex items-center">
                        <Home className="h-5 w-5 mr-2" /> Basic Information
                      </h2>
                      <Separator className="mb-4" />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter property title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the property" 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="residential">Residential</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="land">Land</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="For Sale">For Sale</SelectItem>
                                <SelectItem value="For Rent">For Rent</SelectItem>
                                <SelectItem value="For Lease">For Lease</SelectItem>
                                <SelectItem value="Sold">Sold</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input placeholder="Property location" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (Ksh)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs font-medium">Ksh</span>
                              <Input 
                                type="number" 
                                placeholder="Enter price" 
                                className="pl-14"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value === "" ? "0" : e.target.value;
                                  field.onChange(value);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Property Details */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-primary mb-4 flex items-center">
                        <Building2 className="h-5 w-5 mr-2" /> Property Details
                      </h2>
                      <Separator className="mb-4" />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size (sq ft)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Property size in sq ft"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value === "" ? "0" : e.target.value;
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {form.watch('type') === 'residential' && (
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="bedrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bedrooms</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Number of bedrooms"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value === "" ? "0" : e.target.value;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bathrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bathrooms</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Number of bathrooms"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value === "" ? "0" : e.target.value;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {form.watch('type') === 'commercial' && (
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="offices"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Offices</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Number of offices"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value === "" ? "0" : e.target.value;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="parking"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parking Spots</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Number of parking spots"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value === "" ? "0" : e.target.value;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="features"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Features</FormLabel>
                            <FormDescription>
                              Select the features this property has.
                            </FormDescription>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {availableFeatures.map((feature) => (
                              <FormField
                                key={feature.id}
                                control={form.control}
                                name="features"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={feature.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(feature.label)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value || [], feature.label])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== feature.label
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {feature.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Property Images */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Property Images</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Add image URLs for the property. These will be displayed in the property listing.
                </p>
                
                <div className="flex mb-4">
                  <Input
                    placeholder="Enter image URL"
                    value={imageURLInput}
                    onChange={(e) => setImageURLInput(e.target.value)}
                    className="flex-1 mr-2"
                  />
                  <Button type="button" onClick={handleAddImageURL}>Add Image</Button>
                </div>
                
                {imageURLs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {imageURLs.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Property image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Image+Error';
                          }}
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImageURL(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
                    No images added yet. Add image URLs above.
                  </div>
                )}
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
