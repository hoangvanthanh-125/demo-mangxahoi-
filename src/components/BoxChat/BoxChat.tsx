import { Avatar } from "@material-ui/core";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { MESSAGE, ROOM } from "../../interfaces/chatInterface";
import { USER } from "../../interfaces/userInterface";
import FormChat from "../formChat/FormChat";
import MessageItem from "../messageItem/MessageItem";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import useStyle from './style';
interface Props {
  listMessage: MESSAGE[];
  idRoom: string,
  currentRoom:NEW_ROOM,
  closeModal:() => void
}
interface NEW_ROOM extends ROOM{
  userReceive:USER
}

function BoxChat({ listMessage, idRoom ,currentRoom,closeModal}: Props) {
  const classes = useStyle()
  const dummy = useRef(null);
  const { search } = useLocation();
  const renderMessItem = () => {
    let xhtml = null;
    if (listMessage.length > 0) {
      xhtml = listMessage.map((message: MESSAGE) => (
        <MessageItem userReceive={currentRoom?.userReceive} key={message.idMessage} message={message} />
      ));
    }
    return xhtml;
  };
  
  return (
   search? <div className={classes.boxChat}>
   <div className={classes.header}>
   <Avatar src = {currentRoom?.userReceive?.photoURL} />
   <span>{currentRoom?.userReceive?.displayName}</span>
   <ArrowForwardIcon onClick={() => {closeModal()}} className={classes.iconBack} />
   </div>
   <div className={classes.body}>
   {renderMessItem()}
   <span ref={dummy}></span>
   </div>
    <FormChat dummy={dummy} idRoom={idRoom} />
  </div>:<div className={classes.noChat}>
    Gửi tin nhắn cho bạn bè
  </div>
  );
}

export default BoxChat;
