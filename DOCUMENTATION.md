# Kree Car Rental Marketplace - Project Documentation

## 1. Project Overview

**Kree** is a web application designed as a proof-of-concept for a revolutionary car rental marketplace in Morocco. Its core value proposition is the **"Name Your Price"** model, which flips the traditional rental process. Instead of browsing fixed prices, users submit their travel details and a proposed daily price. Verified rental agencies then bid for the user's business, creating a competitive, transparent, and user-centric marketplace.

The application is a **frontend-only prototype** that uses mock data (initially hardcoded, now from JSON files) and simulated API calls to demonstrate the complete user journey. It also includes an integration with the **Google Gemini API** to provide value-added features like AI-powered travel itineraries.

## 2. Core Application Architecture & Logic

The application is built using **React** and **TypeScript**, ensuring a robust, type-safe, and component-based architecture.

### 2.1. State Management

All critical application state is centralized and managed within the main `App.tsx` component using React's `useState` and `useEffect` hooks. This "lifted state" pattern makes the data flow predictable and easy to trace.

The key state variables in `App.tsx` are:
- **`currentPage`**: An enum (`Page`) that controls which page is visible, acting as a simple, client-side router.
- **Booking Flow State**: A combination of `bookingDetails`, `selectedOffer`, and `isBookingConfirmed` tracks the user's progress through the booking funnel from search to confirmation.
- **`currentUser`**: Stores the logged-in user's information. It's `null` if no one is logged in.
- **Data State**: `users`, `cars`, `bookingHistory`, etc., are now fetched from external JSON files on component mount and held in the `App` component's state to simulate a real-world data environment and allow for dynamic CRUD operations in the admin panel.

### 2.2. Navigation / Routing

The application implements a simple state-based routing system controlled by the `currentPage` state in `App.tsx`.
- The `Header`, `Footer`, and `AdminSidebar` components contain buttons that call the `setCurrentPage` function (or a handler that calls it).
- The `App.tsx` component has a `renderContent` function that uses a `switch` statement on `currentPage` to render the appropriate page component.

### 2.3. Authentication Flow (Mock)

The authentication is entirely simulated on the frontend.
1. A user clicks "Login," which opens the `AuthModal`.
2. The user selects a role (Customer or Admin). The `handleLogin` function in `App.tsx` sets the `currentUser` state with mock data.
3. The UI updates conditionally. The `Header` shows a welcome message and a "Log Out" button. An "Admin Panel" link appears for admins.
4. A **login wall** is in place: if a non-logged-in user tries to start a booking, their request is saved, they are prompted to log in, and the booking process resumes automatically after a successful login.

---

## Backend API Endpoint Specification

This specification details the required API endpoints for a backend service to make the frontend fully functional.

**Base URL:** `/api`

### 1. Authentication (`/api/auth`)

Handles user authentication and session management.

**`POST /api/auth/login`**
- **Description:** Authenticates a user and returns a session token.
- **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "user_password"
    }
    ```
- **Success Response (200 OK):**
    ```json
    {
      "user": {
        "id": "user-1",
        "name": "Alex Morocco",
        "email": "alex.m@example.com",
        "role": "customer"
      },
      "token": "jwt.session.token"
    }
    ```

### 2. Booking (`/api/bookings`)

Manages the core booking workflow.

**`POST /api/bookings`**
- **Description:** Creates a final booking after a user accepts an offer and completes payment.
- **Authentication:** `Bearer Token` required.
- **Request Body:**
    ```json
    {
        "userId": "user-1",
        "carId": "car-4",
        "agencyName": "Atlas Rent",
        "pickupDate": "2025-11-10",
        "returnDate": "2025-11-17",
        "totalPrice": 287,
        "addOns": {
          "gps": true,
          "babySeat": false
        },
        "paymentToken": "stripe_payment_token_or_similar"
    }
    ```
- **Success Response (201 Created):** The newly created `BookingHistoryItem`.
    ```json
    {
        "bookingId": "BK-987654",
        "userId": "user-1",
        "carId": "car-4",
        "carName": "Dacia Duster",
        "carImageUrl": "...",
        "agencyName": "Atlas Rent",
        "pickupDate": "2025-11-10",
        "returnDate": "2025-11-17",
        "totalPrice": 287,
        "status": "Upcoming"
    }
    ```

**`GET /api/bookings`**
- **Description:** Retrieves the booking history for the currently authenticated user.
- **Authentication:** `Bearer Token` required.
- **Success Response (200 OK):** An array of `BookingHistoryItem` objects.

### 3. Public Data (`/api/data`)

Endpoints that do not require authentication for retrieving initial application data.

**`GET /api/data/all`**
- **Description:** Retrieves all necessary public data in a single call for initial app load.
- **Success Response (200 OK):**
    ```json
    {
        "cars": [ { "...Car..." } ],
        "agencies": [ { "...Agency..." } ]
    }
    ```

### 4. Gemini AI Proxy (`/api/services`)

Securely proxies requests to the Gemini API from the backend.

**`POST /api/services/generate-itinerary`**
- **Description:** Generates a travel itinerary.
- **Request Body:**
    ```json
    {
      "location": "Marrakech",
      "duration": 7
    }
    ```
- **Success Response (200 OK):**
    ```json
    {
      "itinerary": "Day 1: Explore the Medina..."
    }
    ```

### 5. Admin Panel (`/api/admin`)

All endpoints here require an admin role and a valid `Bearer Token`.

**Users**
- **`GET /api/admin/users`**: Get a list of all users.
- **`PUT /api/admin/users/:userId`**: Update a user's details (e.g., role).
- **`DELETE /api/admin/users/:userId`**: Deletes a user.

**Bookings**
- **`GET /api/admin/bookings`**: Get a list of all bookings from all users.
- **`PUT /api/admin/bookings/:bookingId`**: Update the status of a booking.

**Cars**
- **`GET /api/admin/cars`**: Get a list of all cars in the fleet.
- **`POST /api/admin/cars`**: Adds a new car to the fleet.
- **`PUT /api/admin/cars/:carId`**: Updates an existing car's details.
- **`DELETE /api/admin/cars/:carId`**: Deletes a car from the fleet.
