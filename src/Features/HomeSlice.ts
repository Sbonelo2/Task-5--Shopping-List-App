import  { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type SubItem = {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  image?: string;
  dateAdded: string;
};

type ShoppingList = {
  id: string;
  name: string;
  category: string;
  notes?: string;
  image?: string;
  dateAdded: string;
  items: SubItem[];
};

type HomeState = {
  lists: ShoppingList[];
};

const initialState: HomeState = {
  lists: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<Omit<ShoppingList, "id">>) => {
      state.lists.push({ id: uuidv4(), ...action.payload });
    },
    updateList: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<ShoppingList> }>
    ) => {
      const list = state.lists.find((l) => l.id === action.payload.id);
      if (list) Object.assign(list, action.payload.updates);
    },
    removeList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((l) => l.id !== action.payload);
    },

    addSubItem: (
      state,
      action: PayloadAction<{ listId: string; subItem: Omit<SubItem, "id"> }>
    ) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      if (list) list.items.push({ id: uuidv4(), ...action.payload.subItem });
    },
    updateSubItem: (
      state,
      action: PayloadAction<{
        listId: string;
        subId: string;
        updates: Partial<SubItem>;
      }>
    ) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      if (list) {
        const item = list.items.find((i) => i.id === action.payload.subId);
        if (item) Object.assign(item, action.payload.updates);
      }
    },
    removeSubItem: (
      state,
      action: PayloadAction<{ listId: string; subId: string }>
    ) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      if (list)
        list.items = list.items.filter((i) => i.id !== action.payload.subId);
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
