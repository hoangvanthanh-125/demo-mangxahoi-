import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import Rooms from "../Rooms/Rooms";
import useStyles from "./style";
import firebase from "firebase";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/hook";
import { MESSAGE, ROOM } from "../../interfaces/chatInterface";
import BoxChat from "../BoxChat/BoxChat";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { USER } from "../../interfaces/userInterface";
import axios from "axios";

function ChatPage() {
  const classes = useStyles();
  const { search } = useLocation();
  const currentUser = useAppSelector((state) => state.user.currentUser!);
  const [listRoom, setListRoom] = useState<ROOM[]>([]);
  const [listMessage, setListMessage] = useState<MESSAGE[]>([]);
  const [idRoom, setIdRoom] = useState("");
  const [userReceive, setUserReceive] = useState<USER>({} as USER);

  useEffect(() => {
    if (currentUser) {
      firebase
        .firestore()
        .collection("rooms")
        .where("members", "array-contains", currentUser.uid)
        .get()
        .then((res) => {
          const list: ROOM[] = [];
          res.docs.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id } as ROOM);
          });
          setListRoom(list);
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
    firebase
      .firestore()
      .collection("rooms")
      .where("idRoom", "==", idRoom)
      .get()
      .then(async (res) => {
        const room = res.docs[0]?.data();
        const uidReceive = room?.members.filter(
          (mem: string) => mem !== currentUser?.uid!
        )[0];
        const result = await axios.get(
          `https://601014b66c21e1001704fe27.mockapi.io/api/users/?uid=${uidReceive}`
        );
        setUserReceive(result.data[0]);
      });
  }, [idRoom, search]);
  return (
    <Grid className={classes.conatainer} container>
     <Grid className={classes.wrap} item sm={12} xs={12} md={12}>
     <Grid className={classes.wrapListRoom} item sm={4} md={4} xs={12}>
        <Rooms listRoom={listRoom} />
      </Grid>
      <Grid className={classes.wrapBoxChat} item sm={8} md={6} xs={12}>
        <BoxChat
          userReceive={userReceive}
          idRoom={idRoom}
          listMessage={listMessage}
        />
      </Grid>
     </Grid>
      <Grid className={classes.noAccess} item xs={12}>
        Không hỗ trợ trên mobile,vui lòng truy cập bằng laptop :(
      </Grid>
    </Grid>
  );
}

export default ChatPage;
