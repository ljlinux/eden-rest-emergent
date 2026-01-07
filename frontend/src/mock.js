// Mock data for Eden Rest Resort

export const resortInfo = {
  name: "Eden Rest",
  tagline: "Where Comfort Meets Tranquility",
  description: "Experience timeless elegance and warm hospitality at Eden Rest, your perfect retreat for relaxation and rejuvenation.",
  location: "Nestled in the heart of nature's paradise",
  phone: "+1 (555) 123-4567",
  email: "info@edenrest.com",
  address: "123 Paradise Valley Road, Serenity Hills"
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
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 5,
    comment: "Eden Rest exceeded all our expectations! The classic charm combined with modern comfort made our stay absolutely perfect. The staff was incredibly welcoming.",
    date: "2024-11-15"
  },
  {
    id: 2,
    name: "James Chen",
    location: "Toronto, Canada",
    rating: 5,
    comment: "A truly peaceful retreat. The rooms were immaculate, and the attention to detail was remarkable. We'll definitely be returning!",
    date: "2024-10-28"
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "London, UK",
    rating: 5,
    comment: "The perfect blend of traditional elegance and contemporary amenities. The resort's serene atmosphere helped us completely unwind.",
    date: "2024-10-10"
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    location: "Miami, USA",
    rating: 5,
    comment: "Outstanding service and beautiful accommodations. The dining experience was exceptional, and the facilities were top-notch.",
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
