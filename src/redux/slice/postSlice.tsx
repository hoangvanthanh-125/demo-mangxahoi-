import { createSlice } from "@reduxjs/toolkit";
import { POST } from "../../interfaces/postInterface";
import { addListPostActions, fetchAllPostActions, updatePostActions } from "../actions/postAction";
interface STATE {
  listPost:POST[],
  loading:boolean,
  error:null|string|undefined
}
const initialState= {
 listPost:[] as POST[],
 loading:false,
 error:null
} as STATE

const postSlice = createSlice({
  name:'list-posts',
  initialState,
  reducers:{
  },
  extraReducers:(builder) => builder
  .addCase(fetchAllPostActions.pending,state => {
    state.loading = true;
  })
  .addCase(fetchAllPostActions.fulfilled,(state,action) => {
    state.loading = false;
    state.listPost = action.payload;
  } )
  .addCase(fetchAllPostActions.rejected,(state,action) => {
    state.error = action.error.message;
    state.loading = false;
  })
  .addCase(addListPostActions.pending,state => {
    // state.loading = true;
  })
  .addCase(addListPostActions.fulfilled,(state,action) => {
    // state.loading = false;
    state.listPost = [action.payload].concat(state.listPost);
  } )
  .addCase(addListPostActions.rejected,(state,action) => {
    state.error = action.error.message;
  })
  .addCase(updatePostActions.pending,(state) => {
    state.loading = true;
  })
  .addCase(updatePostActions.fulfilled,(state,action) => {
    state.loading = false;
    const index = state.listPost.findIndex(item => item.postId ===action.payload.postId);
    state.listPost[index] = action.payload;
  } )
  .addCase(updatePostActions.rejected,(state,action) => {
    state.error = action.error.message;
    state.loading = false;
  })

})
export const {reducer:postReducer} = postSlice;
export const {actions:postActions} = postSlice;
