import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  modal:{
    overflow:'auto',
    background:'white',
    position: 'absolute',
    width: '50vw',
    height:'90vh',
    backgroundColor: 'white',
    outline:'none',
    boxSizing:'border-box',
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
    padding:20,
    [theme.breakpoints.down('xs')]:{
      width:'100vw',
      height:'100vh'
    }
  },
  header:{
    background:'white',
    borderBottom: '1px solid gray',
    padding:'10px 0',
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center'
  },
  post:{
  flex:1,
  background:'rgb(231, 227, 227)',
  padding:'10px',
  borderRadius:'33px',
  cursor:'pointer',
  '&:hover':{
    opacity:0.7
  },
  [theme.breakpoints.down('xs')]:{
    fontSize:12
  }
  },
  wrapPost:{
  
    width:'100%',
    background:'white',
    // border:'1px solid lightgray',
    margin:'25px 0',
    marginBottom:0,
    borderRadius:'5px',
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    boxSizing:'border-box',
    padding:'20px 10px',
    boxShadow:'0px 1px 2px lightgray',
    [theme.breakpoints.down('xs')]:{
      padding:10,
     borderRadius:'0'
    }
  },
  iconImage:{
    color:'green'
  },
  info:{
    boxSizing:'border-box',
    padding:10,
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    
  },
  avatar:{
    width:30,
    height:30,
    marginRight:10
  },
  content:{
  boxSizing:'border-box',
  padding:'30px 10px',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  [theme.breakpoints.down('xs')]:{
    height:300
  }

  },
  input:{
    border:'none',
    outline:'none',
    width:'100%',
    wordWrap:'break-word',
    minHeight:100,
    [theme.breakpoints.down('xs')]:{
      height:150
    }
  }
  ,
  colorBlock:{
    border:'.9px solid lightgray',
    width:40,
    height:40,
    borderRadius:13,
    cursor:'pointer',
    '&:hover':{
      opacity:0.7
    }
  },
  listColor:{
    width:'100%',
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center'
  },
  actionPost:{
     boxSizing:'border-box',
     padding:10
  },
  addImage:{
    boxSizing:'border-box',
    padding:10,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center'
    
  },
  addImageAction:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    boxShadow:'2px 2px 2px gray',
    width:'100%',
    marginBottom:'10px',
    border:'0.5px solid lightgray',
    borderRadius:13,
    cursor:'pointer',
    '&:hover':{
      opacity:0.8
    }
    
  },
 
  imageContent:{

  },
  wrapImg:{
    
    width:'100%',
    height:'150px',
    overflow:'auto',
    [theme.breakpoints.down('xs')]:{
      height:160
    }
  },
  imageUpload:{
    backgroundSize:'cover',
    position:'relative',
    width:150,
    height:150,
    zIndex:1
  },
  deleteImg:{
   position:'absolute',
   right:-3,
   top:0,
   width:30,
   height:30,
   background:'gray',
   borderRadius:30,
   zIndex:2,
   '&:hover':{
     opacity:0.7
   }
  }
}))