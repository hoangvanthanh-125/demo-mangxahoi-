import { USER } from "./userInterface";
export interface COMMENT {
  idComment?: string;
  createdAt: Date;
  id?: string;
  contentComment: string;
  userComment: USER;
  listRepComment: COMMENT[];
}

export interface POST {
  postId: string;
  createdAt: Date | number;
  title: string | "";
  color: string;
  urlImage: string | null;
  userPost: USER;
  listLike: USER[];
  listComment: COMMENT[];
  id?: string;
  contentType:string,
  uidUserPost:string
}
export interface NOTIFY {
  contentNotify: string;
  uid: string;
  idPost: string;
  idNotify: string;
  photoURL: string;
  created:number,
  nameUserMadeNotify:string,
  watched:boolean,
  clicked:boolean,
  id?:string
}
