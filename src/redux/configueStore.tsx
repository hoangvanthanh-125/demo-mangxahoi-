import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slice/postSlice";
import { uiReducer } from "./slice/uiSilce";
import { userReducer } from "./slice/userSlice";
export const store = configureStore({
  reducer:{
    user:userReducer,
    posts:postReducer,
    ui:uiReducer
  }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>