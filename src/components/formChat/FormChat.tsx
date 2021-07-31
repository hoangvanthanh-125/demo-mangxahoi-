import React, { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import firebase from "firebase";
import { MESSAGE } from "../../interfaces/chatInterface";
import { getId } from "../FormComment/FormComment";
import useStyle from "./style";
import SendIcon from "@material-ui/icons/Send";
import ImageIcon from "@material-ui/icons/Image";
interface Props {
  idRoom: string,
  dummy:any
}

function FormChat({ idRoom,dummy }: Props) {
  const classes = useStyle();
  const [text, setText] = useState("");
  const currrentUser = useAppSelector((state) => state.user.currentUser);
  const handleOnChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSummit = async (e: any) => {
    if (e) {
      e.preventDefault();
    }
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
      setText('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <form className={classes.wrap} onSubmit={handleSummit}>
      <div className={classes.wrapFrom}>
        <input
        placeholder='Nhập tin nhắn'
          className={classes.input}
          value={text}
          onChange={handleOnChange}
        />
        <SendIcon onClick={() => handleSummit(null)} />
        <ImageIcon />
      </div>
    </form>
  );
}

export default FormChat;
