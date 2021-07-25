import { Avatar, Fab, Popover, Tooltip, Typography } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TelegramIcon from "@material-ui/icons/Telegram";
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import useStyles from "./style";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { AsyncUser } from "../../common/AsyncUser";
import HomeIcon from '@material-ui/icons/Home';
function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState<any>(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const history = useHistory();
  const classes = useStyles();
  const [openSearch, setOpenSearch] = useState(false);
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("da log out");
        history.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    AsyncUser().then(() => {
      setUser(firebase.auth().currentUser);
    });
  }, []);
  return !openSearch ? (
    <div className={classes.wrapHeader}>
      <div className={classes.headerLeft}>
        <Typography className={classes.title} variant="h6">
          OUTSTAGROM
        </Typography>
      </div>
      <div className={classes.headerMiddle}>
        <Search />
      </div>
      <div className={classes.headerRight}>
        <SearchOutlined
          onClick={() => setOpenSearch(true)}
          className={classes.iconSearch}
        />
        <HomeIcon />
        <TelegramIcon />
        <AddAlertIcon />
        <Tooltip title={user?.displayName} aria-label="add">
          <Avatar
            aria-describedby={id}
            onClick={handleClick}
            style={{ width: 25, height: 25 }}
            src={user?.photoURL}
          />
        </Tooltip>

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
          <div className={classes.contentPopOver}>
            <Typography onClick={() => handleLogout()}>Logout</Typography>
          </div>
        </Popover>
      </div>
    </div>
  ) : (
    <div className={classes.wrapHeader}>
      <ArrowBackIcon onClick={() => setOpenSearch(false)} />
      <div className={classes.searchXS} style={{ flex: 1 }}>
        <Search />
      </div>
    </div>
  );
}

export default Header;
