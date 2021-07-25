import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  
  wrapHeader:{
    boxSizing:'border-box',
    background:'white',
    width:'100%',
    maxWidth:'100%',
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    padding:'10px 0',
    border:'1px solid lightgray',
    height:80

  },
  headerLeft:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  headerMiddle:{
    flex:0.5,
   [theme.breakpoints.down('xs')]:{
     display:'none'
   }
  },
  headerRight:{
    width:'15%',
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    [theme.breakpoints.down('xs')]:{
      width:'50%'
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
    animation:`$myEffect 1000ms ease-in-out`
  },
  contentPopOver:{
    boxSizing:'border-box',
    padding:20
  }
}))