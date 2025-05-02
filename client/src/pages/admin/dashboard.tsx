import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Home,
  Building2,
  Map,
  Users,
  MessageSquare,
  Eye,
  ChevronRight,
  BarChart3,
  PieChart as PieChartIcon,
} from 'lucide-react';
import AdminLayout from '@/components/layout/admin-layout';
import { DashboardStats } from '@shared/types';

// Colors for charts
const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export default function Dashboard() {
  const [selectedChart, setSelectedChart] = useState<'bar' | 'pie'>('bar');
  const { user } = useAuth();

  const { data: dashboardStats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/admin/dashboard-stats'],
  });

  const propertyTypeData = dashboardStats?.propertyTypeDistribution || [
    { name: 'Residential', value: 0 },
    { name: 'Commercial', value: 0 },
    { name: 'Land', value: 0 },
  ];

  const inquiryData = dashboardStats?.inquiriesByMonth || [
    { name: 'Jan', count: 0 },
    { name: 'Feb', count: 0 },
    { name: 'Mar', count: 0 },
    { name: 'Apr', count: 0 },
    { name: 'May', count: 0 },
    { name: 'Jun', count: 0 },
  ];

  // Stats Cards
  const statCards = [
    {
      title: 'Total Properties',
      value: dashboardStats?.totalProperties || 0,
      icon: <Home className="h-6 w-6 text-primary" />,
      change: '+5%',
      link: '/admin/properties',
    },
    {
      title: 'Active Listings',
      value: dashboardStats?.activeListings || 0,
      icon: <Building2 className="h-6 w-6 text-secondary" />,
      change: '+12%',
      link: '/admin/properties',
    },
    {
      title: 'Total Locations',
      value: dashboardStats?.totalLocations || 0,
      icon: <Map className="h-6 w-6 text-primary" />,
      change: '+2%',
      link: '/admin/properties',
    },
    {
      title: 'Total Inquiries',
      value: dashboardStats?.totalInquiries || 0,
      icon: <MessageSquare className="h-6 w-6 text-secondary" />,
      change: '+18%',
      link: '/admin/inquiries',
    },
  ];

  const recentActivityItems = dashboardStats?.recentActivity || [];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.username || 'Admin'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                  <Link href={stat.link}>
                    <a className="text-xs text-secondary hover:underline flex items-center">
                      View <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Section */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader className="flex flex-row items-center">
            <CardTitle>Analytics Overview</CardTitle>
            <div className="ml-auto flex space-x-2">
              <Button
                variant={selectedChart === 'bar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedChart('bar')}
                className="h-8"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Inquiries
              </Button>
              <Button
                variant={selectedChart === 'pie' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedChart('pie')}
                className="h-8"
              >
                <PieChartIcon className="h-4 w-4 mr-2" />
                Property Types
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-80">
              {selectedChart === 'bar' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inquiryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--chart-1))" name="Inquiries" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-neutral-light animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-neutral-light animate-pulse rounded w-3/4"></div>
                      <div className="h-3 bg-neutral-light animate-pulse rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivityItems.length > 0 ? (
              <div className="space-y-4">
                {recentActivityItems.map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-muted p-2 rounded-full">
                      {item.type === 'view' ? (
                        <Eye className="h-4 w-4" />
                      ) : item.type === 'inquiry' ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : (
                        <Users className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.message}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
