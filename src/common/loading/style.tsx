import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrapLoading:{
     position:'fixed',
     top:0,
     left:0,
     right:0,
     bottom:0,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:2,
    width:'100vw',
    height:'100%',
    background:'white'
    },
    imgLoading:{
      [theme.breakpoints.down('xs')]:{
        width:150,
      }
    }
}))