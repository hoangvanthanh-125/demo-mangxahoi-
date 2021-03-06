import { Avatar, IconButton, Popover, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AsyncUser } from "../../common/AsyncUser";
import { FormatTime } from "../../common/formatTime";
import { COMMENT, POST } from "../../interfaces/postInterface";
import { updatePostActions } from "../../redux/actions/postAction";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { uiActions } from "../../redux/slice/uiSilce";
import useStyles from "./style";
interface Props {
  item: COMMENT;
  post: POST;
}
function CommentItem({ item, post }: Props) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [isEditting, setEdiiting] = useState(false);
  const [contentCmt, setContentCmt] = useState(item.contentComment);

  const classes = useStyles();
  const user = useAppSelector((state) => state.user.currentUser);
  const history = useHistory();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickUpdateCmt = () => {
    setAnchorEl(null);
    setEdiiting(true);
  };
  const updateComment = async () => {
    if (contentCmt && contentCmt !== item.contentComment) {
      const { listComment } = post;
      const index = listComment.findIndex(
        (cmt) => cmt.idComment === item.idComment
      );
      const newCmt = {
        ...item,
        contentComment: contentCmt,
      };
      const newListCmt = [
        ...listComment.slice(0, index),
        newCmt,
        ...listComment.slice(index + 1),
      ];
      await dispatch(
        updatePostActions({
          ...post,
          listComment: newListCmt,
        })
      );
    }
    setEdiiting(false);
  };
  const deleteCmt = async () => {
    dispatch(uiActions.openModal());
    dispatch(uiActions.fetchHeaderModal(""));
    dispatch(
      uiActions.fetchBodyModal(
        <div className={classes.wrapLoadDelete}>
          <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading" />
          <Typography>??ang x??a b??nh lu???n</Typography>
        </div>
      )
    );
    const { listComment } = post;
    const index = listComment.findIndex(
      (cmt) => cmt.idComment === item.idComment
    );
    const newListCmt = [
      ...listComment.slice(0, index),
      ...listComment.slice(index + 1),
    ];
    await dispatch(
      updatePostActions({
        ...post,
        listComment: newListCmt,
      })
    );
    setAnchorEl(null);
    dispatch(uiActions.closeModal());
  };
  const onChangeCmt = (e: any) => {
    setContentCmt(e.target.value);
  };
  return (
    <div className={classes.wrap}>
      <Avatar style={{cursor:'pointer'}} onClick={() => history.push(`/user/${item.userComment?.uid}`)} src={item?.userComment?.photoURL} />
      <div className={classes.wrapcontent}>
        {user?.uid === item.userComment.uid && (
          <IconButton
            aria-describedby={id}
            onClick={handleClick}
            className={classes.moreIcon}
          >
            <MoreVertIcon />
          </IconButton>
        )}
        <Popover
          id={id}
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
          <div className={classes.popOver}>
            <Typography
              onClick={() => deleteCmt()}
              className={classes.popOverItem}
            >
              X??a
            </Typography>
            <Typography
              onClick={() => handleClickUpdateCmt()}
              className={classes.popOverItem}
            >
              S???a
            </Typography>
          </div>
        </Popover>
        <div className={classes.name}>{item.userComment.displayName}</div>
        {!isEditting ? (
          <div className={classes.content}>{item.contentComment}</div>
        ) : (
          <div className={classes.wrapUpdate}>
            <input onChange={onChangeCmt} value={contentCmt} />
            <button onClick={() => updateComment()}>Xong</button>:
          </div>
        )}
        <div className={classes.time}>{FormatTime(item.createdAt as number)}</div>
      </div>
    </div>
  );
}

export default CommentItem;
