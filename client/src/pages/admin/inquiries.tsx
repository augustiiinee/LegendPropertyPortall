import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Inquiry } from '@shared/types';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  Loader2,
  Mail,
  Check,
  X,
  MessageCircle,
  Calendar,
  User,
  Mail as MailIcon,
  Phone,
  Home,
} from 'lucide-react';
import AdminLayout from '@/components/layout/admin-layout';

export default function Inquiries() {
  const { toast } = useToast();
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Get inquiries with filters
  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ['/api/inquiries', { search: searchTerm, status: statusFilter }],
  });

  // Update inquiry status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest('PATCH', `/api/inquiries/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
      toast({
        title: 'Status updated',
        description: 'The inquiry status has been successfully updated.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating status',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  const handleStatusChange = (inquiryId: number, newStatus: string) => {
    updateStatusMutation.mutate({ id: inquiryId, status: newStatus });
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };
  
  // Get badge color based on status
  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'new':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'resolved':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Customer Inquiries</h1>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Inquiries List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading inquiries...</span>
          </div>
        ) : inquiries && inquiries.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                        {inquiry.subject}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {formatDate(inquiry.createdAt)}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(inquiry.status)}>
                      {inquiry.status === 'in-progress' ? 'In Progress' : 
                       inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{inquiry.name}</span>
                      </div>
                      <div className="flex items-center">
                        <MailIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{inquiry.email}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{inquiry.phone}</span>
                    </div>
                    
                    {inquiry.propertyId && (
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          <a 
                            href={`/property/${inquiry.propertyId}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-secondary hover:underline"
                          >
                            View Related Property
                          </a>
                        </span>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Message:</h4>
                      <p className="text-sm text-muted-foreground bg-neutral-lightest p-3 rounded-md">
                        {inquiry.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="pt-4 flex justify-between">
                  <Select 
                    value={inquiry.status} 
                    onValueChange={(value) => handleStatusChange(inquiry.id, value)}
                    disabled={updateStatusMutation.isPending}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${inquiry.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Reply
                      </a>
                    </Button>
                    
                    {inquiry.status !== 'resolved' && (
                      <Button 
                        size="sm"
                        variant="default"
                        onClick={() => handleStatusChange(inquiry.id, 'resolved')}
                        disabled={updateStatusMutation.isPending}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No inquiries found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                There are no customer inquiries matching your current filters. Try changing your filter criteria or check back later.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
