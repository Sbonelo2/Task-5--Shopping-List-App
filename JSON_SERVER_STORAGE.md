# JSON Server Storage Implementation

## Overview
Shopping lists are now saved to the JSON server (`db.json`) instead of localStorage, providing persistent server-side storage.

## Changes Made

### 1. Updated db.json
**File**: `src/data/db.json`

Added a new `shoppingLists` endpoint:
```json
{
  "users": [...],
  "shoppingLists": []
}
```

### 2. Updated HomeSlice.ts
**File**: `src/Features/HomeSlice.ts`

**Major Changes**:
- Added `createAsyncThunk` import for async operations
- Created `fetchLists` thunk to load lists from server
- Added `saveToServer`, `updateOnServer`, and `deleteFromServer` helper functions
- Updated all reducers to call server API instead of localStorage
- Added `loading` and `error` state for better UX
- Added `extraReducers` to handle async fetch operations
- Added optional `userId` field to `ShoppingList` interface

**API Endpoints**:
- `GET http://localhost:5000/shoppingLists` - Fetch all lists
- `POST http://localhost:5000/shoppingLists` - Create new list
- `PUT http://localhost:5000/shoppingLists/:id` - Update list
- `DELETE http://localhost:5000/shoppingLists/:id` - Delete list

### 3. Updated Home.tsx
**File**: `src/Pages/Home.tsx`

**Changes**:
- Added `useEffect` to fetch lists on component mount
- Added `AppDispatch` type for proper typing
- Added loading state display
- Added `userId` to new shopping lists (links lists to logged-in user)
- Imported and dispatched `fetchLists` action

## Data Flow

### Creating a List
1. User enters list title and clicks "Add List"
2. `handleAddCard` creates list object with userId
3. `addList` action dispatched
4. Redux updates state locally
5. `saveToServer` sends POST request to JSON server
6. List saved to `db.json`

### Loading Lists
1. Component mounts
2. `fetchLists` thunk dispatched
3. GET request to JSON server
4. Lists loaded from `db.json`
5. Redux state updated with fetched lists
6. UI re-renders with lists

### Updating Lists
1. User modifies list or adds/removes items
2. Appropriate action dispatched (updateList, addSubItem, etc.)
3. Redux updates state locally
4. `updateOnServer` sends PUT request to JSON server
5. Changes persisted to `db.json`

### Deleting Lists
1. User clicks delete button
2. `removeList` action dispatched
3. Redux removes from state
4. `deleteFromServer` sends DELETE request
5. List removed from `db.json`

## Storage Comparison

### Before (localStorage)
- ✅ Fast access
- ✅ No server required
- ❌ Browser-specific (not shared across devices)
- ❌ Limited to ~5-10MB
- ❌ Lost if browser data cleared

### After (JSON Server)
- ✅ Persistent server-side storage
- ✅ Accessible across devices/browsers
- ✅ Can be backed up easily
- ✅ Unlimited storage (file-based)
- ✅ Survives browser data clearing
- ✅ Can be deployed to real backend later

## Testing

### Start JSON Server
```bash
json-server --watch src/data/db.json --port 5000
```

### Test Scenarios
1. **Create List**: Add a new shopping list → Check `db.json` for new entry
2. **Add Items**: Add items to list → Verify list updated in `db.json`
3. **Edit List**: Modify list title → Confirm changes in `db.json`
4. **Delete List**: Remove a list → Verify deletion in `db.json`
5. **Refresh Page**: Reload browser → Lists should persist and reload
6. **Different Browser**: Open in another browser → Same lists appear (if logged in as same user)

## Viewing Data

### Option 1: Check db.json directly
Open `src/data/db.json` and look at the `shoppingLists` array

### Option 2: Use JSON Server API
```bash
# Get all lists
curl http://localhost:5000/shoppingLists

# Get specific list
curl http://localhost:5000/shoppingLists/[list-id]

# Get lists by user
curl http://localhost:5000/shoppingLists?userId=[user-id]
```

### Option 3: Browser DevTools
- Open Network tab
- Perform actions (create, update, delete)
- See API calls to `http://localhost:5000/shoppingLists`

## User-Specific Lists

Each shopping list now includes a `userId` field that links it to the logged-in user. This allows for:
- Filtering lists by user
- Multi-user support
- User-specific data isolation

To filter by user in JSON Server:
```
GET http://localhost:5000/shoppingLists?userId=8f3f
```

## Future Enhancements

1. **Filter by User**: Update Home.tsx to only show current user's lists
2. **Real Backend**: Replace json-server with Express/Node.js backend
3. **Database**: Use MongoDB, PostgreSQL, or Firebase
4. **API Authentication**: Add JWT tokens to secure API endpoints
5. **Offline Support**: Implement service workers for offline functionality
6. **Sync Conflicts**: Handle concurrent edits from multiple devices
7. **Real-time Updates**: Use WebSockets for live collaboration

## Troubleshooting

### Lists not saving
- Ensure json-server is running on port 5000
- Check browser console for errors
- Verify `db.json` has `shoppingLists` array

### Lists not loading
- Check Network tab for failed requests
- Ensure `fetchLists` is dispatched on mount
- Verify json-server is accessible

### CORS errors
- json-server enables CORS by default
- If issues persist, add `--cors` flag when starting server

### Port conflicts
- If port 5000 is in use, change to another port
- Update `API_URL` in HomeSlice.ts accordingly
