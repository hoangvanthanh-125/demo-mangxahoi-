import { USER } from "./userInterface";

export interface ROOM{
idRoom:string,
members:string[],
createdAt: number,
id?:string
}
export interface MESSAGE{
  idMessage:string,
  userSentUid?:string,
  userReceiveUid?:string,
  createdAt:number ,
  urlImg?:string,
  content:string,
  idRoom:string,
  id?:string
  
}