import { Avatar } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormatTime } from "../../common/formatTime";
import { MESSAGE, NEW_ROOM } from "../../interfaces/chatInterface";
import { useAppSelector } from "../../redux/hook";
import useStyle from "./style";
interface Props {
  room: NEW_ROOM,
  lastMessage:MESSAGE,
  loading:boolean
}

function RoomItem({ room}: Props) {
  const { pathname } = useLocation();
  const history = useHistory();
  const classes = useStyle();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  var lastMess = "";
  if (room?.lastMessage && room?.lastMessage?.createdAt) {
    if (room?.lastMessage?.urlImg) {
      if (room?.lastMessage?.userSentUid === currentUser?.uid) {
        lastMess = "Bạn đã gửi 1 ảnh";
      } else {
        lastMess = "Đã gửi 1 ảnh";
      }
    } else {
      if (room?.lastMessage?.userSentUid === currentUser?.uid) {
        lastMess = `Bạn : ${room?.lastMessage?.content}`;
      } else {
        lastMess = `${room?.lastMessage?.content}`;
      }
    }
  }
  const hanldeClickRoom = () => {
    history.push({
      pathname,
      search: `?idRoom=${room.idRoom}`,
    });
  };

  return (
   <div onClick={() => hanldeClickRoom()} className={classes.wrap}>
    <Avatar src={room?.userReceive?.photoURL} />
    <div className={classes.wrapContent}>
      <span> {room?.userReceive?.displayName}</span>
      {lastMess && (
        <div className={classes.wrapLastMessage}>
          <span
            style={{
              fontWeight:
                room?.lastMessage?.userSentUid !== currentUser?.uid &&
                room?.lastMessage?.checked === false
                  ? "bold"
                  : "normal",
              color:
                room?.lastMessage?.userSentUid !== currentUser?.uid &&
                room?.lastMessage?.checked === false
                  ? "black"
                  : "gray",
            }}
          >
            {lastMess}
          </span>
          <span>{FormatTime(room?.lastMessage?.createdAt!)}</span>
        </div>
      )}
    </div>
  </div>
  );
}

export default RoomItem;
