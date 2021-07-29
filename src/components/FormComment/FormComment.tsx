import { Avatar, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { AsyncUser } from "../../common/AsyncUser";
import { COMMENT, NOTIFY, POST } from "../../interfaces/postInterface";
import { USER } from "../../interfaces/userInterface";
import { updatePostActions } from "../../redux/actions/postAction";
import { useAppDispatch } from "../../redux/hook";
import useStyles from "./style";
export const getId = () => {
  return `${Math.random()*100000000000}-${Math.random()*999999999}`
}
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
     if(post.userPost.uid !== user.uid){
       firebase.firestore().collection('notify').add({
         idPost:post.id,
         uid:post.userPost.uid,
         contentNotify:`đã bình luận về bài viết của bạn`,
         created:Date.now() as number,
         idNotify:getId(),
         photoURL:user.photoURL,
         nameUserMadeNotify:user?.displayName,
         watched:false,
         clicked:false

       } as NOTIFY)
     }
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
