import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface LoginState {
  [x: string]: any;
  Email: string;
  password: string;
}

const initialState: LoginState = {
 
  password: "1234567",
    Email: "cbonelo224@gmail.com",

};
export const loginSlice = createSlice({
  name: "counter",
 
  initialState,
  reducers: {},
});
export default loginSlice.reducer;
