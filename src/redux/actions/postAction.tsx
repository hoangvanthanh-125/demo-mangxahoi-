import { createAsyncThunk } from "@reduxjs/toolkit";
import { deletePost, fetAllPost, postListposts, updatePost } from "../../apis/postsApi/postApi";
import { POST } from "../../interfaces/postInterface";

export const fetchAllPostActions = createAsyncThunk
(
  'fetch-listpost',
  async() => { 
    try{
      const res = await fetAllPost();
      return res.data;
    }catch(err) {
      throw err;

    }

  }
)
export const addListPostActions = createAsyncThunk('addPost',
async (params:POST) => {
  try{
    const res = await postListposts(params);
    return res.data;
  }
  catch(err){
    throw err;
  }
}
)

export const updatePostActions = createAsyncThunk('updatePost',
async (params:POST) => {
  try{
    const res = await updatePost(params);
    return res.data;
  }
  catch(err){
    throw err;
  }
}
)
export const deletePostActions = createAsyncThunk('deletePost',
async (params:POST) => {
  try{
    const res = await deletePost(params);
    return res.data;
  }
  catch(err){
    throw err;
  }
}
)
