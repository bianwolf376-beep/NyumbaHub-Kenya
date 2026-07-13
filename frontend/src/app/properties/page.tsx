'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Bed, Bath, Star, ChevronDown } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  rating: number;
  reviews: number;
  propertyType: string;
}

const ALL_PROPERTIES: Property[] = [
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
    propertyType: 'apartment',
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
    propertyType: 'apartment',
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
    propertyType: 'villa',
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
    propertyType: 'studio',
  },
  {
    id: '5',
    title: 'Luxury 4-Bedroom in Upper Hill',
    location: 'Upper Hill, Nairobi',
    price: 'KES 85,000',
    bedrooms: 4,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=350&fit=crop',
    rating: 4.9,
    reviews: 28,
    propertyType: 'villa',
  },
];

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>(ALL_PROPERTIES);
  const [filters, setFilters] = useState({
    county: searchParams?.get('county') || '',
    type: searchParams?.get('type') || '',
    price: searchParams?.get('price') || '',
    bedrooms: '',
    search: '',
  });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Apply filters
    let filtered = [...ALL_PROPERTIES];

    if (filters.type) {
      filtered = filtered.filter((p) => p.propertyType.includes(filters.type.toLowerCase()));
    }

    if (filters.search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.bedrooms) {
      const bedCount = parseInt(filters.bedrooms);
      filtered = filtered.filter((p) => p.bedrooms === bedCount);
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setProperties(filtered);
  }, [filters, sortBy]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Find Properties
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Showing {properties.length} properties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Filters</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Search
                </label>
                <Input
                  type="text"
                  name="search"
                  placeholder="Search properties..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="w-full"
                />
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                >
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="studio">Studio</option>
                  <option value="bedsitter">Bedsitter</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Bedrooms
                </label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                >
                  <option value="">Any</option>
                  <option value="0">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Price Range
                </label>
                <select
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                >
                  <option value="">Any Price</option>
                  <option value="0-20000">Under 20K</option>
                  <option value="20000-50000">20K - 50K</option>
                  <option value="50000-100000">50K - 100K</option>
                  <option value="100000+">Above 100K</option>
                </select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  setFilters({
                    county: '',
                    type: '',
                    price: '',
                    bedrooms: '',
                    search: '',
                  })
                }
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {/* Sort */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-slate-600 dark:text-slate-400">
                {properties.length} results found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Properties Grid */}
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <Link key={property.id} href={`/properties/${property.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-700">
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
                          <span className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            {property.bedrooms} Bed
                          </span>
                          <span className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            {property.bathrooms} Bath
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-yellow-500 font-semibold">{property.rating}</span>
                          </div>
                          <span className="text-slate-600 dark:text-slate-400 ml-2">({property.reviews} reviews)</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400 mb-4">No properties found</p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      county: '',
                      type: '',
                      price: '',
                      bedrooms: '',
                      search: '',
                    })
                  }
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
