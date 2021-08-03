import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import useStyle from "./yle";
function ActiveUser() {
  const history = useHistory();
  const classes = useStyle();
  const { listUser } = useAppSelector(state => state.user)
  const renderListUser = () => {
    let xhtml = null;
    if (listUser?.length > 0) {
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
  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <Typography>Đang hoạt động</Typography>
      </div>
      <div className={classes.body}>{renderListUser()}</div>
    </div>
  ) 
}

export default ActiveUser;
