import { Avatar, Popover, Tooltip, Typography } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import TelegramIcon from "@material-ui/icons/Telegram";
import firebase from "firebase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CustomLink } from "../../common/customLink";
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
        <Search />
      </div>
      <div className={classes.headerRight}>
        <SearchOutlined
          onClick={() => setOpenSearch(true)}
          className={classes.iconSearch}
        />
        <CustomLink to="/" label={<HomeIcon />} activeOnlyWhenExact={true} />
        <CustomLink
          to="/chat"
          label={<TelegramIcon />}
          activeOnlyWhenExact={true}
        />

        <Notify />
        {/* <AddAlertIcon /> */}
        <Tooltip title={user?.displayName!} aria-label="add">
          <Avatar
            aria-describedby={id}
            onClick={handleClick}
            style={{ width: 25, height: 25, cursor: "pointer" }}
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
            <Typography onClick={() => history.push(`/user/${user?.uid!}`)}>
              Trang cá nhân
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
        <Search />
      </div>
    </div>
  );
}

export default Header;
