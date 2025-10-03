import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
  image?: string; // image URL or base64
};

type ShoppingListState = {
  items: ShoppingItem[];
};

const initialState: ShoppingListState = {
  items: [],
};

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
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
