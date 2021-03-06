import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  
  wrapHeader:{
    boxShadow: ' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
    boxSizing:'border-box',
    background:'white',
    width:'100%',
    maxWidth:'100%',
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    padding:'10px 0',
   
    height:80

  },
  headerLeft:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  headerMiddle:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flex:0.7,
   [theme.breakpoints.down('xs')]:{
     display:'none'
   }
  },
  headerRight:{
    width:'15%',
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    [theme.breakpoints.down('sm')]:{
      width:'25%',
    },
    [theme.breakpoints.down('xs')]:{
      width:'60%'
    }
  },
  iconSearch:{
   display:'none',
   cursor:'pointer',
   [theme.breakpoints.down('xs')]:{
     display:'block'
   }
,

  },
  searchXS:{
  animation:`$myEffect 3000s ease-in-out`
  },
  title:{
    
    marginLeft:6,
    cursor:'pointer',
    animation:`$myEffect 1000ms ease-in-out`,
    [theme.breakpoints.down('xs')]:{
      fontSize:'medium'
    }
  },
  contentPopOver:{
    boxSizing:'border-box',
   
    '& p':{
      boxSizing:'border-box',
      padding:10,
      cursor:'pointer',
      '&:hover':{
        background:'lightgray'
      }
    }
  },
  buttonLogin:{
    background:'black',
    color:'white',
    borderRadius:5,
    outline:'none',
    border:'1px solid gray',
    padding:'5px 7px',
    cursor:'pointer',
    fontWeight:'bold',
    '&:hover':{
      background:'gray'
    }

  }
}))