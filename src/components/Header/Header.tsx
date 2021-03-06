import { Avatar, Badge, Popover, Tooltip, Typography } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import TelegramIcon from "@material-ui/icons/Telegram";
import firebase from "firebase";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CustomLink } from "../../common/customLink";
import { USER } from "../../interfaces/userInterface";
import { useAppSelector } from "../../redux/hook";
import Notify from "../Notify/Notify";
import Search from "../Search/Search";
import useStyles from "./style";
function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useAppSelector((state) => state.user.currentUser);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { pathname } = useLocation();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const history = useHistory();
  const classes = useStyles();
  const { listRoom } = useAppSelector((state) => state.rooms);
  const totalNotifyMess = listRoom?.reduce((total: number, room) => {
    if (
      room?.lastMessage?.checked === false &&
      room?.lastMessage?.userSentUid !== user?.uid
    ) {
      return total + 1;
    }
    return total;
  }, 0);
  const [openSearch, setOpenSearch] = useState(false);
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        console.log("da log out");
        history.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleClickChat = () => {
    if (user) {
      history.push("/chat");
    } else {
      history.push("/login");
    }
  };
  const handleClickUser = (option: USER) => {
    history.push(`user/${option?.uid}`);
  };
  return !openSearch ? (
    <div className={classes.wrapHeader}>
      <div className={classes.headerLeft}>
        <Typography
          onClick={() => history.push("/")}
          className={classes.title}
          variant="h6"
        >
          OUTSTAGROM
        </Typography>
      </div>
      <div className={classes.headerMiddle}>
        <Search clickUSer={handleClickUser} />
      </div>
      <div className={classes.headerRight}>
        <SearchOutlined
          onClick={() => setOpenSearch(true)}
          className={classes.iconSearch}
        />
        <CustomLink to="/" label={<HomeIcon />} activeOnlyWhenExact={true} />

        <Badge
          onClick={() => handleClickChat()}
          badgeContent={totalNotifyMess}
          color="secondary"
        >
          <TelegramIcon
            style={{ color: `${pathname === "/chat" ? "red" : "black"}` }}
          />
        </Badge>

        <Notify />
        {/* <AddAlertIcon /> */}
        {user ? (
          <Tooltip title={user?.displayName!} aria-label="add">
            <Avatar
              aria-describedby={id}
              onClick={handleClick}
              style={{ width: 25, height: 25, cursor: "pointer" }}
              src={user?.photoURL}
            />
          </Tooltip>
        ) : (
          <button
            className={classes.buttonLogin}
            onClick={() => history.push("/login")}
          >
            Login
          </button>
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
          <div className={classes.contentPopOver}>
            <Typography onClick={() => history.push(`/user/${user?.uid!}`)}>
              Trang c?? nh??n
            </Typography>
            <Typography onClick={() => handleLogout()}>Logout</Typography>
          </div>
        </Popover>
      </div>
    </div>
  ) : (
    <div className={classes.wrapHeader}>
      <ArrowBackIcon onClick={() => setOpenSearch(false)} />
      <div className={classes.searchXS} style={{ flex: 1 }}>
        <Search clickUSer={handleClickUser} />
      </div>
    </div>
  );
}

export default Header;
