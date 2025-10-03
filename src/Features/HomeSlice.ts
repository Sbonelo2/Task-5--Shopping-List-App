import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define item type
type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
  image?: string; // image URL or base64
};

// Define state type
type ShoppingListState = {
  items: ShoppingItem[];
};

// Initial state
const initialState: ShoppingListState = {
  items: [],
};

// Slice
const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action: PayloadAction<ShoppingItem>) => {
      // Find index of item
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload; // Update item
      }
    },
  },
});

// Export actions
export const { addItem, removeItem, updateItem } = shoppingListSlice.actions;

// Export reducer
export default shoppingListSlice.reducer;
