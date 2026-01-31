from fastapi import APIRouter, HTTPException, Depends, Header
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from models import (
    BookingCreate, BookingResponse,
    BlockedBookingCreate, BlockedBookingResponse,
    AdminLogin, AdminToken
)
from database import Room, Booking, BlockedBooking
import os
import jwt
from datetime import timedelta

router = APIRouter()

# JWT Secret
JWT_SECRET = os.environ.get("JWT_SECRET", "your-secret-key-change-in-production")
JWT_ALGORITHM = "HS256"

# Initial room data
INITIAL_ROOMS = [
    {
        "id": "double-1",
        "type": "Double Room",
        "available": 5,
        "price": 199,
        "description": "Spacious double occupancy room with king-size bed, private balcony, and stunning views",
        "amenities": ["King Size Bed", "Private Balcony", "Air Conditioning", "Mini Bar", "Free WiFi", "Room Service"],
        "image": "https://images.unsplash.com/photo-1647792855184-af42f1720b91?w=500&q=80",
        "maxGuests": 2
    },
    {
        "id": "single-1",
        "type": "Single Room",
        "available": 4,
        "price": 129,
        "description": "Cozy single occupancy room perfect for solo travelers",
        "amenities": ["Queen Size Bed", "Work Desk", "Air Conditioning", "Free WiFi", "Room Service"],
        "image": "https://images.unsplash.com/photo-1698927100805-2a32718a7e05?w=500&q=80",
        "maxGuests": 1
    },
    {
        "id": "villa-1",
        "type": "Villa",
        "available": 2,
        "price": 2499,
        "description": "Luxurious villa perfect for large families and groups. Spacious living area with multiple bedrooms",
        "amenities": ["5 Bedrooms", "Living Room", "Kitchen", "Private Garden", "BBQ Area", "Free WiFi", "24/7 Service"],
        "image": "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=500&q=80",
        "maxGuests": 15
    }
]

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

def create_jwt_token(username: str) -> str:
    payload = {
        "username": username,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def verify_admin_token(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    try:
        token = authorization.replace("Bearer ", "")
        payload = verify_jwt_token(token)
        return payload
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Get DB session
from server import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Initialize rooms
def initialize_rooms(db: Session):
    rooms_count = db.query(Room).count()
    if rooms_count == 0:
        for room_data in INITIAL_ROOMS:
            room = Room(**room_data)
            db.add(room)
        db.commit()
        print(f"Initialized {len(INITIAL_ROOMS)} rooms in database")

# Admin Authentication
@router.post("/admin/login", response_model=AdminToken)
async def admin_login(credentials: AdminLogin):
    if credentials.username == ADMIN_USERNAME and credentials.password == ADMIN_PASSWORD:
        token = create_jwt_token(credentials.username)
        return AdminToken(token=token, message="Login successful")
    raise HTTPException(status_code=401, detail="Invalid credentials")

# Room Routes
@router.get("/rooms", response_model=List[dict])
async def get_rooms(db: Session = Depends(get_db)):
    initialize_rooms(db)
    rooms = db.query(Room).all()
    return [
        {
            "id": room.id,
            "type": room.type,
            "available": room.available,
            "price": room.price,
            "description": room.description,
            "amenities": room.amenities,
            "image": room.image,
            "maxGuests": room.maxGuests
        }
        for room in rooms
    ]

@router.get("/rooms/availability")
async def check_room_availability(
    roomType: str, 
    checkIn: str, 
    checkOut: str,
    db: Session = Depends(get_db)
):
    """Check room availability for specific dates"""
    check_in_date = datetime.fromisoformat(checkIn.replace('Z', '+00:00'))
    check_out_date = datetime.fromisoformat(checkOut.replace('Z', '+00:00'))
    
    # Get room info
    room = db.query(Room).filter(Room.id == roomType).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room type not found")
    
    total_units = room.available
    
    # Count blocked units for these dates
    blocked_bookings = db.query(BlockedBooking).filter(
        BlockedBooking.roomType == roomType,
        (
            (BlockedBooking.checkIn <= check_in_date) & (BlockedBooking.checkOut > check_in_date) |
            (BlockedBooking.checkIn < check_out_date) & (BlockedBooking.checkOut >= check_out_date) |
            (BlockedBooking.checkIn >= check_in_date) & (BlockedBooking.checkOut <= check_out_date)
        )
    ).all()
    
    # Get unique blocked units
    blocked_units = set([b.roomUnit for b in blocked_bookings])
    available_count = total_units - len(blocked_units)
    
    return {
        "roomType": roomType,
        "totalUnits": total_units,
        "blockedUnits": len(blocked_units),
        "availableUnits": max(0, available_count)
    }

# Booking Routes
@router.post("/bookings", response_model=BookingResponse)
async def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    # Check availability first
    availability = await check_room_availability(
        booking.roomType,
        booking.checkIn.isoformat(),
        booking.checkOut.isoformat(),
        db
    )
    
    if availability["availableUnits"] <= 0:
        raise HTTPException(status_code=400, detail="No rooms available for selected dates")
    
    # Get room details
    room = db.query(Room).filter(Room.id == booking.roomType).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room type not found")
    
    # Calculate nights and total price
    nights = (booking.checkOut - booking.checkIn).days
    total_price = nights * room.price
    
    # Create booking
    new_booking = Booking(
        roomType=booking.roomType,
        roomName=room.type,
        checkIn=booking.checkIn,
        checkOut=booking.checkOut,
        guests=booking.guests,
        fullName=booking.fullName,
        email=booking.email,
        phone=booking.phone,
        nights=nights,
        totalPrice=total_price,
        status="confirmed"
    )
    
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    
    return BookingResponse(
        id=str(new_booking.id),
        roomType=new_booking.roomType,
        roomName=new_booking.roomName,
        checkIn=new_booking.checkIn,
        checkOut=new_booking.checkOut,
        guests=new_booking.guests,
        fullName=new_booking.fullName,
        email=new_booking.email,
        phone=new_booking.phone,
        nights=new_booking.nights,
        totalPrice=new_booking.totalPrice,
        status=new_booking.status,
        createdAt=new_booking.createdAt
    )

@router.get("/bookings", response_model=List[BookingResponse])
async def get_bookings(admin: dict = Depends(verify_admin_token), db: Session = Depends(get_db)):
    """Get all bookings (admin only)"""
    bookings = db.query(Booking).all()
    return [
        BookingResponse(
            id=str(b.id),
            roomType=b.roomType,
            roomName=b.roomName,
            checkIn=b.checkIn,
            checkOut=b.checkOut,
            guests=b.guests,
            fullName=b.fullName,
            email=b.email,
            phone=b.phone,
            nights=b.nights,
            totalPrice=b.totalPrice,
            status=b.status,
            createdAt=b.createdAt
        )
        for b in bookings
    ]

@router.delete("/bookings/{booking_id}")
async def cancel_booking(
    booking_id: int, 
    admin: dict = Depends(verify_admin_token),
    db: Session = Depends(get_db)
):
    """Cancel a booking (admin only)"""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    db.delete(booking)
    db.commit()
    
    return {"message": "Booking cancelled successfully"}

# Blocked Bookings Routes (Admin Only)
@router.post("/admin/blocked-bookings", response_model=BlockedBookingResponse)
async def create_blocked_booking(
    blocked: BlockedBookingCreate,
    admin: dict = Depends(verify_admin_token),
    db: Session = Depends(get_db)
):
    """Block a room unit for offline booking"""
    new_blocked = BlockedBooking(
        roomId=blocked.roomId,
        roomType=blocked.roomType,
        roomName=blocked.roomName,
        roomUnit=blocked.roomUnit,
        checkIn=blocked.checkIn,
        checkOut=blocked.checkOut,
        reason=blocked.reason
    )
    
    db.add(new_blocked)
    db.commit()
    db.refresh(new_blocked)
    
    return BlockedBookingResponse(
        id=str(new_blocked.id),
        roomId=new_blocked.roomId,
        roomType=new_blocked.roomType,
        roomName=new_blocked.roomName,
        roomUnit=new_blocked.roomUnit,
        checkIn=new_blocked.checkIn,
        checkOut=new_blocked.checkOut,
        reason=new_blocked.reason,
        createdAt=new_blocked.createdAt
    )

@router.get("/admin/blocked-bookings", response_model=List[BlockedBookingResponse])
async def get_blocked_bookings(admin: dict = Depends(verify_admin_token), db: Session = Depends(get_db)):
    """Get all blocked bookings"""
    blocked = db.query(BlockedBooking).all()
    return [
        BlockedBookingResponse(
            id=str(b.id),
            roomId=b.roomId,
            roomType=b.roomType,
            roomName=b.roomName,
            roomUnit=b.roomUnit,
            checkIn=b.checkIn,
            checkOut=b.checkOut,
            reason=b.reason,
            createdAt=b.createdAt
        )
        for b in blocked
    ]

@router.delete("/admin/blocked-bookings/{block_id}")
async def delete_blocked_booking(
    block_id: int,
    admin: dict = Depends(verify_admin_token),
    db: Session = Depends(get_db)
):
    """Unblock a room unit"""
    blocked = db.query(BlockedBooking).filter(BlockedBooking.id == block_id).first()
    if not blocked:
        raise HTTPException(status_code=404, detail="Blocked booking not found")
    
    db.delete(blocked)
    db.commit()
    
    return {"message": "Room unblocked successfully"}
