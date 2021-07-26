import {
  Avatar,
  Grid,
  IconButton,
  Popover,
  Typography,
} from "@material-ui/core";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FavoriteBorderSharpIcon from "@material-ui/icons/FavoriteBorderSharp";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AsyncUser } from "../../common/AsyncUser";
import { POST } from "../../interfaces/postInterface";
import { USER } from "../../interfaces/userInterface";
import {
  deletePostActions,
  updatePostActions,
} from "../../redux/actions/postAction";
import { useAppDispatch } from "../../redux/hook";
import { uiActions } from "../../redux/slice/uiSilce";
import FormPost from "../FormPost/FormPost";
import useStyles2 from "./../CommentItem/style";
import useStyles from "./style";
interface PropsPostItem {
  post: POST;
}
function PostItem({ post }: PropsPostItem) {
  const classes = useStyles();
  const classes2 = useStyles2();
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const idPopOver = open ? "simple-popover-PostItem" : undefined;

  const dispatch = useAppDispatch();
  const existsMe = post.listLike.findIndex((item) => item.uid === user?.uid);
  var displayTotalLike = "";
  if (post.listLike.length === 0) {
    displayTotalLike = "";
  } else {
    displayTotalLike =
      existsMe >= 0
        ? post.listLike.length > 1
          ? `Bạn và ${post.listLike.length - 1} người khác`
          : `${listLike[0].displayName}`
        : post.listLike.length > 1
        ? `${post.listLike[0].displayName} và ${
            post.listLike.length - 1
          } người khác`
        : `${listLike[0].displayName}`;
  }

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
  const renderPeopleLike = () => {
    let xhtml = null;
    if (post.listLike.length > 0) {
      xhtml = post.listLike.map((user) => (
        <div className={classes.wrapListPeopleLike} key={user.uid}>
          <Avatar src={user.photoURL} />
          <Typography className={classes.nameUserLike}>
            {user.displayName}
          </Typography>
        </div>
      ));
    }
    return xhtml;
  };
  const clickDisplayPeoPleLike = () => {
    dispatch(uiActions.openModal());
    dispatch(uiActions.fetchHeaderModal("Danh sách thả tym <3"));
    dispatch(uiActions.fetchBodyModal(renderPeopleLike()));
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = async () => {
    setAnchorEl(null);
    dispatch(uiActions.openModal());
    dispatch(uiActions.fetchHeaderModal(""));
    dispatch(
      uiActions.fetchBodyModal(
        <div className={classes2.wrapLoadDelete}>
          <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading" />
          <Typography>Đang xóa bài viết</Typography>
        </div>
      )
    );
    await dispatch(deletePostActions(post));
    dispatch(uiActions.closeModal());
  };
  const handleUpdatePost = () => {
    setAnchorEl(null);
    dispatch(uiActions.openModal());
    dispatch(uiActions.fetchBodyModal(<FormPost post={post} />));
  };
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
          {user?.uid === post.userPost.uid && (
            <IconButton
              aria-describedby={idPopOver}
              onClick={handleClick}
              className={classes.moreIcon}
            >
              <MoreHorizIcon />
            </IconButton>
          )}
          <Popover
            id={idPopOver}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className={classes2.popOver}>
              <Typography
                onClick={() => handleUpdatePost()}
                className={classes2.popOverItem}
              >
                Sửa
              </Typography>
              <Typography
                onClick={() => handleDeletePost()}
                className={classes2.popOverItem}
              >
                Xóa
              </Typography>
            </div>
          </Popover>
        </div>
        <div>
          <div
            className={classes.wrapContent}
            onClick={() => history.push(`/comment/${id}`)}
          >
            {urlImage ? (
              <div className={classes.cardContent}>
                <p>{title}</p>
                <img className={classes.image} src={urlImage} alt="Loading" />
              </div>
            ) : (
              <div
                className={classes.blockTitle}
                style={{ background: `${color}`, color: "black" }}
              >
                {title}
              </div>
            )}
          </div>
          <div
            onClick={() => clickDisplayPeoPleLike()}
            className={classes.totalLikeCmt}
          >
            <Typography className={classes.totalLike} variant="caption">
              {displayTotalLike}
            </Typography>
            <Typography variant="caption">
              {post.listComment.length > 0
                ? ` ${listComment.length} comment`
                : ""}
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
            <div
              className={classes.boxComment}
              onClick={() => history.push(`/comment/${id}`)}
            >
              <ChatBubbleOutlineOutlinedIcon className={classes.icon} />
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default PostItem;
