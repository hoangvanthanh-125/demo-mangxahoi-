import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrap:{
    border:'1px solid lightgray',
    background:'white',
    padding:10
  },
  header:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:18,
    borderBottom:'1px solid lightgray',
    fontWeight:'bold',
  },
  body:{
    width:'100%',
    height:383,
    overflowY:'auto',
    boxSizing:'border-box',
    '&::-webkit-scrollbar': {
      width: '0.5em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      borderRadius: 12
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 12
    },
    [theme.breakpoints.down('xs')]:{
      height:'calc(100vh - 165px)',
      
    }
  }
}))