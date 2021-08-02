import { Avatar, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { USER } from "../../interfaces/userInterface";
import useStyle from "./yle";
import Skeleton from "@material-ui/lab/Skeleton";
function ActiveUser() {
  const history = useHistory();
  const classes = useStyle();
  const [listUser, setListUser] = useState<USER[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://601014b66c21e1001704fe27.mockapi.io/api/users")
      .then((res) => {
        setListUser(res.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  const renderListUser = () => {
    let xhtml = null;
    if (listUser.length > 0) {
      xhtml = listUser.map((user) => (
        <div
          onClick={() => history.push(`/user/${user.uid}`)}
          className={classes.userItem}
          key={user.uid}
        >
          <div className={classes.avatar}>
            <div></div>
            <Avatar style={{ width: 30, height: 30 }} src={user.photoURL} />
          </div>
          <Typography component="div">{user.displayName}</Typography>
        </div>
      ));
      return xhtml;
    }
  };
  return !loading ? (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <Typography>Đang hoạt động</Typography>
      </div>
      <div className={classes.body}>{renderListUser()}</div>
    </div>
  ) : (
    <Skeleton animation="wave" />
  );
}

export default ActiveUser;
