import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrapLoading:{
  
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:100,
    width:'100vw',
    height:'100%',
    background:'white'
    },
    imgLoading:{
      [theme.breakpoints.down('xs')]:{
        width:300,
        
      }
    }
}))