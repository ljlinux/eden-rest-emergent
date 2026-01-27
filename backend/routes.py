from fastapi import APIRouter, HTTPException, Depends, Header
from typing import List, Optional
from datetime import datetime
from models import (
    BookingCreate, BookingResponse,
    BlockedBookingCreate, BlockedBookingResponse,
    AdminLogin, AdminToken
)
from motor.motor_asyncio import AsyncIOMotorClient
import os
from bson import ObjectId
import jwt
from datetime import timedelta

router = APIRouter()

# Get database connection
from server import db

# JWT Secret (in production, use environment variable)
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
        "image": "https://images.unsplash.com/photo-1647792855184-af42f1720b91?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc2OTQ5NTUyNnww&ixlib=rb-4.1.0&q=85",
        "maxGuests": 2
    },
    {
        "id": "single-1",
        "type": "Single Room",
        "available": 4,
        "price": 129,
        "description": "Cozy single occupancy room perfect for solo travelers",
        "amenities": ["Queen Size Bed", "Work Desk", "Air Conditioning", "Free WiFi", "Room Service"],
        "image": "https://images.unsplash.com/photo-1698927100805-2a32718a7e05?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjQyMTd8MHwxfHNlYXJjaHwyfHxjb3p5JTIwaG90ZWwlMjByb29tfGVufDB8fHx8MTc2OTQ5NTUyNnww&ixlib=rb-4.1.0&q=85",
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


# Admin credentials (in production, use hashed passwords and database)
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


# Initialize rooms collection
async def initialize_rooms():
    rooms_count = await db.rooms.count_documents({})
    if rooms_count == 0:
        await db.rooms.insert_many(INITIAL_ROOMS)


# Admin Authentication
@router.post("/admin/login", response_model=AdminToken)
async def admin_login(credentials: AdminLogin):
    if credentials.username == ADMIN_USERNAME and credentials.password == ADMIN_PASSWORD:
        token = create_jwt_token(credentials.username)
        return AdminToken(token=token, message="Login successful")
    raise HTTPException(status_code=401, detail="Invalid credentials")


# Room Routes
@router.get("/rooms", response_model=List[dict])
async def get_rooms():
    await initialize_rooms()
    rooms = await db.rooms.find({}, {"_id": 0}).to_list(100)
    return rooms


@router.get("/rooms/availability")
async def check_room_availability(roomType: str, checkIn: str, checkOut: str):
    """Check room availability for specific dates"""
    check_in_date = datetime.fromisoformat(checkIn.replace('Z', '+00:00'))
    check_out_date = datetime.fromisoformat(checkOut.replace('Z', '+00:00'))
    
    # Get room info
    room = await db.rooms.find_one({"id": roomType})
    if not room:
        raise HTTPException(status_code=404, detail="Room type not found")
    
    total_units = room["available"]
    
    # Count blocked units for these dates
    blocked_bookings = await db.blocked_bookings.find({
        "roomType": roomType,
        "$or": [
            {
                "checkIn": {"$lte": check_in_date},
                "checkOut": {"$gt": check_in_date}
            },
            {
                "checkIn": {"$lt": check_out_date},
                "checkOut": {"$gte": check_out_date}
            },
            {
                "checkIn": {"$gte": check_in_date},
                "checkOut": {"$lte": check_out_date}
            }
        ]
    }).to_list(100)
    
    # Get unique blocked units
    blocked_units = set([b["roomUnit"] for b in blocked_bookings])
    available_count = total_units - len(blocked_units)
    
    return {
        "roomType": roomType,
        "totalUnits": total_units,
        "blockedUnits": len(blocked_units),
        "availableUnits": max(0, available_count)
    }


# Booking Routes
@router.post("/bookings", response_model=BookingResponse)
async def create_booking(booking: BookingCreate):
    # Check availability first
    availability = await check_room_availability(
        booking.roomType,
        booking.checkIn.isoformat(),
        booking.checkOut.isoformat()
    )
    
    if availability["availableUnits"] <= 0:
        raise HTTPException(status_code=400, detail="No rooms available for selected dates")
    
    # Get room details
    room = await db.rooms.find_one({"id": booking.roomType})
    if not room:
        raise HTTPException(status_code=404, detail="Room type not found")
    
    # Calculate nights and total price
    nights = (booking.checkOut - booking.checkIn).days
    total_price = nights * room["price"]
    
    # Create booking document
    booking_doc = {
        "roomType": booking.roomType,
        "roomName": room["type"],
        "checkIn": booking.checkIn,
        "checkOut": booking.checkOut,
        "guests": booking.guests,
        "fullName": booking.fullName,
        "email": booking.email,
        "phone": booking.phone,
        "nights": nights,
        "totalPrice": total_price,
        "status": "confirmed",
        "createdAt": datetime.utcnow()
    }
    
    result = await db.bookings.insert_one(booking_doc)
    booking_doc["id"] = str(result.inserted_id)
    
    return BookingResponse(**booking_doc)


@router.get("/bookings", response_model=List[BookingResponse])
async def get_bookings(admin: dict = Depends(verify_admin_token)):
    """Get all bookings (admin only)"""
    bookings = await db.bookings.find().to_list(1000)
    for booking in bookings:
        booking["id"] = str(booking.pop("_id"))
    return bookings


@router.get("/bookings/{booking_id}", response_model=BookingResponse)
async def get_booking(booking_id: str):
    """Get specific booking by ID"""
    if not ObjectId.is_valid(booking_id):
        raise HTTPException(status_code=400, detail="Invalid booking ID")
    
    booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    booking["id"] = str(booking.pop("_id"))
    return BookingResponse(**booking)


@router.delete("/bookings/{booking_id}")
async def cancel_booking(booking_id: str, admin: dict = Depends(verify_admin_token)):
    """Cancel a booking (admin only)"""
    if not ObjectId.is_valid(booking_id):
        raise HTTPException(status_code=400, detail="Invalid booking ID")
    
    result = await db.bookings.delete_one({"_id": ObjectId(booking_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    return {"message": "Booking cancelled successfully"}


# Blocked Bookings Routes (Admin Only)
@router.post("/admin/blocked-bookings", response_model=BlockedBookingResponse)
async def create_blocked_booking(
    blocked: BlockedBookingCreate,
    admin: dict = Depends(verify_admin_token)
):
    """Block a room unit for offline booking"""
    blocked_doc = {
        "roomId": blocked.roomId,
        "roomType": blocked.roomType,
        "roomName": blocked.roomName,
        "roomUnit": blocked.roomUnit,
        "checkIn": blocked.checkIn,
        "checkOut": blocked.checkOut,
        "reason": blocked.reason,
        "createdAt": datetime.utcnow()
    }
    
    result = await db.blocked_bookings.insert_one(blocked_doc)
    blocked_doc["id"] = str(result.inserted_id)
    
    return BlockedBookingResponse(**blocked_doc)


@router.get("/admin/blocked-bookings", response_model=List[BlockedBookingResponse])
async def get_blocked_bookings(admin: dict = Depends(verify_admin_token)):
    """Get all blocked bookings"""
    blocked = await db.blocked_bookings.find().to_list(1000)
    for block in blocked:
        block["id"] = str(block.pop("_id"))
    return blocked


@router.delete("/admin/blocked-bookings/{block_id}")
async def delete_blocked_booking(
    block_id: str,
    admin: dict = Depends(verify_admin_token)
):
    """Unblock a room unit"""
    if not ObjectId.is_valid(block_id):
        raise HTTPException(status_code=400, detail="Invalid block ID")
    
    result = await db.blocked_bookings.delete_one({"_id": ObjectId(block_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blocked booking not found")
    
    return {"message": "Room unblocked successfully"}
