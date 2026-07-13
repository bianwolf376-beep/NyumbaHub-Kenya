'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Home, Users, TrendingUp } from 'lucide-react';

interface SearchFormData {
  county: string;
  propertyType: string;
  priceRange: string;
}

const FEATURED_PROPERTIES = [
  {
    id: '1',
    title: 'Modern 2-Bedroom Apartment in Westlands',
    location: 'Westlands, Nairobi',
    price: 'KES 45,000',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=350&fit=crop',
    rating: 4.8,
    reviews: 24,
  },
  {
    id: '2',
    title: 'Cozy 1-Bedroom in Karen',
    location: 'Karen, Nairobi',
    price: 'KES 35,000',
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=350&fit=crop',
    rating: 4.6,
    reviews: 18,
  },
  {
    id: '3',
    title: 'Spacious 3-Bedroom Villa in Kileleshwa',
    location: 'Kileleshwa, Nairobi',
    price: 'KES 65,000',
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=350&fit=crop',
    rating: 4.9,
    reviews: 32,
  },
  {
    id: '4',
    title: 'Elegant Studio in Parklands',
    location: 'Parklands, Nairobi',
    price: 'KES 25,000',
    bedrooms: 0,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=350&fit=crop',
    rating: 4.7,
    reviews: 15,
  },
];

const STATS = [
  { icon: Home, label: 'Active Properties', value: '2,450+' },
  { icon: Users, label: 'Happy Tenants', value: '15,000+' },
  { icon: TrendingUp, label: 'Platform Growth', value: '250%' },
];

export default function HomePage() {
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    county: '',
    propertyType: '',
    priceRange: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results with filters
    const params = new URLSearchParams();
    if (searchForm.county) params.append('county', searchForm.county);
    if (searchForm.propertyType) params.append('type', searchForm.propertyType);
    if (searchForm.priceRange) params.append('price', searchForm.priceRange);
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Find Your Perfect Home in Kenya
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Discover thousands of properties across Kenya's 47 counties with NyumbaHub
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  County
                </label>
                <select
                  name="county"
                  value={searchForm.county}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Select County</option>
                  <option value="nairobi">Nairobi</option>
                  <option value="mombasa">Mombasa</option>
                  <option value="kisumu">Kisumu</option>
                  <option value="nakuru">Nakuru</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={searchForm.propertyType}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="bedsitter">Bedsitter</option>
                  <option value="room">Room</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Price Range
                </label>
                <select
                  name="priceRange"
                  value={searchForm.priceRange}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Any Price</option>
                  <option value="0-20000">Under 20K</option>
                  <option value="20000-50000">20K - 50K</option>
                  <option value="50000-100000">50K - 100K</option>
                  <option value="100000+">Above 100K</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button type="submit" className="w-full h-10">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center">
                  <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Properties
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Explore our handpicked selection of premium properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {FEATURED_PROPERTIES.map((property) => (
              <Link key={property.id} href={`/properties/${property.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {property.price}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-3">
                      <span>🛏️ {property.bedrooms} Bed</span>
                      <span>🚿 {property.bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-500 font-semibold">{property.rating}</span>
                      <span className="text-slate-600 dark:text-slate-400 ml-2">({property.reviews} reviews)</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/properties">
              <Button variant="outline" size="lg">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to List Your Property?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of landlords earning from their properties on NyumbaHub
          </p>
          <Link href="/register?role=landlord">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Become a Landlord
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
