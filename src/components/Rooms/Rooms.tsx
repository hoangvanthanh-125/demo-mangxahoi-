import qs from "query-string";
import React from "react";
import { useLocation } from "react-router-dom";
import { MESSAGE, ROOM } from "../../interfaces/chatInterface";
import { USER } from "../../interfaces/userInterface";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import RoomItem from "../RoomItem/RoomItem";
import useStyle from "./style";
import firebase from "firebase";
import { roomActions } from "../../redux/slice/roomChatSlice";
interface Props {
  listRoom: NEW_ROOM[];
  handleClickSetCurrentRoom: (room: NEW_ROOM) => void;
  setOpenModal: () => void;
  closeModal: () => void;
  currentRoom: NEW_ROOM;
  listMessage: MESSAGE[],
  loading:boolean
}
interface NEW_ROOM extends ROOM {
  userReceive: USER;
}

function Rooms({
  listRoom,
  handleClickSetCurrentRoom,
  setOpenModal,
  closeModal,
  listMessage,
  currentRoom,
  loading
}: Props) {
  const classes = useStyle();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { search } = useLocation();
  const obj = qs.parse(search);
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const renderListRoom = () => {
    let xhtml = null;
    if (listRoom.length > 0) {
      xhtml = listRoom.map((room: NEW_ROOM, index: number) => {
        return (
         <div
         onClick={() => handleClickSetRoom(room)}
         key={index}
         style={{
           background: `${obj?.idRoom === room?.idRoom ? "lightgray" : ""}`,
         }}
       >
         <RoomItem
         loading={loading}
           lastMessage={listMessage[listMessage?.length - 1]}
           room={room}
         />
       </div>
        );
      });
    }
    return xhtml;
  };
  const handleClickSetRoom = (room: NEW_ROOM) => {
    if (handleClickSetCurrentRoom) {
      handleClickSetCurrentRoom(room);
      setOpenModal();
      if (
        currentRoom?.lastMessage?.userSentUid !== user?.uid &&
        currentRoom?.lastMessage?.createdAt
      ) {
        firebase.firestore().collection("rooms").doc(currentRoom?.id).update({
          "lastMessage.checked": true,
        });
        dispatch(
          roomActions.updateRoom({
            ...room,
            lastMessage: {
              ...room?.lastMessage,
              checked: true,
            },
          })
        );
      }
    }
  };
  return (
    <div className={classes.wrap}>
      <div className={classes.header}>{currentUser?.displayName}</div>
      <div className={classes.body}>{renderListRoom()}</div>
    </div>
  );
}

export default Rooms;
