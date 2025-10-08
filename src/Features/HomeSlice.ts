import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface SubItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  notes?: string;
  image?: string;
  date: string;
}

export interface ShoppingList {
  id: string;
  title: string;
  date: string;
  subItems: SubItem[];
}

interface HomeState {
  lists: ShoppingList[];
}

//   saved lists from localStorage
const loadFromLocalStorage = (): ShoppingList[] => {
  try {
    const data = localStorage.getItem("shoppingLists");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

//  Save lists to localStorage as JSON
const saveToLocalStorage = (lists: ShoppingList[]) => {
  try {
    localStorage.setItem("shoppingLists", JSON.stringify(lists));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

const initialState: HomeState = {
  lists: loadFromLocalStorage(),
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<ShoppingList>) => {
      state.lists.push(action.payload);
      saveToLocalStorage(state.lists);
    },
    updateList: (state, action: PayloadAction<ShoppingList>) => {
      const index = state.lists.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.lists[index] = { ...state.lists[index], ...action.payload };
        saveToLocalStorage(state.lists);
      }
    },
    removeList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((l) => l.id !== action.payload);
      saveToLocalStorage(state.lists);
    },
    addSubItem: (
      state,
      action: PayloadAction<{ parentId: string; subItem: SubItem }>
    ) => {
      const card = state.lists.find((l) => l.id === action.payload.parentId);
      if (card) {
        card.subItems.push(action.payload.subItem);
        saveToLocalStorage(state.lists);
      }
    },
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
          saveToLocalStorage(state.lists);
        }
      }
    },
    removeSubItem: (
      state,
      action: PayloadAction<{ parentId: string; subId: string }>
    ) => {
      const { parentId, subId } = action.payload;
      const card = state.lists.find((l) => l.id === parentId);
      if (card) {
        card.subItems = card.subItems.filter((s) => s.id !== subId);
        saveToLocalStorage(state.lists);
      }
    },
  },
});

export const {
  addList,
  updateList,
  removeList,
  addSubItem,
  updateSubItem,
  removeSubItem,
} = homeSlice.actions;

export default homeSlice.reducer;
