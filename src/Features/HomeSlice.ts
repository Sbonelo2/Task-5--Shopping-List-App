import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
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
  userId?: string;
}

interface HomeState {
  lists: ShoppingList[];
  loading: boolean;
  error: string | null;
}

const API_URL = "http://localhost:5000/shoppingLists";

// Fetch shopping lists for a specific user from JSON server
export const fetchLists = createAsyncThunk(
  "home/fetchLists",
  async (userId: string) => {
    const response = await fetch(`${API_URL}?userId=${userId}`);
    const data = await response.json();
    return data as ShoppingList[];
  }
);

// Save list to JSON server
const saveToServer = async (list: ShoppingList) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    });
    return await response.json();
  } catch (err) {
    console.error("Error saving to server", err);
  }
};

// Update list on JSON server
const updateOnServer = async (list: ShoppingList) => {
  try {
    await fetch(`${API_URL}/${list.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    });
  } catch (err) {
    console.error("Error updating on server", err);
  }
};

// Delete list from JSON server
const deleteFromServer = async (id: string) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("Error deleting from server", err);
  }
};

const initialState: HomeState = {
  lists: [],
  loading: false,
  error: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<ShoppingList>) => {
      state.lists.push(action.payload);
      saveToServer(action.payload);
    },
    updateList: (state, action: PayloadAction<ShoppingList>) => {
      const index = state.lists.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.lists[index] = { ...state.lists[index], ...action.payload };
        updateOnServer(state.lists[index]);
      }
    },
    removeList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((l) => l.id !== action.payload);
      deleteFromServer(action.payload);
    },
    addSubItem: (
      state,
      action: PayloadAction<{ parentId: string; subItem: SubItem }>
    ) => {
      const card = state.lists.find((l) => l.id === action.payload.parentId);
      if (card) {
        card.subItems.push(action.payload.subItem);
        updateOnServer(card);
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
          updateOnServer(card);
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
        updateOnServer(card);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch lists";
      });
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
