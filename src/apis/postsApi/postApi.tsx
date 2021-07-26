import { POST } from "../../interfaces/postInterface";
import axiosClient from "../axiosClient";

export const fetAllPost = () => axiosClient.get('/posts');
export const postListposts = (data:POST) => axiosClient.post('/posts',data);
export const updatePost = (data:POST) => axiosClient.put(`posts/${data.id}`,data);
export const deletePost = (data:POST) => axiosClient.delete(`posts/${data.id}`);