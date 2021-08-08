import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  home:{
   display:'flex',
   justifyContent:'center',
    boxSizing:'border-box',
    padding:'0 150px',
    [theme.breakpoints.down('sm')]:{
      padding:'0px 20px'
    },
    [theme.breakpoints.down('xs')]:{
      padding:'0px 0px'
    }
  },
  wraplistUser:{
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'start',
    // border:'1px solid black',
   
  position:'relative',
  // top:80,
  // right:100
  },
  listUser:{
    position:'fixed',
    top:78,
    right:150
  }

}))