import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Badge } from '../components/ui/badge';
import { Calendar as CalendarIcon, LogOut, Ban, Trash2, Home, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '../hooks/use-toast';
import {
  getRooms,
  getBlockedBookings,
  createBlockedBooking,
  deleteBlockedBooking,
  adminLogout,
  isAdminAuthenticated
} from '../api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rooms, setRooms] = useState([]);
  const [blockedBookings, setBlockedBookings] = useState([]);
  const [blockForm, setBlockForm] = useState({
    roomType: '',
    roomUnit: '1',
    checkIn: null,
    checkOut: null
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check authentication
    if (!isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const [roomsData, blockedData] = await Promise.all([
        getRooms(),
        getBlockedBookings()
      ]);
      setRooms(roomsData);
      setBlockedBookings(blockedData);
    } catch (error) {
      if (error.response?.status === 401) {
        toast({
          title: "Session Expired",
          description: "Please login again",
          variant: "destructive"
        });
        navigate('/admin/login');
      }
    }
  };

  const handleLogout = () => {
    adminLogout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/admin/login');
  };

  const handleBlockRoom = async (e) => {
    e.preventDefault();
    
    if (!blockForm.roomType || !blockForm.checkIn || !blockForm.checkOut) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const selectedRoom = rooms.find(r => r.id === blockForm.roomType);
    const roomId = `${blockForm.roomType}-unit-${blockForm.roomUnit}`;
    
    setIsLoading(true);
    try {
      await createBlockedBooking({
        roomId,
        roomType: blockForm.roomType,
        roomName: selectedRoom.type,
        roomUnit: blockForm.roomUnit,
        checkIn: blockForm.checkIn.toISOString(),
        checkOut: blockForm.checkOut.toISOString(),
        reason: 'Offline booking'
      });

      toast({
        title: "Room Blocked",
        description: `${selectedRoom.type} (Unit ${blockForm.roomUnit}) blocked successfully`,
      });

      // Reset form and reload data
      setBlockForm({
        roomType: '',
        roomUnit: '1',
        checkIn: null,
        checkOut: null
      });
      
      await loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.detail || "Failed to block room",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblock = async (blockId) => {
    try {
      await deleteBlockedBooking(blockId);
      toast({
        title: "Room Unblocked",
        description: "Room is now available for booking",
      });
      await loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unblock room",
        variant: "destructive"
      });
    }
  };

  const selectedRoom = rooms.find(r => r.id === blockForm.roomType);
  const roomUnits = selectedRoom ? Array.from({ length: selectedRoom.available }, (_, i) => i + 1) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-peach-50">
      {/* Header */}
      <header className="bg-white border-b border-peach-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-green-800">Eden Rest - Admin Panel</h1>
                <p className="text-sm text-gray-600">Room Blocking Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                <Home className="h-4 w-4 mr-2" />
                View Website
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Block Room Form */}
          <Card className="border-peach-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Ban className="h-5 w-5" />
                Block Room for Offline Booking
              </CardTitle>
              <CardDescription>
                Select a room and dates to block it from online bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBlockRoom} className="space-y-4">
                <div>
                  <Label htmlFor="roomType">Room Type *</Label>
                  <Select value={blockForm.roomType} onValueChange={(value) => setBlockForm({...blockForm, roomType: value, roomUnit: '1'})}>
                    <SelectTrigger id="roomType">
                      <SelectValue placeholder="Select a room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.type} ({room.available} units available)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRoom && (
                  <div>
                    <Label htmlFor="roomUnit">Room Unit *</Label>
                    <Select value={blockForm.roomUnit} onValueChange={(value) => setBlockForm({...blockForm, roomUnit: value})}>
                      <SelectTrigger id="roomUnit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roomUnits.map((unit) => (
                          <SelectItem key={unit} value={unit.toString()}>
                            Unit {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Check-in Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {blockForm.checkIn ? format(blockForm.checkIn, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={blockForm.checkIn}
                          onSelect={(date) => setBlockForm({...blockForm, checkIn: date})}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Check-out Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {blockForm.checkOut ? format(blockForm.checkOut, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={blockForm.checkOut}
                          onSelect={(date) => setBlockForm({...blockForm, checkOut: date})}
                          disabled={(date) => date <= (blockForm.checkIn || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {blockForm.checkIn && blockForm.checkOut && (
                  <div className="bg-peach-50 p-3 rounded-lg border border-peach-200">
                    <p className="text-sm">
                      <span className="font-medium">Blocking Duration:</span> {' '}
                      {Math.ceil((blockForm.checkOut - blockForm.checkIn) / (1000 * 60 * 60 * 24))} nights
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  {isLoading ? 'Blocking...' : 'Block This Room'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Blocked Rooms List */}
          <Card className="border-peach-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-800">Currently Blocked Rooms</CardTitle>
              <CardDescription>
                Manage offline bookings and blocked room units
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blockedBookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Ban className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No rooms are currently blocked</p>
                  </div>
                ) : (
                  blockedBookings.map((block) => (
                    <Card key={block.id} className="border-red-200 bg-red-50">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-green-800 mb-1">
                              {block.roomName} - Unit {block.roomUnit}
                            </h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>
                                <span className="font-medium">Check-in:</span>{' '}
                                {format(new Date(block.checkIn), 'PPP')}
                              </p>
                              <p>
                                <span className="font-medium">Check-out:</span>{' '}
                                {format(new Date(block.checkOut), 'PPP')}
                              </p>
                              <p>
                                <span className="font-medium">Reason:</span> {block.reason}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleUnblock(block.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Room Status Overview */}
        <Card className="mt-8 border-peach-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800">Room Status Overview</CardTitle>
            <CardDescription>Current availability of all rooms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((room) => {
                const blockedUnits = blockedBookings.filter(b => b.roomType === room.id);
                const uniqueBlockedUnits = [...new Set(blockedUnits.map(b => b.roomUnit))];
                const availableUnits = room.available - uniqueBlockedUnits.length;
                
                return (
                  <div key={room.id} className="border border-peach-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-green-800">{room.type}</h3>
                      <Badge className={availableUnits > 0 ? "bg-green-600" : "bg-red-600"}>
                        {availableUnits} / {room.available} Available
                      </Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: room.available }, (_, i) => i + 1).map((unit) => {
                        const isBlocked = uniqueBlockedUnits.includes(unit.toString());
                        return (
                          <div
                            key={unit}
                            className={`text-center py-2 rounded text-xs font-medium ${
                              isBlocked
                                ? 'bg-red-100 text-red-700 border border-red-300'
                                : 'bg-green-100 text-green-700 border border-green-300'
                            }`}
                          >
                            U{unit}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;