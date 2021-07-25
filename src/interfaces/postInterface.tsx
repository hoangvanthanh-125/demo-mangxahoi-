import { USER } from "./userInterface";
export interface COMMENT{
  idComment?:string,
  createdAt:Date,
  id?:string,
  contentComment:string,
  userComment:USER,
  listRepComment:COMMENT[]

}

export interface POST{
  postId:string,
  createdAt:Date,
  title:string|'',
  color:string,
  urlImage:string | null,
  userPost:USER,
  listLike:USER[],
  listComment:COMMENT[],
  id?:string
  

}