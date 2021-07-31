import { Avatar } from "@material-ui/core";
import React from "react";
import { MESSAGE } from "../../interfaces/chatInterface";
import { USER } from "../../interfaces/userInterface";
import { useAppSelector } from "../../redux/hook";
import useStyle from "./style";
interface Props {
  message: MESSAGE,
  userReceive :USER
}

function MessageItem({ message,userReceive }: Props) {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const classes = useStyle();
  return (
    <div className={currentUser?.uid === message?.userSentUid ? classes.nguoigui : classes.nguoinhan}>
    {currentUser?.uid !== message?.userSentUid &&  <Avatar src={userReceive?.photoURL} />}
      <div className={classes.content}> {message.content}</div>
    </div>
  );
}

export default MessageItem;
