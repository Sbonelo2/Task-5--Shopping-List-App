import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface LoginState {
  username: string;
  password: string;
}
// Define the initial state using that type
const initialState: LoginState = {
  username: "",
  password: "",
};
export const RegisterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});
export default RegisterSlice.reducer;
