import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Sparkles, MapPin, Clock, Users, CheckCircle, Star, Home, Car } from 'lucide-react';
import { tourPackages, vehicleOptions } from '../mock';
import { useToast } from '../hooks/use-toast';

const Tours = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const categories = ['All', 'Couple Package', 'Family Package'];

  const filteredTours = selectedCategory === 'All' 
    ? tourPackages 
    : tourPackages.filter(tour => tour.category === selectedCategory);

  const handleBookTour = (tour, vehicle) => {
    setSelectedTour(tour);
    setSelectedVehicle(vehicle);
    
    toast({
      title: "Tour Package Selected",
      description: `${tour.name} with ${vehicle.type} - ₹${tour.price + vehicle.pricePerDay}`,
    });

    // Scroll to booking section or open dialog
    setTimeout(() => {
      toast({
        title: "Booking Confirmation",
        description: "Tour booking functionality coming soon! Contact us for reservations.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-peach-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-peach-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">Trip2Ooty Tours</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" onClick={() => navigate('/shop')}>
                Shop
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Explore Ooty with Our Tour Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Carefully curated tours covering the best of Ooty's attractions with comfortable transportation
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
              size="lg"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tour Packages */}
        <div className="space-y-8 mb-16">
          {filteredTours.map(tour => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-peach-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tour Image */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.name} 
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                    {tour.category}
                  </Badge>
                </div>

                {/* Tour Details */}
                <div className="lg:col-span-2 p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl text-green-800 mb-2">{tour.name}</CardTitle>
                        <CardDescription className="text-base">{tour.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{tour.rating}</span>
                        <span className="text-sm text-gray-500">({tour.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 space-y-4">
                    {/* Tour Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">{tour.vehicleOptions.join(', ')}</span>
                      </div>
                    </div>

                    {/* Tourist Spots */}
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Tourist Spots Covered:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tour.spots.map((spot, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{spot}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Includes */}
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Package Includes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tour.includes.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="border-green-300 text-green-700">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Vehicle Options */}
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3">Choose Your Vehicle:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {vehicleOptions
                          .filter(v => tour.vehicleOptions.includes(v.type))
                          .map(vehicle => (
                            <Card key={vehicle.id} className="border-green-200 hover:border-green-400 transition-colors cursor-pointer">
                              <CardContent className="p-3">
                                <div className="text-center">
                                  <Car className="h-6 w-6 text-green-600 mx-auto mb-2" />
                                  <p className="font-semibold text-sm text-green-800">{vehicle.type}</p>
                                  <p className="text-xs text-gray-600">{vehicle.name}</p>
                                  <p className="text-sm font-bold text-green-700 mt-1">+₹{vehicle.pricePerDay}</p>
                                  <Button 
                                    size="sm"
                                    className="w-full mt-2 bg-peach-500 hover:bg-peach-600 text-xs"
                                    onClick={() => handleBookTour(tour, vehicle)}
                                  >
                                    Book
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-peach-200">
                      <div>
                        <p className="text-sm text-gray-600">Starting from</p>
                        <p className="text-3xl font-bold text-green-700">₹{tour.price}</p>
                        <p className="text-xs text-gray-500">+ Vehicle charges</p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Vehicle Information Section */}
        <Card className="border-peach-200 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Car className="h-6 w-6" />
              Our Vehicle Fleet
            </CardTitle>
            <CardDescription>
              Choose from our range of well-maintained, comfortable vehicles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vehicleOptions.map(vehicle => (
                <Card key={vehicle.id} className="border-green-200">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">{vehicle.name}</CardTitle>
                    <CardDescription className="text-sm">{vehicle.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{vehicle.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Capacity: {vehicle.capacity} people</span>
                    </div>
                    <p className="text-xl font-bold text-green-700">₹{vehicle.pricePerDay}/day</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tours;