// Mock data for Eden Rest Resort

export const resortInfo = {
  name: "Trip2Ooty",
  tagline: "Your Complete Ooty Experience",
  description: "Plan your perfect Ooty getaway with our all-inclusive packages covering stay, travel, and sightseeing in the Queen of Hills.",
  location: "Ooty (Udhagamandalam), Tamil Nadu",
  phone: "+91 (423) 244-5678",
  email: "info@trip2ooty.com",
  address: "123 Nilgiri Hills Road, Ooty, Tamil Nadu 643001"
};

export const roomTypes = [
  {
    id: "double-1",
    type: "Double Room",
    available: 5,
    price: 199,
    description: "Spacious double occupancy room with king-size bed, private balcony, and stunning views",
    amenities: ["King Size Bed", "Private Balcony", "Air Conditioning", "Mini Bar", "Free WiFi", "Room Service"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBjbGFzc2ljfGVufDB8fHx8MTc2Nzc1NjI2M3ww&ixlib=rb-4.1.0&q=85",
    maxGuests: 2
  },
  {
    id: "single-1",
    type: "Single Room",
    available: 4,
    price: 129,
    description: "Cozy single occupancy room perfect for solo travelers",
    amenities: ["Queen Size Bed", "Work Desk", "Air Conditioning", "Free WiFi", "Room Service"],
    image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBjbGFzc2ljfGVufDB8fHx8MTc2Nzc1NjI2M3ww&ixlib=rb-4.1.0&q=85",
    maxGuests: 1
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Bangalore, Karnataka",
    rating: 5,
    comment: "Trip2Ooty made our vacation planning so easy! The accommodations were excellent, and the sightseeing packages were well organized. Highly recommended!",
    date: "2024-11-15"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    comment: "Amazing experience! The package included everything from comfortable stay to guided tours of tea gardens and viewpoints. Worth every penny!",
    date: "2024-10-28"
  },
  {
    id: 3,
    name: "Anjali Patel",
    location: "Mumbai, Maharashtra",
    rating: 5,
    comment: "Perfect family vacation to Ooty! The team handled everything beautifully - from airport pickup to drop. The rooms were clean and the locations chosen were spectacular.",
    date: "2024-10-10"
  },
  {
    id: 4,
    name: "Arjun Reddy",
    location: "Hyderabad, Telangana",
    rating: 5,
    comment: "Best trip organizer for Ooty! They know all the hidden gems and the stay was comfortable. The botanical garden and lake tour was unforgettable.",
    date: "2024-09-22"
  }
];

export const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1552873547-b88e7b2760e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBleHRlcmlvcnxlbnwwfHx8fDE3Njc3NTYyMzl8MA&ixlib=rb-4.1.0&q=85",
    title: "Resort Exterior",
    category: "exterior"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1623718649591-311775a30c43?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxyZXNvcnQlMjBwb29sfGVufDB8fHx8MTc2Nzc1NjMxN3ww&ixlib=rb-4.1.0&q=85",
    title: "Pool Area",
    category: "amenities"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxyZXNvcnQlMjBwb29sfGVufDB8fHx8MTc2Nzc1NjMxN3ww&ixlib=rb-4.1.0&q=85",
    title: "Infinity Pool",
    category: "amenities"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1752563029948-de870b0add3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBkaW5pbmd8ZW58MHx8fHwxNzY3NzU2MzE3fDA&ixlib=rb-4.1.0&q=85",
    title: "Dining Area",
    category: "dining"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1767257566125-b96702c64a4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxyZXNvcnQlMjBhbWVuaXRpZXN8ZW58MHx8fHwxNzY3NzU2Mjk2fDA&ixlib=rb-4.1.0&q=85",
    title: "Beach Lounge",
    category: "amenities"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1760564020380-bf0da9c0653c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHxyZXNvcnQlMjBhbWVuaXRpZXN8ZW58MHx8fHwxNzY3NzU2Mjk2fDA&ixlib=rb-4.1.0&q=85",
    title: "Tropical Pool",
    category: "amenities"
  },
  {
    id: 7,
    url: "https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Deluxe Room",
    category: "rooms"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1761926488116-9a5040fb1384?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBhbWVuaXRpZXN8ZW58MHx8fHwxNzY3NzU2Mjk2fDA&ixlib=rb-4.1.0&q=85",
    title: "Aerial View",
    category: "exterior"
  }
];

// Mock booking storage (will be replaced with backend)
let mockBookings = [];

export const createBooking = (bookingData) => {
  const newBooking = {
    id: `booking-${Date.now()}`,
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: "confirmed"
  };
  mockBookings.push(newBooking);
  return newBooking;
};

export const getBookings = () => {
  return mockBookings;
};
