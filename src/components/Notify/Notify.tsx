import React, { useEffect, useRef, useState } from "react";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import {
  Typography,
  Popover,
  Badge,
  Avatar,
  IconButton,
} from "@material-ui/core";
import useStyles from "./style";
import { NOTIFY } from "../../interfaces/postInterface";
import { AsyncUser } from "../../common/AsyncUser";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
function Notify() {
  var db = firebase.firestore();
  const classes = useStyles();
  const [listNotify, setListNotify] = useState<NOTIFY[]>([] as NOTIFY[]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState<any>(null);
  const history = useHistory();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    listNotify.forEach((item) => {
      firebase.firestore().collection("notify").doc(`${item.id}`).update({
        clicked: true,
      });
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover-notify" : undefined;
  useEffect(() => {
    AsyncUser().then(() => {
      setUser(firebase.auth().currentUser);
    });
  });
  useEffect(() => {
    if (user) {
      db.collection("notify")
        .where("uid", "==", user?.uid)
        .onSnapshot((res) => {
          let list: NOTIFY[] = [];
          res.docs.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id } as NOTIFY);
          });
          list.sort((item1,item2) => {
            if(item1.created > item2.created){
              return -1;
            }
            return 1;
          })
          setListNotify(list);
        });
    }
  }, [user]);
  const handleClickItem = (item: NOTIFY, index: number) => {
    setAnchorEl(null);
    history.push(`/comment/${item.idPost}`);
    firebase
      .firestore()
      .collection("notify")
      .doc(`${listNotify[index].id}`)
      .update({
        watched: true,
      });
  };
  const renderListNotify = () => {
    let xhtml = null;
    if (listNotify.length > 0) {
      xhtml = listNotify.map((item, index) => (
        <div
          style={{ background: `${item.watched ? "" : "lightgray"}` }}
          onClick={() => handleClickItem(item, index)}
          className={classes.notifyItem}
          key={item.idNotify}
        >
          <Avatar style={{ width: 25, height: 25 }} src={item.photoURL} />
          <div>
            <span style={{ fontWeight: "bold" }}>
              {item.nameUserMadeNotify}
            </span>{" "}
            {item.contentNotify}
          </div>
        </div>
      ));
    }
    return xhtml;
  };
  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge
          badgeContent={
            listNotify.filter((item) => item.clicked === false).length
          }
          color="secondary"
        >
          <AddAlertIcon />
        </Badge>
      </IconButton>
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
        <div className={classes.wrap}>
          <div className={classes.header}>
            <Typography>Thông báo</Typography>
            <ArrowForwardIcon onClick={() => setAnchorEl(null )} />
          </div>
          <div className={classes.listNotify}>
            {listNotify.length > 0 ? (
               renderListNotify() 
            ) : (
              <div className={classes.noNotify}>Không có thông báo nào</div>
            )}
          </div>
        </div>
      </Popover>
    </>
  );
}

export default Notify;
