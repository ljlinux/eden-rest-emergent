import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarIcon, Users } from 'lucide-react';
import { format } from 'date-fns';
import { roomTypes, createBooking } from '../mock';
import { useToast } from '../hooks/use-toast';

const BookingDialog = ({ open, onOpenChange, selectedRoom }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    roomType: selectedRoom?.id || '',
    checkIn: null,
    checkOut: null,
    guests: '1',
    fullName: '',
    email: '',
    phone: ''
  });

  React.useEffect(() => {
    if (selectedRoom) {
      setFormData(prev => ({ ...prev, roomType: selectedRoom.id }));
    }
  }, [selectedRoom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.roomType || !formData.checkIn || !formData.checkOut || !formData.fullName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const selectedRoomData = roomTypes.find(r => r.id === formData.roomType);
    const nights = Math.ceil((formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * selectedRoomData.price;

    const booking = createBooking({
      ...formData,
      checkIn: formData.checkIn.toISOString(),
      checkOut: formData.checkOut.toISOString(),
      roomName: selectedRoomData.type,
      nights,
      totalPrice
    });

    toast({
      title: "Booking Confirmed!",
      description: `Your reservation for ${selectedRoomData.type} has been confirmed. Booking ID: ${booking.id}`,
    });

    // Reset form
    setFormData({
      roomType: '',
      checkIn: null,
      checkOut: null,
      guests: '1',
      fullName: '',
      email: '',
      phone: ''
    });
    
    onOpenChange(false);
  };

  const selectedRoomData = roomTypes.find(r => r.id === formData.roomType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-800">Book Your Stay</DialogTitle>
          <DialogDescription>
            Complete the form below to reserve your room at Eden Rest
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="roomType">Room Type *</Label>
              <Select value={formData.roomType} onValueChange={(value) => setFormData({...formData, roomType: value})}>
                <SelectTrigger id="roomType">
                  <SelectValue placeholder="Select a room type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.type} - ${room.price}/night ({room.available} available)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Check-in Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.checkIn ? format(formData.checkIn, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.checkIn}
                      onSelect={(date) => setFormData({...formData, checkIn: date})}
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
                      {formData.checkOut ? format(formData.checkOut, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.checkOut}
                      onSelect={(date) => setFormData({...formData, checkOut: date})}
                      disabled={(date) => date <= (formData.checkIn || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests *</Label>
              <Select value={formData.guests} onValueChange={(value) => setFormData({...formData, guests: value})}>
                <SelectTrigger id="guests">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          {selectedRoomData && formData.checkIn && formData.checkOut && (
            <div className="bg-peach-50 p-4 rounded-lg border border-peach-200">
              <h3 className="font-semibold text-green-800 mb-2">Booking Summary</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Room:</span> {selectedRoomData.type}</p>
                <p><span className="font-medium">Check-in:</span> {format(formData.checkIn, 'PPP')}</p>
                <p><span className="font-medium">Check-out:</span> {format(formData.checkOut, 'PPP')}</p>
                <p><span className="font-medium">Nights:</span> {Math.ceil((formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24))}</p>
                <p className="text-lg font-bold text-green-700 pt-2">
                  Total: ${Math.ceil((formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24)) * selectedRoomData.price}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
