import { Avatar } from "@material-ui/core";
import React, { useRef } from "react";
import { useEffect } from "react";
import { MESSAGE } from "../../interfaces/chatInterface";
import { USER } from "../../interfaces/userInterface";
import { useAppSelector } from "../../redux/hook";
import FormChat from "../formChat/FormChat";
import MessageItem from "../messageItem/MessageItem";
import useStyle from './style'
interface Props {
  listMessage: MESSAGE[];
  idRoom: string,
  userReceive :USER
}

function BoxChat({ listMessage, idRoom,userReceive }: Props) {
  const classes = useStyle()
  const dummy = useRef(null);

  const renderMessItem = () => {
    let xhtml = null;
    if (listMessage.length > 0) {
      xhtml = listMessage.map((message: MESSAGE) => (
        <MessageItem userReceive={userReceive} key={message.idMessage} message={message} />
      ));
    }
    return xhtml;
  };
  useEffect(() => {}, [idRoom]);
  return (
    <div className={classes.boxChat}>
     <div className={classes.header}>
     <Avatar src = {userReceive?.photoURL} />
     <span>{userReceive?.displayName}</span>
     </div>
     <div className={classes.body}>
     {renderMessItem()}
     <span ref={dummy}></span>
     </div>
      <FormChat dummy={dummy} idRoom={idRoom} />
    </div>
  );
}

export default BoxChat;
