from sqlalchemy import Column, Integer, String, Float, JSON, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from datetime import datetime

Base = declarative_base()

class Room(Base):
    __tablename__ = "rooms"
    
    id = Column(String(50), primary_key=True)
    type = Column(String(100), nullable=False)
    available = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(Text)
    amenities = Column(JSON)
    image = Column(String(500))
    maxGuests = Column(Integer, nullable=False)


class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    roomType = Column(String(50), nullable=False)
    roomName = Column(String(100), nullable=False)
    checkIn = Column(DateTime, nullable=False)
    checkOut = Column(DateTime, nullable=False)
    guests = Column(String(10), nullable=False)
    fullName = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(50))
    nights = Column(Integer, nullable=False)
    totalPrice = Column(Float, nullable=False)
    status = Column(String(50), default="confirmed")
    createdAt = Column(DateTime, default=func.now())


class BlockedBooking(Base):
    __tablename__ = "blocked_bookings"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    roomId = Column(String(100), nullable=False)
    roomType = Column(String(50), nullable=False)
    roomName = Column(String(100), nullable=False)
    roomUnit = Column(String(10), nullable=False)
    checkIn = Column(DateTime, nullable=False)
    checkOut = Column(DateTime, nullable=False)
    reason = Column(String(500), default="Offline booking")
    createdAt = Column(DateTime, default=func.now())
