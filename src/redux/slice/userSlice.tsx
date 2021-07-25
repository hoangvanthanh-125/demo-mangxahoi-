import { createSlice } from "@reduxjs/toolkit";
interface USER{
  displayName:string,
  email:string,
  uid:string,
  photoURL:string
}
type TypeUSer ={
  currentUser:USER | null,
  user:null|string,
  isAuth:boolean
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
     state.isAuth = true
   },
   setUser :(state,action) => {
   state.user = action.payload;
   
  }
}})
export const {reducer:userReducer} = userSlice;
export const {actions:userActions} = userSlice;
