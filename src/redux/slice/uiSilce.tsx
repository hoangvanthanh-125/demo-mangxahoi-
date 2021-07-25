import { createSlice } from "@reduxjs/toolkit";
interface UI{
  isOpen:boolean,
  header:string,
  bodyContent:any
}
const initialState = {
  isOpen:false,
  header:"",
  bodyContent:""
} as UI
const uiSlice = createSlice({
  name:'ui',
  initialState,
  reducers:{
   openModal:(state) => {
     state.isOpen = true
   },
   closeModal:(state) => {
     state.isOpen = false
   },
   fetchHeaderModal:(state,action) => {
     state.header = action.payload
   },
   fetchBodyModal:(state,action) => {
    state.bodyContent = action.payload
  }
  }
})
export const {actions:uiActions} = uiSlice;
export const {reducer:uiReducer} = uiSlice;