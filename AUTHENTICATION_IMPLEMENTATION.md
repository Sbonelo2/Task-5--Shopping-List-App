# Authentication Implementation Summary

## Overview
This document outlines the authentication implementation that forces users to register or login before accessing the shopping list app.

## Changes Made

### 1. Created ProtectedRoute Component
**File**: `src/Components/ProtectedRoute.tsx`

- Checks if user is authenticated by looking for `loggedInUserId` in localStorage
- Redirects unauthenticated users to `/login`
- Shows loading state while checking authentication
- Wraps protected components to ensure access control

### 2. Updated App.tsx Routing
**File**: `src/App.tsx`

**Changes**:
- Added default route (`/`) that redirects to `/login`
- Wrapped `/home` and `/profile` routes with `ProtectedRoute` component
- Separated public routes (login, registration) from protected routes
- Imported `Navigate` from react-router-dom for redirects

**Route Structure**:
```
/ → redirects to /login
/login → Public (Login page)
/registration → Public (Registration page)
/home → Protected (requires authentication)
/profile → Protected (requires authentication)
```

### 3. Updated Registration Flow
**File**: `src/Pages/Register.tsx`

**Changes**:
- Changed redirect destination from `/profile` to `/home` after successful registration
- Users are automatically logged in after registration (userId stored in localStorage)
- Added link to login page for existing users

### 4. Enhanced Login Page
**File**: `src/Pages/Login.tsx`

**Changes**:
- Added link to registration page for new users
- Maintains existing functionality (login to home or profile)

### 5. Updated README
**File**: `README.md`

**Changes**:
- Added comprehensive documentation about authentication flow
- Included setup instructions for json-server
- Documented data storage mechanisms
- Added feature list highlighting authentication

## Authentication Flow

1. **App Opens** → User is redirected to `/login` (if not authenticated)
2. **User Options**:
   - **New User**: Click "Register here" → Fill registration form → Auto-login → Redirect to `/home`
   - **Existing User**: Enter credentials → Click "Go to Home" or "Go to Profile" → Redirect accordingly
3. **Protected Access**: Any attempt to access `/home` or `/profile` without authentication redirects to `/login`
4. **Session Persistence**: Authentication state persists via localStorage

## Data Storage

### User Data (JSON Server)
- **Location**: `src/data/db.json`
- **Port**: 5000
- **Endpoint**: `http://localhost:5000/users`
- **Storage**: User credentials and profile information

### Shopping Lists (localStorage)
- **Key**: `shoppingLists`
- **Format**: JSON array of shopping list objects
- **Managed by**: Redux Toolkit (HomeSlice)
- **Persistence**: Automatic save on every list/item modification

### Authentication Session (localStorage)
- **Key**: `loggedInUserId`
- **Value**: User ID string
- **Purpose**: Track authenticated user session

## Testing the Implementation

1. **Start JSON Server**:
   ```bash
   json-server --watch src/data/db.json --port 5000
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Test Scenarios**:
   - Open app → Should redirect to login
   - Try accessing `/home` directly → Should redirect to login
   - Register new user → Should redirect to home page
   - Login existing user → Should redirect to home/profile
   - Create shopping lists → Should save to localStorage
   - Logout → Clear localStorage → Redirect to login

## Security Notes

- Authentication is client-side only (suitable for demo/learning purposes)
- For production, implement server-side authentication with JWT tokens
- Passwords are stored in plain text in db.json (use hashing in production)
- No session expiration implemented (add timeout for production)

## Future Enhancements

- Add password hashing
- Implement JWT tokens
- Add session timeout
- Add "Remember Me" functionality
- Add password reset feature
- Add email verification
- Implement OAuth (Google, Facebook, etc.)
