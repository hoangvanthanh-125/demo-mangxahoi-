import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slice/postSlice";
import { roomReducer } from "./slice/roomChatSlice";
import { uiReducer } from "./slice/uiSilce";
import { userReducer } from "./slice/userSlice";
export const store = configureStore({
  reducer:{
    user:userReducer,
    posts:postReducer,
    ui:uiReducer,
    rooms:roomReducer
  }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>