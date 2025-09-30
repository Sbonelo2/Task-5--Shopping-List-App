import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface LoginState {
  Email: string;
  password: string;
  Name: string;
    surrname: string;
    cellphone: number;
}
// Define the initial state using that type
const initialState: LoginState = {
    Email: "",
    password: "1234567",
    Name: "",
    surrname: "",
    cellphone: 0,
};
export const RegisterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});
export default RegisterSlice.reducer;
