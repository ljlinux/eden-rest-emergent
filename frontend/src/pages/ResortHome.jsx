import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Phone, Mail, Star, Users, Wifi, Coffee, Waves, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import BookingDialog from '../components/BookingDialog';
import { resortInfo, testimonials, galleryImages } from '../mock';
import { getRooms } from '../api';

const ResortHome = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error loading rooms:', error);
      }
    };
    loadRooms();
  }, []);

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setIsBookingOpen(true);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-peach-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-peach-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">{resortInfo.name}</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('rooms')} className="text-gray-700 hover:text-green-700 font-medium">Rooms</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-green-700 font-medium">Gallery</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-green-700 font-medium">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-green-700 font-medium">Contact</button>
              <Button onClick={() => setIsBookingOpen(true)} className="bg-green-600 hover:bg-green-700">Book Now</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1757023375017-2a39c78e571c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwcmVzb3J0fGVufDB8fHx8MTc2Nzc1NjI0OHww&ixlib=rb-4.1.0&q=85" 
            alt="Eden Rest Resort" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">{resortInfo.name}</h2>
          <p className="text-2xl md:text-3xl mb-4 drop-shadow-md font-light">{resortInfo.tagline}</p>
          <p className="text-lg md:text-xl mb-8 opacity-90 drop-shadow-md">{resortInfo.description}</p>
          <Button 
            size="lg" 
            onClick={() => scrollToSection('rooms')}
            className="bg-peach-500 hover:bg-peach-600 text-white text-lg px-8 py-6 shadow-xl"
          >
            Explore Our Rooms
          </Button>
        </div>
      </section>

      {/* Room Types Section */}
      <section id="rooms" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Stay Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose from our comfortable accommodation options for your Ooty trip</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {rooms.map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-peach-200">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.type} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                    {room.available} Available
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800">{room.type}</CardTitle>
                  <CardDescription className="text-gray-600">{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Up to {room.maxGuests} {room.maxGuests > 1 ? 'Guests' : 'Guest'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-green-300 text-green-700">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-3xl font-bold text-green-700">
                    ${room.price}
                    <span className="text-sm font-normal text-gray-500"> / night</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleBookNow(room)} 
                    className="w-full bg-peach-500 hover:bg-peach-600 text-white"
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6 bg-peach-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Ooty Highlights</h2>
            <p className="text-xl text-gray-600">Discover the beauty of Ooty with our curated experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="relative overflow-hidden rounded-lg shadow-lg group h-64">
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white font-semibold p-4">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Guest Reviews</h2>
            <p className="text-xl text-gray-600">What our guests are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-xl transition-shadow duration-300 border-peach-200">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg text-green-800">{testimonial.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-green-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">We're here to help you plan your perfect stay</p>
          </div>
          
          <Card className="border-peach-200 shadow-xl">
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-1">Address</h3>
                      <p className="text-gray-600">{resortInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-1">Phone</h3>
                      <p className="text-gray-600">{resortInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-1">Email</h3>
                      <p className="text-gray-600">{resortInfo.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-peach-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-4 text-lg">Why Choose Trip to Ooty?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Hassle-Free Trip Planning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Coffee className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Comfortable Accommodations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Waves className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Guided Sightseeing Tours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Local Expert Assistance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                {resortInfo.name}
              </h3>
              <p className="text-green-100 opacity-90">{resortInfo.tagline}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('rooms')} className="text-green-100 hover:text-white opacity-90 hover:opacity-100">Our Rooms</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="text-green-100 hover:text-white opacity-90 hover:opacity-100">Gallery</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="text-green-100 hover:text-white opacity-90 hover:opacity-100">Reviews</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-green-100 hover:text-white opacity-90 hover:opacity-100">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Connect With Us</h4>
              <p className="text-green-100 opacity-90 mb-2">{resortInfo.email}</p>
              <p className="text-green-100 opacity-90">{resortInfo.phone}</p>
            </div>
          </div>
          
          <div className="border-t border-green-800 pt-8 text-center">
            <p className="text-green-100 opacity-75">&copy; 2024 {resortInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Dialog */}
      <BookingDialog 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen}
        selectedRoom={selectedRoom}
      />
    </div>
  );
};

export default ResortHome;
