import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  category: string;
  notes?: string;
  image?: string;
  dateAdded: string;
};

type ShoppingState = {
  items: ShoppingItem[];
};

const initialState: ShoppingState = {
  items: [],
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<Omit<ShoppingItem, "id" | "dateAdded">>
    ) => {
      state.items.push({
        ...action.payload,
        id: uuidv4(),
        dateAdded: new Date().toISOString(),
      });
    },
    updateItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, removeItem } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;

