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
    image: "https://images.unsplash.com/photo-1647792855184-af42f1720b91?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc2OTQ5NTUyNnww&ixlib=rb-4.1.0&q=85",
    maxGuests: 2
  },
  {
    id: "single-1",
    type: "Single Room",
    available: 4,
    price: 129,
    description: "Cozy single occupancy room perfect for solo travelers",
    amenities: ["Queen Size Bed", "Work Desk", "Air Conditioning", "Free WiFi", "Room Service"],
    image: "https://images.unsplash.com/photo-1698927100805-2a32718a7e05?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwyfHxjb3p5JTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc2OTQ5NTUyNnww&ixlib=rb-4.1.0&q=85",
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
    url: "https://images.unsplash.com/photo-1683863655647-b37baeb9fd99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxvb3R5JTIwYm90YW5pY2FsJTIwZ2FyZGVufGVufDB8fHx8MTc2OTQ5NTQ3N3ww&ixlib=rb-4.1.0&q=85",
    title: "Ooty Botanical Garden",
    category: "attractions"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHx0ZWElMjBlc3RhdGV8ZW58MHx8fHwxNzY5NDk1NDg2fDA&ixlib=rb-4.1.0&q=85",
    title: "Tea Gardens",
    category: "attractions"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1674498260932-6f7d8eed6d9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwyfHx0ZWElMjBlc3RhdGV8ZW58MHx8fHwxNzY5NDk1NDg2fDA&ixlib=rb-4.1.0&q=85",
    title: "Tea Plantations",
    category: "attractions"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1687952608554-2fccc773ed92?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxvb3R5JTIwYm90YW5pY2FsJTIwZ2FyZGVufGVufDB8fHx8MTc2OTQ5NTQ3N3ww&ixlib=rb-4.1.0&q=85",
    title: "Greenhouse Garden",
    category: "attractions"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1650884986392-984358536050?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwzfHx0ZWElMjBlc3RhdGV8ZW58MHx8fHwxNzY5NDk1NDg2fDA&ixlib=rb-4.1.0&q=85",
    title: "Nilgiri Hills Tea Estate",
    category: "attractions"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1455157823797-3019317cbcf0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHw0fHx0ZWElMjBlc3RhdGV8ZW58MHx8fHwxNzY5NDk1NDg2fDA&ixlib=rb-4.1.0&q=85",
    title: "Rolling Tea Hills",
    category: "attractions"
  },
  {
    id: 7,
    url: "https://images.pexels.com/photos/35589696/pexels-photo-35589696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Garden Landscape",
    category: "attractions"
  },
  {
    id: 8,
    url: "https://images.pexels.com/photos/18463475/pexels-photo-18463475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Colorful Flowers",
    category: "attractions"
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
