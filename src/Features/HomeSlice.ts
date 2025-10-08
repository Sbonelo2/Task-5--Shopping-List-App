import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Define sub-item structure
export interface SubItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  notes?: string;
  image?: string;
  date: string;
}

// Define card (list) structure
export interface ShoppingList {
  id: string;
  title: string;
  date: string;
  subItems: SubItem[];
}

// Define full slice state
interface HomeState {
  lists: ShoppingList[];
}

const initialState: HomeState = {
  lists: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // 🟢 Add a new shopping card
    addList: (state, action: PayloadAction<ShoppingList>) => {
      state.lists.push(action.payload);
    },

    // 🟠 Update a card’s title
    updateList: (state, action: PayloadAction<ShoppingList>) => {
      const index = state.lists.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.lists[index] = {
          ...state.lists[index],
          title: action.payload.title,
        };
      }
    },

    // 🔴 Remove a shopping card
    removeList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((l) => l.id !== action.payload);
    },

    // 🟢 Add a sub-item to a card
    addSubItem: (
      state,
      action: PayloadAction<{ parentId: string; subItem: SubItem }>
    ) => {
      const card = state.lists.find((l) => l.id === action.payload.parentId);
      if (card) {
        card.subItems.push(action.payload.subItem);
      }
    },

    // 🟠 Update a sub-item within a card
    updateSubItem: (
      state,
      action: PayloadAction<{ parentId: string; subItem: SubItem }>
    ) => {
      const { parentId, subItem } = action.payload;
      const card = state.lists.find((l) => l.id === parentId);
      if (card) {
        const subIndex = card.subItems.findIndex((s) => s.id === subItem.id);
        if (subIndex !== -1) {
          card.subItems[subIndex] = subItem;
        }
      }
    },

    // 🔴 Remove a sub-item from a card
    removeSubItem: (
      state,
      action: PayloadAction<{ parentId: string; subId: string }>
    ) => {
      const { parentId, subId } = action.payload;
      const card = state.lists.find((l) => l.id === parentId);
      if (card) {
        card.subItems = card.subItems.filter((s) => s.id !== subId);
      }
    },
  },
});

// Export actions
export const {
  addList,
  updateList,
  removeList,
  addSubItem,
  updateSubItem,
  removeSubItem,
} = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
