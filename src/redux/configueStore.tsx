import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slice/postSlice";
import { userReducer } from "./slice/userSlice";
export const store = configureStore({
  reducer:{
    user:userReducer,
    posts:postReducer
  }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>