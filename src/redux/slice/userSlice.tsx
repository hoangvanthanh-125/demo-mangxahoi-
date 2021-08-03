import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../../interfaces/userInterface";
// interface USER{
//   displayName:string,
//   email:string,
//   uid:string,
//   photoURL:string,
//   urlBia:string
// }
type TypeUSer ={
  currentUser:USER | null,
  user:null|string,
  isAuth:boolean,
  listUser:USER[]
}
const initialState:TypeUSer = {
  currentUser:null,
  user:null,
  isAuth:false
} as TypeUSer
const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
   fetchCurrentUser :(state,action) => {
     state.currentUser = action.payload;
    //  state.isAuth = true
   },
   updateCurrentUser:(state,action) => {
     state.currentUser = action.payload;
   },
  fetchListUser:(state,action) => {
    state.listUser = action.payload
  }
}})
export const {reducer:userReducer} = userSlice;
export const {actions:userActions} = userSlice;
