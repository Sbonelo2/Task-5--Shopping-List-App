import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./src/Features/LoginSlice";
import RegisterReducer from "./src/Features/RegisterSlice";
import ProfileReducer from "./src/Features/ProfileSlice";
import HomeReducer from "./src/Features/HomeSlice";


export const store = configureStore({
    reducer: {
        login: LoginReducer,
        register: RegisterReducer,
        profile: ProfileReducer,
        home: HomeReducer,

  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;