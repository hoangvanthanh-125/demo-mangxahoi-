import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrap:{
    marginTop:15,
    borderTop:'1px solid lightgray',
   
  // borderRadius:'5px',
  background:'white',
  padding:10,
  boxSizing:'border-box',
  [theme.breakpoints.down('xs')]:{
    marginTop:0,
    borderRadius:0,
    borderTop:'none',
   
  }
  },
  inputCmt:{
    boxSizing:'border-box',

    padding:'10px 0px',
   borderBottom:'1px solid lightgray'
  },
  
  firstCmt:{
    height:'calc(100vh - 191px)',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
   
  },
  wrapCmt:{
    overflowY:'scroll',
    height:'calc(100vh - 191px)',
    '&::-webkit-scrollbar': {
      width: '0em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  }
}))