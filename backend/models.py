from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")


# Room Models
class RoomBase(BaseModel):
    id: str
    type: str
    available: int
    price: float
    description: str
    amenities: List[str]
    image: str
    maxGuests: int

class RoomInDB(RoomBase):
    pass


# Booking Models
class BookingCreate(BaseModel):
    roomType: str
    checkIn: datetime
    checkOut: datetime
    guests: str
    fullName: str
    email: EmailStr
    phone: Optional[str] = None

class BookingResponse(BaseModel):
    id: str
    roomType: str
    roomName: str
    checkIn: datetime
    checkOut: datetime
    guests: str
    fullName: str
    email: str
    phone: Optional[str] = None
    nights: int
    totalPrice: float
    status: str
    createdAt: datetime

    class Config:
        json_encoders = {ObjectId: str}


# Blocked Booking Models
class BlockedBookingCreate(BaseModel):
    roomId: str
    roomType: str
    roomName: str
    roomUnit: str
    checkIn: datetime
    checkOut: datetime
    reason: Optional[str] = "Offline booking"

class BlockedBookingResponse(BaseModel):
    id: str
    roomId: str
    roomType: str
    roomName: str
    roomUnit: str
    checkIn: datetime
    checkOut: datetime
    reason: str
    createdAt: datetime

    class Config:
        json_encoders = {ObjectId: str}


# Admin Auth Model
class AdminLogin(BaseModel):
    username: str
    password: str

class AdminToken(BaseModel):
    token: str
    message: str
