'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Bed, Bath, Wifi, ParkingCircle, Heart, Share2, MessageCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const PROPERTY_DATA: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Modern 2-Bedroom Apartment in Westlands',
    location: 'Westlands, Nairobi',
    price: 'KES 45,000',
    deposit: 'KES 45,000',
    serviceCharge: 'KES 2,000',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&h=700&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&h=700&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&h=700&fit=crop',
    ],
    amenities: ['WiFi', 'Parking', 'Security', 'Gym', 'Pool'],
    description: 'Beautiful modern apartment with high-quality finishes, natural light, and contemporary design. Perfect for professionals or families.',
    rating: 4.8,
    reviews: 24,
    landlord: {
      name: 'John Kamau',
      verified: true,
      responseRate: 98,
      phone: '+254712345678',
    },
  },
};

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params?.propertyId as string;
  const property = PROPERTY_DATA[propertyId] || PROPERTY_DATA['1'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleRequestVisit = () => {
    toast.success('Visit request sent!');
  };

  const handleContactLandlord = () => {
    setShowContactForm(!showContactForm);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/properties" className="flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images Section */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg mb-4">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition ${
                      idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 mb-8">
              {property.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-20 w-20 rounded-lg overflow-hidden border-2 transition ${
                    idx === currentImageIndex
                      ? 'border-blue-600'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Details */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{property.title}</h1>
                <div className="flex items-center text-slate-600 dark:text-slate-400 mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  {property.location}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Bedrooms</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{property.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Bathrooms</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{property.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Size</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{property.squareFeet} sqft</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Rating</p>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">{property.rating}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">About</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{property.description}</p>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity: string, idx: number) => (
                    <div key={idx} className="flex items-center text-slate-600 dark:text-slate-400">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <Card className="mb-6 sticky top-20">
              <CardContent className="p-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Monthly Rent</p>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{property.price}</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Deposit</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{property.deposit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Service Charge</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{property.serviceCharge}</span>
                  </div>
                </div>

                <Button className="w-full mb-3" onClick={handleRequestVisit}>
                  Request a Visit
                </Button>
                <Button
                  variant="outline"
                  className="w-full mb-3"
                  onClick={handleContactLandlord}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Landlord
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={handleAddToFavorites}
                >
                  <Heart className={`h-4 w-4 mr-2 ${
                    isFavorite ? 'fill-red-500 text-red-500' : ''
                  }`} />
                  {isFavorite ? 'Saved' : 'Save Property'}
                </Button>
              </CardContent>
            </Card>

            {/* Landlord Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Landlord Info</h3>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-600 rounded-full mr-3 flex items-center justify-center text-white font-semibold">
                    {property.landlord.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {property.landlord.name}
                      {property.landlord.verified && <span className="text-blue-600 ml-1">✓</span>}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {property.landlord.responseRate}% response rate
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = `tel:${property.landlord.phone}`}
                >
                  Call Landlord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
