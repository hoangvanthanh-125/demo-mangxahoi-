import qs from "query-string";
import React from "react";
import { useLocation } from "react-router-dom";
import { ROOM } from "../../interfaces/chatInterface";
import { USER } from "../../interfaces/userInterface";
import { useAppSelector } from "../../redux/hook";
import RoomItem from "../RoomItem/RoomItem";
import useStyle from "./style";
interface Props {
  listRoom: NEW_ROOM[];
  handleClickSetCurrentRoom: (room: NEW_ROOM) => void;
  setOpenModal: () => void;
  closeModal: () => void;
}
interface NEW_ROOM extends ROOM {
  userReceive: USER;
}

function Rooms({
  listRoom,
  handleClickSetCurrentRoom,
  setOpenModal,
  closeModal,
}: Props) {
  console.log(listRoom.length);

  const classes = useStyle();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { search } = useLocation();
  const obj = qs.parse(search);
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
            <RoomItem room={room} />
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
