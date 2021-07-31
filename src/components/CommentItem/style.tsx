import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  wrap: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    boxSizing: "border-box",
  },
  wrapcontent: {
    position: "relative",
    width: "80%",
    height: "auto",
    marginTop: 10,
    boxSizing: "border-box",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "start",
    borderRadius: 5,
    background: "rgb(223, 223, 233)",
  },
  content: {
    wordWrap: "break-word",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "start",
    width: "94%",
  },
  name: {
    fontWeight: 600,
  },
  time: {
    marginTop: 5,
    fontSize: "12px",
    color: "gray",
    fontWeight:'bold',

  },
  moreIcon: {
    position: "absolute",
    right: 2,
    top: 2,
  },
  popOver: {
  
  },
  popOverItem: {
    boxSizing: 'border-box',
    cursor:'pointer',
    
    padding: '10px 30px',
    '&:first-child':{
      
    },
    '&:hover':{
      background:'lightgray'
    }
  },
  wrapUpdate:{
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    width:'100%',
    '& input':{
      flex:0.8,
      height:30,
      borderRadius:5,
      marginRight:10,
      border:'none',
      outline:'none',
      '&:focus':{
        border:'2px solid teal'
      }
    },
    '& button':{
      borderRadius:5,
      marginRight:10,
      border:'none',
      outline:'none',
      height:30,
      background:'black',
      color:'white',
      cursor:'pointer',
      '&:hover':{
        opacity:0.7
      }
    }
  },
  wrapLoadDelete:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    '& img':{
      width:30,
      height:30,
      marginRight:15
    }
  }
}));
