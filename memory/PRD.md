# Eden Rest Resort Booking Website - Product Requirements Document

## Original Problem Statement
Build a resort booking page - single page site for Eden Rest resort with peach and green as primary colors, classic/traditional design style.

## User Requirements
- **Sections**: Hero, Room types, Booking form, Gallery, Testimonials, Contact
- **Design Style**: Classic/Traditional (timeless, warm)
- **Booking**: Full booking system with backend integration
- **Resort Details**: 
  - Name: Eden Rest
  - Rooms: 5 Double rooms, 4 Single rooms
- **Colors**: Peach and green as primary colors

## User Personas
1. **Leisure Traveler**: Looking for a comfortable, elegant resort for vacation
2. **Business Traveler**: Needs convenient booking and quality accommodations
3. **Couple/Family**: Seeking peaceful retreat with amenities

## Architecture & Tech Stack
- **Frontend**: React with Shadcn UI components
- **Backend**: FastAPI with MongoDB (to be implemented)
- **Styling**: Tailwind CSS with custom peach/green color palette
- **State Management**: React hooks
- **Form Handling**: React Hook Form with date-fns

## What's Been Implemented (January 2025)

### Frontend Components (With MOCK DATA)
✅ **Landing Page** (`/app/frontend/src/pages/ResortHome.jsx`)
  - Fixed header with navigation
  - Hero section with resort imagery
  - Rooms showcase with 3 room types (Double, Deluxe Double, Single)
  - Photo gallery (8 images)
  - Testimonials section (4 reviews)
  - Contact section with resort information
  - Footer with links

✅ **Booking Dialog** (`/app/frontend/src/components/BookingDialog.jsx`)
  - Room type selection
  - Check-in/check-out date pickers (Shadcn calendar)
  - Guest count selector
  - Contact information form
  - Booking summary with price calculation
  - Toast notifications for confirmations

✅ **Mock Data** (`/app/frontend/src/mock.js`)
  - Resort information
  - 3 room types (5 Double, 3 Deluxe Double, 4 Single)
  - 4 testimonials
  - 8 gallery images
  - Mock booking storage (frontend-only)

✅ **Styling & Theme**
  - Custom peach color palette (50-600)
  - Custom green color palette (50-900)
  - Classic/traditional design aesthetics
  - Smooth transitions and hover effects
  - Responsive design

## API Contracts (To Be Implemented)

### Room Management
- `GET /api/rooms` - List all rooms with availability
- `GET /api/rooms/{room_id}` - Get specific room details
- `PUT /api/rooms/{room_id}/availability` - Update room availability

### Booking Management
- `POST /api/bookings` - Create new booking
  - Request: `{roomType, checkIn, checkOut, guests, fullName, email, phone}`
  - Response: `{id, status, totalPrice, confirmationCode}`
- `GET /api/bookings/{booking_id}` - Get booking details
- `GET /api/bookings` - List all bookings (admin)
- `PUT /api/bookings/{booking_id}` - Update booking
- `DELETE /api/bookings/{booking_id}` - Cancel booking

### Gallery & Testimonials
- `GET /api/gallery` - Get gallery images
- `GET /api/testimonials` - Get testimonials

## Current State
- **Frontend**: Fully functional with mock data
- **Backend**: Not implemented (using mock.js for data)
- **Database**: Schema not defined yet

## Prioritized Backlog

### P0 - Critical (Next Phase)
1. **Backend API Development**
   - MongoDB models for rooms, bookings, testimonials
   - CRUD endpoints for booking management
   - Room availability logic
   - Email confirmation system (optional)

2. **Frontend-Backend Integration**
   - Replace mock.js with API calls
   - Error handling for API failures
   - Loading states during API calls

### P1 - Important
1. Date conflict validation (prevent double bookings)
2. Admin panel for booking management
3. Payment integration (Stripe)
4. Email notifications for confirmations
5. Booking history for users
6. Real-time availability updates

### P2 - Nice to Have
1. Multi-language support
2. Reviews submission feature
3. Image upload for gallery
4. Advanced search filters
5. Seasonal pricing
6. Special offers/discounts
7. Virtual tour feature
8. Mobile app

## Next Tasks
1. ✅ Create PRD.md documentation
2. Build backend MongoDB models and API endpoints
3. Integrate frontend with backend APIs
4. Test booking flow end-to-end
5. Deploy to production

## Success Metrics
- Booking completion rate
- Average time to complete booking
- User engagement (gallery views, testimonial reads)
- Mobile responsiveness score
- Page load time < 3 seconds
