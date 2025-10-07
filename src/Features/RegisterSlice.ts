import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface LoginState {
  Email: string;
  password: string;
  Name: string;
    surrname: string;
    cellphone: number;
}

const initialState: LoginState = {
    Email: "",
    password: "1234567",
    Name: "",
    surrname: "",
    cellphone: 0,
};
export const RegisterSlice = createSlice({
  name: "counter",
  
  initialState,
  reducers: {},
});
export default RegisterSlice.reducer;
