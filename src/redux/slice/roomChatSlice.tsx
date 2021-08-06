import { Satellite } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";
import { NEW_ROOM } from "../../interfaces/chatInterface";
const initialState = {
  listRoom:[] as NEW_ROOM[]
}
const roomChatSlice = createSlice({
  name:'room',
  initialState,
  reducers:{
    fetchListRoom:(state,action) => {
      state.listRoom = action.payload
    },
    updateRoom:(state,action) => {
      const index = state.listRoom.findIndex((room : NEW_ROOM) => room.idRoom === action.payload.idRoom);
      state.listRoom[index] = action.payload
    }
  }
})
export const {actions:roomActions} = roomChatSlice;
export const {reducer:roomReducer} = roomChatSlice;