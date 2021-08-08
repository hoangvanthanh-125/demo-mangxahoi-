import { Avatar, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { COMMENT, NOTIFY, POST } from "../../interfaces/postInterface";
import { updatePostActions } from "../../redux/actions/postAction";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import useStyles from "./style";
export const getId = () => {
  return `${Math.random() * 100000000000}-${Math.random() * 999999999}`;
};
interface Props {
  post: POST;
}
const getKey = () => {
  return `${Math.random() * 67766777777}-${Math.random() * 665627788}`;
};
function FormComment({ post }: Props) {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = useAppSelector((state) => state.user.currentUser);

  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e?: any) => {
    if (e) {
      e.preventDefault();
    }
    if (user) {
      if (text) {
        const newComment: COMMENT = {
          createdAt: Date.now(),
          listRepComment: [] as COMMENT[],
          contentComment: text,
          idComment: getKey(),
          userComment: user!,
        };
        const newListComment = [newComment].concat(...post.listComment);
        const newPost: POST = {
          ...post,
          listComment: [...newListComment],
        };
        setText("");
        dispatch(updatePostActions(newPost));
        if (post.userPost.uid !== user?.uid!) {
          firebase
            .firestore()
            .collection("notify")
            .add({
              idPost: post.id,
              uid: post.userPost.uid,
              contentNotify: `đã bình luận về bài viết của bạn`,
              created: Date.now() as number,
              idNotify: getId(),
              photoURL: user?.photoURL!,
              nameUserMadeNotify: user?.displayName,
              watched: false,
              clicked: false,
            } as NOTIFY);
        }
      } 
    }
    else {
      history.push("/login");
   }
  };
  return (
    <form onSubmit={handleSubmit} className={classes.wrapForm}>
      <Avatar src={user?.photoURL} />
      <div className={classes.input}>
        <input
          placeholder="Viết bình luận..."
          value={text}
          onChange={handleChange}
          type="text"
        />
        <IconButton onClick={() => handleSubmit()}>
          <SendIcon fontSize="medium" />
        </IconButton>
      </div>
    </form>
  );
}

export default FormComment;
