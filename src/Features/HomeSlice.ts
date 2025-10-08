import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  notes?: string;
  image?: string;
  date: string;
}

interface ShoppingState {
  items: ShoppingItem[];
  searchKeyword: string;
  sortBy: "date" | "name" | "category";
}

const initialState: ShoppingState = {
  items: [],
  searchKeyword: "",
  sortBy: "date",
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    sortItems: (state, action: PayloadAction<"date" | "name" | "category">) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addItem, updateItem, removeItem, setSearchKeyword, sortItems } =
  shoppingSlice.actions;

export default shoppingSlice.reducer;
