import { roomTypes } from './mock';

// Mock admin authentication
export const adminCredentials = {
  username: "admin",
  password: "admin123"
};

// Mock blocked bookings storage
let blockedBookings = [];

export const authenticateAdmin = (username, password) => {
  return username === adminCredentials.username && password === adminCredentials.password;
};

export const createBlockedBooking = (blockingData) => {
  const newBlocking = {
    id: `block-${Date.now()}`,
    ...blockingData,
    createdAt: new Date().toISOString()
  };
  blockedBookings.push(newBlocking);
  return newBlocking;
};

export const getBlockedBookings = () => {
  return blockedBookings;
};

export const deleteBlockedBooking = (blockId) => {
  blockedBookings = blockedBookings.filter(b => b.id !== blockId);
  return true;
};

// Check if a room is available for given dates
export const isRoomAvailable = (roomId, checkIn, checkOut) => {
  const checkInTime = new Date(checkIn).getTime();
  const checkOutTime = new Date(checkOut).getTime();
  
  const conflicts = blockedBookings.filter(block => {
    if (block.roomId !== roomId) return false;
    
    const blockCheckIn = new Date(block.checkIn).getTime();
    const blockCheckOut = new Date(block.checkOut).getTime();
    
    // Check for date overlap
    return (
      (checkInTime >= blockCheckIn && checkInTime < blockCheckOut) ||
      (checkOutTime > blockCheckIn && checkOutTime <= blockCheckOut) ||
      (checkInTime <= blockCheckIn && checkOutTime >= blockCheckOut)
    );
  });
  
  return conflicts.length === 0;
};

// Get available count for a room on specific dates
export const getAvailableRoomCount = (roomType, checkIn, checkOut) => {
  const room = roomTypes.find(r => r.id === roomType);
  if (!room) return 0;
  
  let blockedCount = 0;
  
  for (let i = 1; i <= room.available; i++) {
    const roomId = `${roomType}-unit-${i}`;
    if (!isRoomAvailable(roomId, checkIn, checkOut)) {
      blockedCount++;
    }
  }
  
  return room.available - blockedCount;
};
