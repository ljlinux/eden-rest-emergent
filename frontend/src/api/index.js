import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Helper to get auth token
const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

// Helper to create auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Admin Authentication
export const adminLogin = async (username, password) => {
  try {
    const response = await axios.post(`${API}/admin/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
};

export const isAdminAuthenticated = () => {
  return !!getAuthToken();
};

// Rooms API
export const getRooms = async () => {
  try {
    const response = await axios.get(`${API}/rooms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const checkRoomAvailability = async (roomType, checkIn, checkOut) => {
  try {
    const response = await axios.get(`${API}/rooms/availability`, {
      params: {
        roomType,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString()
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};

// Bookings API
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API}/bookings`, {
      roomType: bookingData.roomType,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      fullName: bookingData.fullName,
      email: bookingData.email,
      phone: bookingData.phone
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error.response?.data || error.message;
  }
};

export const getBookings = async () => {
  try {
    const response = await axios.get(`${API}/bookings`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const getBooking = async (bookingId) => {
  try {
    const response = await axios.get(`${API}/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.delete(`${API}/bookings/${bookingId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

// Blocked Bookings API
export const createBlockedBooking = async (blockedData) => {
  try {
    const response = await axios.post(`${API}/admin/blocked-bookings`, {
      roomId: blockedData.roomId,
      roomType: blockedData.roomType,
      roomName: blockedData.roomName,
      roomUnit: blockedData.roomUnit,
      checkIn: blockedData.checkIn,
      checkOut: blockedData.checkOut,
      reason: blockedData.reason
    }, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error creating blocked booking:', error);
    throw error.response?.data || error.message;
  }
};

export const getBlockedBookings = async () => {
  try {
    const response = await axios.get(`${API}/admin/blocked-bookings`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blocked bookings:', error);
    throw error;
  }
};

export const deleteBlockedBooking = async (blockId) => {
  try {
    const response = await axios.delete(`${API}/admin/blocked-bookings/${blockId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting blocked booking:', error);
    throw error;
  }
};
