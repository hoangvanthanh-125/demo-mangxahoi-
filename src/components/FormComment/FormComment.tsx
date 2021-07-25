import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import { USER } from "../../interfaces/userInterface";
import { AsyncUser } from "../../common/AsyncUser";
import useStyles from "./style";
import { COMMENT, POST } from "../../interfaces/postInterface";
import axiosClient from "../../apis/axiosClient";
import { updatePost } from "../../apis/postsApi/postApi";
import { useAppDispatch } from "../../redux/hook";
import { updatePostActions } from "../../redux/actions/postAction";
interface Props {
  post: POST;
}
const getKey = () => {
  return `${Math.random()*67766777777}-${Math.random()* 665627788}`
}
function FormComment({ post }: Props) {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [user, setUser] = useState<any>(null);
  const [text, setText] = useState("");
  useEffect(() => {
    AsyncUser().then(() => {
      setUser(firebase.auth().currentUser);
    });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e?: any) => {
    if(e){
      e.preventDefault();
    }
    if (text) {
      const date = new Date();      
      const newComment: COMMENT = {
        createdAt: date,
        listRepComment: [] as COMMENT[],
        contentComment: text,
        idComment:getKey(),
        userComment: {
          displayName: user?.displayName,
          uid: user?.uid,
          email: user?.email,
          photoURL: user?.photoURL,
        } as USER,
      };
      const newListComment = [newComment].concat(...post.listComment);
      const newPost: POST = {
        ...post,
        listComment: [...newListComment],
      };
      setText("");
      dispatch(updatePostActions(newPost));
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
