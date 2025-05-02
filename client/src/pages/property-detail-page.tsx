import { useState } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Property } from '@shared/types';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PropertyDetail from '@/components/property/property-detail';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Form schema for inquiry
const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Fetch property details
  const { data: property, isLoading, isError } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
  });
  
  // Create inquiry form
  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  
  // Submit inquiry mutation
  const inquiryMutation = useMutation({
    mutationFn: async (data: InquiryFormValues) => {
      const res = await apiRequest("POST", "/api/inquiries", {
        ...data,
        subject: `Inquiry about ${property?.title}`,
        propertyId: parseInt(id),
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      setDialogOpen(false);
      // Invalidate queries that might include this inquiry
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send inquiry",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: InquiryFormValues) => {
    inquiryMutation.mutate(data);
  };
  
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-2">Property Not Found</h1>
            <p className="text-neutral-dark">The property you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-6" asChild>
              <a href="/properties">View All Properties</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-neutral-lightest">
        {isLoading ? (
          <div className="container mx-auto px-4 flex justify-center items-center" style={{ minHeight: '60vh' }}>
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading property details...</span>
          </div>
        ) : (
          <>
            <PropertyDetail propertyId={id} />
            
            <div className="container mx-auto px-4 mt-8 text-center">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Interested in this property?</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-secondary hover:bg-secondary-light">
                    Make an Inquiry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Property Inquiry</DialogTitle>
                    <DialogDescription>
                      Fill out the form below and our team will get back to you about this property.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write your message" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter className="mt-6">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setDialogOpen(false)}
                          disabled={inquiryMutation.isPending}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={inquiryMutation.isPending}
                        >
                          {inquiryMutation.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Send Inquiry'
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
