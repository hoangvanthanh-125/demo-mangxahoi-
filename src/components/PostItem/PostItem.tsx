import { Avatar, Grid, Typography } from "@material-ui/core";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FavoriteBorderSharpIcon from "@material-ui/icons/FavoriteBorderSharp";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import React, { useEffect, useState } from "react";
import { AsyncUser } from "../../common/AsyncUser";
import { POST } from "../../interfaces/postInterface";
import { USER } from "../../interfaces/userInterface";
import useStyles from "./style";
import firebase from "firebase";
import { useAppDispatch } from "../../redux/hook";
import { updatePostActions } from "../../redux/actions/postAction";
import { useHistory } from "react-router-dom";
interface PropsPostItem {
  post: POST;
}
function PostItem({ post }: PropsPostItem) {
  const classes = useStyles();
  const history = useHistory();
  const {
    id,
    listComment,
    listLike,
    title,
    color,
    urlImage,
    userPost: { photoURL, displayName },
    createdAt,
  } = post;
  const [user, setUser] = useState<any>(null);
  const [isLike, setLike] = useState(false);
  const dispatch = useAppDispatch();

  const handleClickLike = async () => {
    await setLike((prev) => !prev);
  };
  useEffect(() => {
    if (isLike && user) {
      const index = listLike.findIndex((item) => item.uid === user.uid);
      if (index < 0) {
        const newListLike = listLike.concat(user);
        dispatch(
          updatePostActions({
            ...post,
            listLike: [...newListLike],
          })
        );
      }
    } else if (!isLike && user) {
      const index = listLike.findIndex((item) => item.uid === user.uid);
      if (index >= 0) {
        const newListLike = [
          ...listLike.slice(0, index),
          ...listLike.slice(index + 1),
        ];
        dispatch(
          updatePostActions({
            ...post,
            listLike: [...newListLike],
          })
        );
      }
    }
  }, [isLike]);

  useEffect(() => {
    AsyncUser().then(() => {
      const currentUser = firebase.auth().currentUser;
      setUser({
        displayName: currentUser?.displayName,
        email: currentUser?.email,
        photoURL: currentUser?.photoURL,
        uid: currentUser?.uid,
      } as USER);
    });
  }, []);
  useEffect(() => {
    if (user) {
      const index = listLike.findIndex((item) => item.uid === user.uid);
      if (index >= 0) {
        setLike(true);
      }
    }
  }, [user]);
 
  return (
    <Grid item sm={12} xs={12} md={12}>
      <div className={classes.card}>
        <div className={classes.wrapHeader}>
          <div className={classes.header}>
            <Avatar style={{ width: 30, height: 30 }} src={photoURL} />
            <Typography className={classes.nameuser} variant="subtitle1">
              {displayName}
            </Typography>
          </div>
          <span>{createdAt}</span>
        </div>

        <div>
        <div className={classes.wrapContent} onClick={() => history.push(`/comment/${id}`)}>
        {urlImage ? (
            <div className={classes.cardContent}>
              <p>{title}</p>
              <img className={classes.image} src={urlImage} alt="Loading" />
            </div>
          ) : (
            <div
              className={classes.blockTitle}
              style={{ background: `${color}` }}
            >
              {title}
            </div>
          )}
        </div>
          <div className={classes.totalLikeCmt}>
            <Typography variant="caption">
              {listLike.length} lượt thích
            </Typography>
            <Typography variant="caption">
              {listComment.length} comment
            </Typography>
          </div>
          <div className={classes.cardAction}>
            <div
              onClick={() => handleClickLike()}
              style={{ borderRight: "1px solid lightgray" }}
              className={classes.boxLike}
            >
              {!isLike ? (
                <FavoriteBorderSharpIcon className={classes.icon} />
              ) : (
                <FavoriteSharpIcon className="icon-tym" />
              )}
            </div>

            <div className={classes.boxComment} onClick={() => history.push(`/comment/${id}`) }>
              <ChatBubbleOutlineOutlinedIcon className={classes.icon} />
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default PostItem;
