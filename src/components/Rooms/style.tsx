import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrap:{
    boxSizing:'border-box',
    height:463,
    background:'white',
    padding:10,
    boxShadow: ' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
    [theme.breakpoints.down('xs')]:{
      height:'100vh'
    }
  },
  header:{
    padding:'5px 0 0 0',
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
      
    },
  
  },
  noRoom:{
    width:'100%',
    height:240,
    fontSize:'x-large',
    fontWeight:'bold',
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    paddingTop:'45%',
    
    
  }
}))