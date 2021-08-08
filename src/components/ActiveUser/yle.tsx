import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  wrap:{
    marginTop:15,
    [theme.breakpoints.down('sm')]:{
      display:'none'
    },
    overflowY:'auto',
    height:'calc(100vh - 110px)',
    '&::-webkit-scrollbar': {
      width: '0.5em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: 'none',
      borderRadius:5
    }
  

  },
  header:{
    borderBottom:'1px solid lightgray',
    padding:'10px 30px',
    width:'100%',
    fontSize:'large',
    fontWeight:'bold',
    display:'flex',
    // justifyContent:'flex-start',
    alignItems:'center',
    boxSizing:'border-box',
    '& p':{
      fontWeight:'bold',
      color:'gray'
    }
    
  },
  body:{

  },
  avatar:{
   position:'relative',
   '& div:first-child':{
     position:'absolute',
     width:6,
     height:6,
     borderRadius:6,
     background:'green',
     bottom:-2,
     right:-1,
     zIndex:1,
     border:'2px solid white '
   }
  },
  userItem:{
    padding:10,
    cursor:'pointer',
    boxSizing:'border-box',
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    width:'100%',
    marginTop:10,
    '& div':{
      marginLeft:15,
      display:'flex',
      justifyContent:'flex-start',
      alignItems:'center',
      [theme.breakpoints.down('sm')]:{
        fontSize:'13px'
      },
    },
    '&:hover':{
      background:'lightgray'
    }
  }
}))

