import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  card: {
    wordWrap: "break-word",
    background: "white",
    padding: 0,
    width: "100%",
    //  border:'.5px solid lightgray',
    //  boxShadow:'1px 1px 0px lightgray',
    borderRadius: "5px",
    [theme.breakpoints.down("xs")]: {
      border: "none",
      borderRadius: 0,
    },
    marginBottom: 15,
   
  },
  wrapHeader: {
    position:'relative',
    display: "flex",
    // flexDirection:'column',
    alignItems: "center",
    "& span": {
      color: "grey",
      fontSize: "x-small",
    },
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px",
  },
  moreIcon:{
  position:'absolute',
  top:0,
  right:5
  },
  nameuser: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  wrapContent: {
    cursor: "pointer",
    
  },
  cardContent: {
    wordWrap: "break-word",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "",
    alignItems: "flex-start",

    "& p": {
      marginLeft: 5,
      fontWeight: 450,
    },
  },
  cardAction: {
    borderTop:'0.5px solid lightgray',
    boxSizing: "border-box",
    position: "relative",

    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    // borderTop:'1px solid lightgray',
    marginTop: 5,
    padding: "10px",
    paddingBottom: 20,
  },
  boxLike: {
    // background: "rgb(231, 227, 227)",
    padding: 5,
    boxSizing: "border-box",
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    // borderRadius: "13px",

    "&:hover": {
      "& > div": {
        display: "block",
      },
    },
  },
  boxComment: {
    // background: "rgb(231, 227, 227)",
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "13px",

    padding: 5,
    boxSizing: "border-box",
  },
  image: {
    objectFit:'cover',
    width: "100%",
    height: "400px",
    [theme.breakpoints.down("sm")]: {
      height: "350px",
    },
  },
  icon: {
    color: "gray",
    marginLeft: 5,
  },
  listIcon: {
    display: "none",
    width: "auto",
    height: 30,
    padding: 10,
    position: "absolute",
    background: "white",
    top: -40,
    left: "25%",
    borderRadius: 20,
    zIndex: 1,
    transform: "translate(-50%,0)",
  },
  iconState: {
    "&:hover": {
      transform: "scale(1.14)",
    },
  },
  totalLikeCmt: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "& span": {
      color: "gray",
    },
  },
  totalLike:{
   cursor:'pointer',
  
   "&:hover":{
    textDecoration:'underline'
   }
  },
  blockTitle: {
    boxSizing: "border-box",
    padding: "15px 15px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
   height:400,

    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    "& > div": {
      wordWrap: "break-word",
      width: "100%",
      height: "100%",
    },
  },
  wrapListPeopleLike:{
    width:'100%',
    marginTop:10,
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    boxSizing:'border-box',
    padding:10,
   
  },
  nameUserLike:{
    marginLeft:15
  }
}));
