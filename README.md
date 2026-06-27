# 🏠 NyumbaHub Kenya

> **The Future of House Rentals, Airbnb, and Property Discovery in Kenya**

NyumbaHub Kenya is a modern property marketplace designed to simplify the process of finding, renting, booking, and managing residential and short-stay properties across all 47 counties of Kenya.

The platform connects property seekers, landlords, Airbnb hosts, property managers, and administrators through a secure, user-friendly, and mobile-first application powered by modern web technologies.

---

# Vision

To become Kenya's most trusted and innovative digital property marketplace by providing a seamless experience for renters, landlords, Airbnb hosts, and property managers.

---

# Mission

Build a secure, transparent, and intelligent platform that helps Kenyans discover quality properties quickly while giving landlords powerful tools to advertise and manage their listings.

---

# Core Features

## House Rentals

* Apartments
* Bedsitters
* Single Rooms
* One Bedroom
* Two Bedroom
* Three Bedroom
* Maisonettes
* Villas
* Student Hostels
* Serviced Apartments

## Airbnb

* Daily Booking
* Weekly Booking
* Monthly Booking
* Holiday Homes
* Vacation Rentals

## Commercial Properties

* Offices
* Shops
* Warehouses
* Hotels
* Restaurants
* Land for Lease

---

# User Roles

## Property Searcher

Can:

* Create account
* Search properties
* Filter listings
* View maps after payment
* Save favourite properties
* Contact landlords
* Book Airbnb stays
* Leave reviews

### Property Viewing Fee

A property seeker must pay **KES 100** via **M-Pesa STK Push** to unlock detailed property information, including:

* Exact location
* Google Maps
* Landlord contact information
* Full image gallery

Access remains active for the configured duration (for example 30 days, configurable by the administrator).

---

## Landlord

Can:

* Register account
* Verify identity
* Upload property
* Upload multiple photos
* Edit listings
* Delete listings
* Respond to enquiries
* View listing analytics

### Listing Fee

A landlord pays **KES 50** via **M-Pesa** to publish one property listing.

Each payment publishes one property advertisement.

---

## Airbnb Host

Can:

* List short stay properties
* Manage availability calendar
* Accept or reject bookings
* Receive booking notifications
* Manage pricing

---

## Administrator

Can:

* Manage users
* Approve or suspend listings
* Verify landlords
* Manage payments
* Manage counties and locations
* Remove fraudulent listings
* View platform analytics
* Manage advertisements
* Moderate reviews

---

# Payment System

The platform integrates with the **Safaricom Daraja API**.

Supported payments:

* M-Pesa STK Push
* Listing Fees
* Property Viewing Fees
* Airbnb Booking Payments (future phase)

Initially, payments will be sent to the owner's M-Pesa business or till number. (Using a personal number is technically possible for testing, but for production a Business Short Code or Till is recommended.)

---

# Search Features

Users can search using:

* County
* Sub County
* Estate
* Town
* Property Type
* Rent Range
* Bedrooms
* Bathrooms
* Furnished
* Parking
* Wi-Fi
* Water Availability
* Pets Allowed
* Security Features
* Nearby Schools
* Nearby Hospitals
* Nearby Shopping Centres

---

# Google Maps

Every property includes:

* GPS Coordinates
* Interactive Google Map
* Nearby Services
* Directions

Maps become available after the required viewing payment.

---

# Property Information

Each listing contains:

* Title
* Description
* Monthly Rent
* Deposit
* Service Charge
* Property Type
* Number of Bedrooms
* Number of Bathrooms
* Square Footage (optional)
* Amenities
* Image Gallery
* Video Tour (future phase)
* Location
* Google Map
* Availability Status

---

# Reviews

Verified users can:

* Rate properties
* Rate landlords
* Leave comments
* Report fake listings

---

# Notifications

Users receive:

* Email notifications
* SMS notifications (future phase)
* In-app notifications
* Booking updates
* Payment confirmations

---

# Security

The platform will implement:

* JWT Authentication
* Refresh Tokens
* Password Encryption
* Role-Based Access Control (RBAC)
* Input Validation
* Rate Limiting
* Secure File Uploads
* Audit Logging

---

# Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Shadcn/UI

## Backend

* NestJS
* Prisma ORM
* PostgreSQL

## Storage

* Cloudinary

## Maps

* Google Maps API

## Payments

* Safaricom Daraja API

## Authentication

* JWT
* Refresh Tokens

## Deployment

Frontend:

* Vercel

Backend:

* Railway

Database:

* Neon PostgreSQL

Storage:

* Cloudinary

---

# Future Features

* AI Property Recommendations
* AI Chat Assistant
* Mobile Applications (Android & iOS)
* Property Price Estimation
* Agent Portal
* Property Auctions
* Mortgage Calculator
* Virtual Property Tours
* Referral Program
* Loyalty Rewards

---

# Development Roadmap

## Phase 1

* Project Setup
* Authentication
* User Management
* Database Design

## Phase 2

* Property Listings
* Search
* Google Maps

## Phase 3

* M-Pesa Integration
* Property Viewing Payments
* Landlord Dashboard

## Phase 4

* Airbnb Module
* Booking System
* Reviews
* Notifications

## Phase 5

* Admin Dashboard
* AI Features
* Mobile Applications
* Production Deployment

---

# Project Goal

Build the most trusted, scalable, secure, and user-friendly property marketplace in Kenya, serving renters, landlords, Airbnb hosts, and businesses with a modern digital experience.
