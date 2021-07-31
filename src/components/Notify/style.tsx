import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrap: {
    width: 550,

    [theme.breakpoints.down("xs")]: {
      width: "80vw",
    },
  },
  header: {
    width:'100%',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid gray",
    boxSizing:'border-box',
    padding: 10,
    "& p": {
      fontWeight: "bold",
      fontSize: "large",
    },
  },
  listNotify: {
    width: "100%",
    minHeight: 400,
    maxHeight: 500,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  notifyItem: {
    cursor: "pointer",
    marginTop: 1,

    width: "95%",
    padding: 10,
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    "& div": {
      marginLeft: 10,
      padding: 0,
    },
    "&:hover": {
      background: "rgb(223, 223, 233);",
    },
  },
  noNotify: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: "10px",
    fontWeight: 500,
  },
  time:{
    color:'gray',
    fontSize:12,
    fontWeight:'bold'
  }
}));
