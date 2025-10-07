import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


// Define user type
export type User = {
  username: string;
  name: string;
  cellphone: string;
  email: string;
  password: string;
};

// Initial state
const initialState: User = {
  username: "",
  name: "",
  cellphone: "",
  email: "",
  password: "",
};


export const saveUser = createAsyncThunk(
  "user/saveUser",
  async (userData: User) => {
    
    const response = await axios.post("/api/user", userData);
    return response.data as User;
  }
);

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    updateProfile: (
      state,
      action: PayloadAction<{
        username: string;
        name: string;
        cellphone: string;
        email: string;
      }>
    ) => {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.cellphone = action.payload.cellphone;
      state.email = action.payload.email;
    },

    // Update password locally
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        // Replace state with saved user from server
        return { ...state, ...action.payload };
      }
    );
  },
});


export const { updateProfile, updatePassword } = userSlice.actions;

export default userSlice.reducer;
