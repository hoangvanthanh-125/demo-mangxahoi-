import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  modal:{
    
    overflow:'auto',
    background:'white',
    position: 'absolute',
    width: '50vw',
    height:'auto',
    maxHeight:'100vh',
    maxWidth:'100vw',
    padding:30,
    paddingTop:0,
   
    backgroundColor: 'white',
    outline:'none',
    boxSizing:'border-box',
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
    [theme.breakpoints.down('sm')]:{
      width:'100vw',
      height:'100vh'
    }
    
  },
  header:{
    boxSizing:'border-box',
    padding:10,
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    // // padding:10,
    borderBottom:'1px solid lightgray',
    fontWeight:'bold',
    
  },
  body:{
    //  display:'flex',
    //  justifyContent:'center',
    //  alignItems:'center',
     paddingTop:20,
    //  [theme.breakpoints.down('xs')]:{
    //    height:'100vh'
    //  }
  }
}))