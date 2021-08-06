import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import {
  LAST_MESSAGE,
  MESSAGE,
  NEW_ROOM,
} from "../../interfaces/chatInterface";
import { useAppSelector } from "../../redux/hook";
import { getId } from "../FormComment/FormComment";
import useStyle from "./style";
interface Props {
  idRoom: string;
  dummy: any;
  id: string;
  currentRoom: NEW_ROOM;
}

function FormChat({ idRoom, dummy, id, currentRoom }: Props) {
  const classes = useStyle();
  const [text, setText] = useState("");
  const currrentUser = useAppSelector((state) => state.user.currentUser);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<any>(null);
  const storage = firebase.storage();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setProgress(0);
              setUrl(url);
            })
            .then(async () => {});
        }
      );
    }
  }, [image]);
  useEffect(() => {
    if (url) {
      const sentImg = async () => {
        await firebase
          .firestore()
          .collection("messages")
          .add({
            idMessage: getId(),
            content: text,
            idRoom,
            createdAt: Date.now() as number,
            userSentUid: currrentUser?.uid,
            urlImg: url,
          } as MESSAGE);
        setUrl("");
      };
      const newLastMessage = {
        idMessage: getId(),
        content: text,
        idRoom,
        createdAt: Date.now() as number,
        userSentUid: currrentUser?.uid,
        urlImg: url,
        checked: false,
      } as LAST_MESSAGE;
      sentImg();
      firebase.firestore().collection("rooms").doc(id).update({
        lastMessage: newLastMessage,
      });
    }
  }, [url]);
  const handleOnChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSummit = async (e: any) => {
    if (e) {
      e.preventDefault();
    }
    if (text) {
      await firebase
        .firestore()
        .collection("messages")
        .add({
          idMessage: getId(),
          content: text,

          idRoom,
          createdAt: Date.now() as number,
          userSentUid: currrentUser?.uid,
        } as MESSAGE);
      setText("");
      const newLastMessage = {
        idMessage: getId(),
        content: text,
        idRoom,
        createdAt: Date.now() as number,
        userSentUid: currrentUser?.uid,
        checked: false,
      } as LAST_MESSAGE;
      firebase.firestore().collection("rooms")?.doc(id).update({
        lastMessage: newLastMessage,
        createdAt: 90,
      });
      // dispatch(
      //   roomActions.updateRoom({
      //     ...currentRoom,
      //     lastMessage: newLastMessage,
      //   })
      // );
    }
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = async (e: any) => {
    if (e.target.files[0]) {
      await setImage(e.target.files[0]);
    }
  };
  return (
    <div>
      {/* <div>
        <img className={classes.img} src={url} alt="" />
      </div> */}
      <form className={classes.wrap} onSubmit={handleSummit}>
        <div className={classes.wrapFrom}>
          <input
            placeholder="Nhập tin nhắn"
            className={classes.input}
            value={text}
            onChange={handleOnChange}
          />
          <SendIcon onClick={() => handleSummit(null)} />
          <input
            type="file"
            onChange={handleChange}
            style={{ display: "none" }}
            id="change-image"
          />
          <label htmlFor="change-image">
            <ImageIcon />
          </label>
        </div>
      </form>
    </div>
  );
}

export default FormChat;
