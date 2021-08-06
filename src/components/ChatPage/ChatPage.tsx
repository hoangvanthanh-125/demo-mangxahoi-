import { Grid, Modal } from "@material-ui/core";
import React, { useState } from "react";
import Rooms from "../Rooms/Rooms";
import useStyles from "./style";
import firebase from "firebase";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { MESSAGE, ROOM } from "../../interfaces/chatInterface";
import BoxChat from "../BoxChat/BoxChat";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { USER } from "../../interfaces/userInterface";
import { roomActions } from "../../redux/slice/roomChatSlice";
function ChatPage() {
  const classes = useStyles();
  const { search, state } = useLocation();
  const currentUser = useAppSelector((state) => state.user.currentUser!);
  const [listMessage, setListMessage] = useState<MESSAGE[]>([]);
  const [idRoom, setIdRoom] = useState("");
  const [currentRoom, setCurrentRoom] = useState<NEW_ROOM>({} as NEW_ROOM);
  const [open, setOpen] = useState(false);
  const { listRoom } = useAppSelector((state) => state.rooms);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { listUser } = useAppSelector((state) => state.user);
  interface NEW_ROOM extends ROOM {
    userReceive: USER;
  }

  useEffect(() => {
    if (currentUser) {
      firebase
        .firestore()
        .collection("rooms")
        .where("members", "array-contains", currentUser.uid)

        .onSnapshot((res) => {
          const list: NEW_ROOM[] = [];
          res.docs.forEach((doc) => {
            const { members } = doc?.data();

            const uidReceive = members?.filter(
              (mem: string) => mem !== currentUser?.uid!
            )[0];
            const userReceive = listUser?.find(
              (user: USER) => user?.uid === uidReceive
            );
            const newRoom = { ...doc?.data(), userReceive, id: doc?.id };

            list.push(newRoom as NEW_ROOM);
          });
          list.sort((room1: NEW_ROOM, room2: NEW_ROOM) => {
            if (
              room1?.lastMessage?.createdAt! > room2?.lastMessage?.createdAt!
            ) {
              return -1;
            }
            return 1;
          });

          dispatch(roomActions.fetchListRoom(list));
          setLoading(false);
        });
    }
  }, [currentUser]);
  useEffect(() => {
    const { idRoom } = qs.parse(search);
    if (idRoom) {
      setIdRoom(idRoom as string);
      firebase
        .firestore()
        .collection("messages")
        .where("idRoom", "==", idRoom)
        .onSnapshot((res) => {
          const list: MESSAGE[] = [];
          res.docs.forEach((mess) => {
            list.push({ ...mess.data(), id: mess.id } as MESSAGE);
          });
          setListMessage(
            list.sort((mess1: MESSAGE, mess2: MESSAGE) => {
              if (mess1.createdAt > mess2.createdAt) {
                return 1;
              }
              return -1;
            })
          );
        });
    }
  }, [search]);
  useEffect(() => {
    console.log(state);
    const room = (state as any)?.newRoom;
    const uidReceive = room?.members?.filter(
      (mem: string) => mem !== currentUser?.uid!
    )[0];
    const userReceive = listUser?.find(
      (user: USER) => user?.uid === uidReceive
    );
    const currentRoom: NEW_ROOM = { ...room, userReceive };
    setCurrentRoom(currentRoom);
  }, [state]);

  const handleClickSetCurrentRoom = (room: NEW_ROOM) => {
    setCurrentRoom(room);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid className={classes.conatainer} container>
      <Grid className={classes.wrap} container item sm={12} xs={12} md={12}>
        <Grid className={classes.wrapListRoom} item sm={4} md={4} xs={12}>
          <Rooms
            setOpenModal={() => setOpen(true)}
            handleClickSetCurrentRoom={handleClickSetCurrentRoom}
            listRoom={listRoom}
            closeModal={handleClose}
            currentRoom={currentRoom}
            listMessage={listMessage}
            loading={loading}
          />
        </Grid>
        <Grid className={classes.wrapBoxChat} item sm={8} md={6} xs={12}>
          <BoxChat
            idRoom={idRoom}
            listMessage={listMessage}
            currentRoom={currentRoom}
            closeModal={handleClose}
          />
        </Grid>
      </Grid>

      <Modal
        className={classes.modalContainer}
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        onClose={handleClose}
      >
        <div className={classes.modalChat}>
          <BoxChat
            idRoom={idRoom}
            listMessage={listMessage}
            currentRoom={currentRoom}
            closeModal={handleClose}
          />
        </div>
      </Modal>
    </Grid>
  );
}

export default ChatPage;
// export default  [currentRoom,setCurrenRoom]
