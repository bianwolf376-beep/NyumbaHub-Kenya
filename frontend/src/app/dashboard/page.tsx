'use client';

import { useAuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Heart, Calendar, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome, {user.fullName}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your properties, bookings, and account
          </p>
        </div>

        {/* Dashboard Content Based on Role */}
        {user.role === 'LANDLORD' ? (
          // Landlord Dashboard
          <Tabs defaultValue="properties" className="space-y-4">
            <TabsList>
              <TabsTrigger value="properties">
                <Home className="h-4 w-4 mr-2" />
                My Properties
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <Calendar className="h-4 w-4 mr-2" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Properties</CardTitle>
                  <CardDescription>Manage your property listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border">
                      <CardContent className="p-6">
                        <div className="bg-slate-200 dark:bg-slate-700 h-40 rounded-lg mb-4" />
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                          Sample Property
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Westlands, Nairobi
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          Edit
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  <Button className="mt-6">
                    Add New Property
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visit Requests</CardTitle>
                  <CardDescription>Manage property viewing requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">No visit requests yet</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</p>
                      <p className="text-slate-900 dark:text-white">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</p>
                      <p className="text-slate-900 dark:text-white">{user.phone}</p>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          // Tenant Dashboard
          <Tabs defaultValue="favorites" className="space-y-4">
            <TabsList>
              <TabsTrigger value="favorites">
                <Heart className="h-4 w-4 mr-2" />
                Saved Properties
              </TabsTrigger>
              <TabsTrigger value="visits">
                <Calendar className="h-4 w-4 mr-2" />
                Visit Requests
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Properties</CardTitle>
                  <CardDescription>Your favorite property listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">No saved properties yet</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visits" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visit Requests</CardTitle>
                  <CardDescription>Your scheduled property viewings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">No visit requests yet</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</p>
                      <p className="text-slate-900 dark:text-white">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</p>
                      <p className="text-slate-900 dark:text-white">{user.phone}</p>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
