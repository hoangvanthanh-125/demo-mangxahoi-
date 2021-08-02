import React from "react";
import { useState } from "react";
import { ROOM } from "../../interfaces/chatInterface";
import { useAppSelector } from "../../redux/hook";
import RoomItem from "../RoomItem/RoomItem";
import useStyle from "./style";
import qs from "query-string";
import { useLocation } from "react-router-dom";
interface Props {
  listRoom: ROOM[];
}

function Rooms({ listRoom }: Props) {
  const classes = useStyle();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { search } = useLocation();
  const obj = qs.parse(search);
  const renderListRoom = () => {
    let xhtml = null;
    if (listRoom.length > 0) {
      xhtml = listRoom.map((room: ROOM, index: number) => {
        return (
          <div
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
  return (
    <div className={classes.wrap}>
      <div className={classes.header}>{currentUser?.displayName}</div>
      <div className={classes.body}>{renderListRoom()}</div>
    </div>
  );
}

export default Rooms;
