import { Avatar, IconButton, Popover, Typography } from "@material-ui/core";
import React from "react";
import { MESSAGE } from "../../interfaces/chatInterface";
import { USER } from "../../interfaces/userInterface";
import { useAppSelector } from "../../redux/hook";
import useStyle from "./style";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useState } from "react";
import { useEffect } from "react";
import firebase from "firebase";
interface Props {
  message: MESSAGE;
  userReceive: USER;
}

function MessageItem({ message, userReceive }: Props) {
  const { urlImg } = message;
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [showIcon, setShowIcon] = useState(false);
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleOnMouseEnter = () => {
    if (currentUser?.uid! === message?.userSentUid) {
      setShowIcon(true);
    }
  };
  const handleOnMouseLeave = () => {
    setShowIcon(false);
  };
  const handleClickDeleteImage = () => {
    firebase.firestore().collection("messages").doc(`${message?.id}`).delete();
  };

  return (
    <div>
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className={
          currentUser?.uid === message?.userSentUid
            ? classes.nguoigui
            : classes.nguoinhan
        }
      >
        {currentUser?.uid! === message?.userSentUid && showIcon && (
          <>
            <MoreHorizIcon
              aria-describedby={id}
              onClick={handleClick}
              className={classes.moreIcon}
            />
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
              <Typography
                onClick={() => handleClickDeleteImage()}
                className={classes.typography}
              >
                Gỡ
              </Typography>
            </Popover>
          </>
        )}

        {currentUser?.uid !== message?.userSentUid && (
          <Avatar src={userReceive?.photoURL} />
        )}
        {urlImg ? (
          <img className={classes.img} src={urlImg} alt="loading" />
        ) : (
          <div className={classes.content}>{message.content}</div>
        )}
      </div>
    </div>
  );
}

export default MessageItem;
