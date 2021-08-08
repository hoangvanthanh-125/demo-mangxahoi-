import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  wrapInfo: {},
  wrapAnhbia: {
    width: "900px",
    maxWidth: "100vw",
    height: 400,
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      height: 300,
      width: "100vw",
    },
  },
  anhbia: {
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
    borderRadius: "5px",
    border: "1px solid lightgray",
  },
  buttonAnhBia: {
    background: "white",
    color: "black",
    position: "absolute",
    maxWidth: "200px",
    maxHeight: "30px",
    minWidth: 200,
    minHeight: "30px",
    right: 15,
    bottom: 15,
    zIndex: 2,
    fontSize: "10px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "70px",
      maxHeight: "30px",
      minWidth: "70px",
      minHeight: "30px",
    },
    "& p": {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
  wrapAvt: {
    position: "relative",
  },
  avatar: {
    position: "absolute",
    width: 150,
    height: 150,
    top: 0,
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
    border: "3px solid white ",
    // marginRight:20,
    // [theme.breakpoints.down('xs')]:{
    //  marginBottom:15
    // }
  },
  iconChangeAvt: {
    position: "absolute",

    zIndex: 30,
    top: 10,
    left: "calc(50% + 50px)",
    background: "gray",
  },

  info: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    marginLeft: 20,
    "& p": {
      marginBottom: 10,
    },
    [theme.breakpoints.down("sm")]: {
      "& h4": {
        // width:'500px',
        wordWrap: "break-word",
        fontSize: "x-large",
      },
    },
    [theme.breakpoints.down("xs")]: {
      "& h4": {
        // width:'300px',
        wordWrap: "break-word",
        textAlign: "center",
      },
    },
  },
  button: {
    background: "white",
    border: "1px solid lightgray",
  },
  headerModal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  wrapbaiDang: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  noPost: {
    fontWeight: "bold",
    minHeight: 200,
    width: "100%",
    background: "white ",
    borderRadius: 5,
    marginTop:100
  },
  nameUser: {
    marginTop: 100,
    fontWeight: "bold",
    fontSize: 25,
  },
  buttonInbox: {
    background: "transparent",
    marginTop: 10,
  },
  wrapPost: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    border: "1px solid black",
  },
}));
