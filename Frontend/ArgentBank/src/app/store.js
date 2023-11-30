import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/counter/authSlice";
export var store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
