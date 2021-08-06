import { USER } from "./userInterface";

export interface ROOM{
idRoom:string,
members:string[],
createdAt: number,
id?:string,
lastMessage?:LAST_MESSAGE
}
export interface MESSAGE{
  idMessage:string,
  userSentUid?:string,
  userReceiveUid?:string,
  createdAt:number ,
  urlImg?:string,
  content:string,
  idRoom:string,
  id?:string,  
}
export interface LAST_MESSAGE extends MESSAGE{
  checked:boolean
}
export interface NEW_ROOM extends ROOM {
  userReceive: USER;
}
